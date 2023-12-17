import { getServerSession, type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          gh_username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login", // Error code passed in query string as ?error=
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        // @ts-expect-error
        id: token.sub,
        // @ts-expect-error
        username: token?.user?.username || token?.user?.gh_username,
      };
      return session;
    },
  },
};

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
    };
  } | null>;
}

export function withCompanyAuth(action: any) {
  return async (
    formData: FormData | null,
    companyId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session) {
      return {
        error: "Not authenticated",
      };
    }
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });
    // if (!company || company.userId !== session.user.id) {
    //   return {
    //     error: "Not authorized",
    //   };
    // }

    return action(formData, company, key);
  };
}

export function withPostAuth(action: any) {
  return async (
    formData: FormData | null,
    postId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
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

    return action(formData, post, key);
  };
}
export function withCampaignAuth(action: any) {
  return async (
      formData: FormData | null,
      campaignId: string,
      key: string | null,
  ) =>
  {
    const session = await getSession();
    if (!session?.user) {
      return {
        error: "Not authenticated",
      };
    }

    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },
      include: {
        company: true,
      },
    });

    if (!campaign || !(session?.user)) {
      return {
        error: "Campaign not found or not authorized",
      };
    }

    return action(formData, campaign, key);
  };
}
export function withBuddyListAuth(action: any) {
  return async (
      formData: FormData | null,
      buddyListId: string,
      key: string | null,
  ) =>
  {
    const session = await getSession();
    if (!session?.user) {
      return {
        error: "Not authenticated",
      };
    }

    const buddyList = await prisma.buddyList.findUnique({
      where: {
        id: buddyListId,
      },
      include: {
        company: true,
      },
    });

    if (!buddyList || !(session?.user)) {
      return {
        error: "Buddy List not found or not authorized",
      };
    }

    return action(formData, buddyList, key);
  };
}


