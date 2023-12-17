import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import EditCampaignForm from "@/components/form/edit-campaign-form";

export default async function CampaignPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  console.log(params);
  // pause if params doesn't contain a valid campaign id
    if (!params.id) {
        return <div>loading...</div>;
    }



  const data = await prisma.campaign.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
    include: {
      company: {
        select: {
          subdomain: true,
        },
      },
    },
  });
  if (!data) {
    notFound();
  }

  return <EditCampaignForm campaign={data} />;
}
