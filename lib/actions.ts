"use server";

import prisma from "@/lib/prisma";
import { BuddyList, Campaign, Company, Post } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { withCompanyAuth, withCampaignAuth, withPostAuth, withBuddyListAuth } from "./auth";
import { getSession } from "@/lib/auth";
import {
  addDomainToVercel,
  // getApexDomain,
  removeDomainFromVercelProject,
  // removeDomainFromVercelTeam,
  validDomainRegex,
} from "@/lib/domains";
import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";
import { getBlurDataURL } from "@/lib/utils";
import {useParams, useRouter} from "next/navigation";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export const createCompany = async (formData: FormData) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const subdomain = formData.get("subdomain") as string;

  try {
    const response = await prisma.company.create({
      data: {
        name,
        description,
        subdomain,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    await revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This subdomain is already taken`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const updateCompany = withCompanyAuth(
  async (formData: FormData, company: Company, key: string) => {
    const value = formData.get(key) as string;

    try {
      let response;

      if (key === "customDomain") {
        if (value.includes("vercel.pub")) {
          return {
            error: "Cannot use vercel.pub subdomain as your custom domain",
          };

          // if the custom domain is valid, we need to add it to Vercel
        } else if (validDomainRegex.test(value)) {
          response = await prisma.company.update({
            where: {
              id: company.id,
            },
            data: {
              customDomain: value,
            },
          });
          await Promise.all([
            addDomainToVercel(value),
            // Optional: add www subdomain as well and redirect to apex domain
            // addDomainToVercel(`www.${value}`),
          ]);

          // empty value means the user wants to remove the custom domain
        } else if (value === "") {
          response = await prisma.company.update({
            where: {
              id: company.id,
            },
            data: {
              customDomain: null,
            },
          });
        }

        // if the company had a different customDomain before, we need to remove it from Vercel
        if (company.customDomain && company.customDomain !== value) {
          response = await removeDomainFromVercelProject(company.customDomain);

          /* Optional: remove domain from Vercel team 

          // first, we need to check if the apex domain is being used by other companies
          const apexDomain = getApexDomain(`https://${company.customDomain}`);
          const domainCount = await prisma.company.count({
            where: {
              OR: [
                {
                  customDomain: apexDomain,
                },
                {
                  customDomain: {
                    endsWith: `.${apexDomain}`,
                  },
                },
              ],
            },
          });

          // if the apex domain is being used by other companies
          // we should only remove it from our Vercel project
          if (domainCount >= 1) {
            await removeDomainFromVercelProject(company.customDomain);
          } else {
            // this is the only company using this apex domain
            // so we can remove it entirely from our Vercel team
            await removeDomainFromVercelTeam(
              company.customDomain
            );
          }
          
          */
        }
      } else if (key === "image" || key === "logo") {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return {
            error:
              "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
          };
        }

        const file = formData.get(key) as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = key === "image" ? await getBlurDataURL(url) : null;

        response = await prisma.company.update({
          where: {
            id: company.id,
          },
          data: {
            [key]: url,
            ...(blurhash && { imageBlurhash: blurhash }),
          },
        });
      } else {
        response = await prisma.company.update({
          where: {
            id: company.id,
          },
          data: {
            [key]: value,
          },
        });
      }
      console.log(
        "Updated company data! Revalidating tags: ",
        `${company.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
        `${company.customDomain}-metadata`,
      );
      await revalidateTag(
        `${company.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      );
      company.customDomain &&
        (await revalidateTag(`${company.customDomain}-metadata`));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This ${key} is already taken`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const deleteCompany = withCompanyAuth(async (_: FormData, company: Company) => {
  try {
    const response = await prisma.company.delete({
      where: {
        id: company.id,
      },
    });
    await revalidateTag(
      `${company.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    response.customDomain &&
      (await revalidateTag(`${company.customDomain}-metadata`));
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const getCompanyFromCampaignId = async (campaignId: string) => {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: campaignId,
    },
    select: {
      companyId: true,
    },
  });
  return campaign?.companyId;
};

export const getCompanyFromBuddyListId = async (buddyListId: string) => {
  const campaign = await prisma.buddyList.findUnique({
    where: {
      id: buddyListId,
    },
    select: {
      companyId: true,
    },
  });
  return campaign?.companyId;
};
export const getCompanyFromPostId = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      companyId: true,
    },
  });
  return post?.companyId;
};

export const createCampaign = withCompanyAuth(async (formData: FormData, company: Company) => {
  debugger;
  const session = await getSession();
  // if (!session?.user.id) {
  //   return {
  //     error: "Not authenticated",
  //   };
  // }
  const name = formData.get('name') as string;
  const schedulable: boolean = formData.get('schedulable') === 'true';
  const schedule = formData.get('schedule') as string;
  const link1 = formData.get('link1') as string;
  const link2 = formData.get('link2') as string;
  const link3 = formData.get('link3') as string;

  const campaignLinks = [link1, link2, link3];
  const bonusAmount = formData.get('bonusAmount') as string;
  const startDateObj = new Date(formData.get('startDate') as string);
  const startDate = startDateObj.toISOString();

  const response = await prisma.campaign.create({
    data: {
      companyId: company.id,
      name: name,
      campaignLinks: campaignLinks,
      startDate: startDate,
      bonusAmount: Number(bonusAmount),
      schedulable: schedulable,
      schedule: schedule
    },
  });
  await revalidateTag(
    `${company.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-campaigns`,
  );
  company.customDomain && (await revalidateTag(`${company.customDomain}-campaigns`));

  return response;
});

export const updateCampaign = async (data: Campaign) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: data.id,
    },
    include: {
      company: true,
    },
  });
  if (!campaign) {
    return {
      error: "Campaign not found",
    };
    //  later add something like this || post.userId !== session.user.id
  }

  try {
    const response = await prisma.campaign.update({
      where: {
        id: data.id,
      },
      data: {
        name: campaign.name,
        startDate: campaign.startDate,
        bonusAmount: campaign.bonusAmount,
        campaignLinks:  campaign.campaignLinks
      },
    });

    await revalidateTag(
        `${campaign.company?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-campaigns`,
    );
    await revalidateTag(
        `${campaign.company?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${campaign.id}`,
    );

    // if the company has a custom domain, we need to revalidate those tags too
    campaign.company?.customDomain &&
    (await revalidateTag(`${campaign.company?.customDomain}-campaigns`),
        await revalidateTag(`${campaign.company?.customDomain}-${campaign.id}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const deleteCampaign = withCampaignAuth(async (formData: FormData, campaignId: string, key: string | 'delete') => {
  try {
    const response = await prisma.campaign.delete({
      where: {
        id: campaignId,
      },
      select: {
        companyId: true,
      },
    });
    return response;
  } catch (error: any) {
    return { error: error.message};
  }
});

export const createPost = withCompanyAuth(async (_: FormData, company: Company) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const response = await prisma.post.create({
    data: {
      companyId: company.id,
      userId: session.user.id,
    },
  });

  await revalidateTag(
      `${company.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
  );
  company.customDomain && (await revalidateTag(`${company.customDomain}-posts`));

  return response;
});
export const updatePostMetadata = withPostAuth(
    async (
        formData: FormData,
        post: Post & {
          company: Company;
        },
        key: string,
    ) => {
      const value = formData.get(key) as string;

      try {
        let response;
        if (key === "image") {
          const file = formData.get("image") as File;
          const filename = `${nanoid()}.${file.type.split("/")[1]}`;

          const { url } = await put(filename, file, {
            access: "public",
          });

          const blurhash = await getBlurDataURL(url);

          response = await prisma.post.update({
            where: {
              id: post.id,
            },
            data: {
              image: url,
              imageBlurhash: blurhash,
            },
          });
        } else {
          response = await prisma.post.update({
            where: {
              id: post.id,
            },
            data: {
              [key]: key === "published" ? value === "true" : value,
            },
          });
        }

        await revalidateTag(
            `${post.company?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
        );
        await revalidateTag(
            `${post.company?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
        );

        // if the site has a custom domain, we need to revalidate those tags too
        post.company?.customDomain &&
        (await revalidateTag(`${post.company?.customDomain}-posts`),
            await revalidateTag(`${post.company?.customDomain}-${post.slug}`));

        return response;
      } catch (error: any) {
        if (error.code === "P2002") {
          return {
            error: `This slug is already in use`,
          };
        } else {
          return {
            error: error.message,
          };
        }
      }
    },
);
export const updatePost = async (data: Post) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const post = await prisma.post.findUnique({
    where: {
      id: data.id,
    },
    include: {
      company: true,
    },
  });
  if (!post || post.userId !== session.user.id) {
    return {
      error: "Post not found",
    };
  }
  try {
    const response = await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
      },
    });

    await revalidateTag(
        `${post.company?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    await revalidateTag(
        `${post.company?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    post.company?.customDomain &&
    (await revalidateTag(`${post.company?.customDomain}-posts`),
        await revalidateTag(`${post.company?.customDomain}-${post.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const deletePost = withPostAuth(async (_: FormData, post: Post) => {
  try {
    const response = await prisma.post.delete({
      where: {
        id: post.id,
      },
      select: {
        companyId: true,
      },
    });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const createBuddyList = withCompanyAuth(async (formData: FormData, company: Company) => {
  const session = await getSession();

  const response = await prisma.buddyList.create({
    data: {
      companyId: company.id
    },
  });
  await revalidateTag(
      `${company.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-buddyLists`,
  );
  company.customDomain && (await revalidateTag(`${company.customDomain}-buddyLists`));

  return response;
});

export const updateBuddyList = async (data: BuddyList) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const buddyList = await prisma.buddyList.findUnique({
    where: {
      id: data.id,
      filename: data.filename, // store the URL of the file
    },
    include: {
      company: true,
    },
  });
  if (!buddyList) {
    return {
      error: "BuddyList not found",
    };
    //  later add something like this || post.userId !== session.user.id
  }

  try {
    const response = await prisma.buddyList.update({
      where: {
        id: data.id,
      },
      data: {

      },
    });

    await revalidateTag(
        `${buddyList.company?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-buddyLists`,
    );
    await revalidateTag(
        `${buddyList.company?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${buddyList.id}`,
    );

    // if the company has a custom domain, we need to revalidate those tags too
    buddyList.company?.customDomain &&
    (await revalidateTag(`${buddyList.company?.customDomain}-buddyLists`),
        await revalidateTag(`${buddyList.company?.customDomain}-${buddyList.id}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const deleteBuddyList = withBuddyListAuth(async (formData: FormData, buddyListId: string, key: string | 'delete') => {
  try {
    const response = await prisma.buddyList.delete({
      where: {
        id: buddyListId,
      },
      select: {
        companyId: true,
      },
    });
    return response;
  } catch (error: any) {
    return { error: error.message};
  }
});


export const editUser = async (
  formData: FormData,
  _id: unknown,
  key: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const value = formData.get(key) as string;

  try {
    const response = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        [key]: value,
      },
    });
    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This ${key} is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};
