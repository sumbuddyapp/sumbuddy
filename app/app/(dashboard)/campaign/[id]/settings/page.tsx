import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Form from "@/components/form";
import DeleteCampaignForm from "@/components/form/delete-campaign-form";

export default async function CampaignSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.campaign.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });
  // if (!data || data.userId !== session.user.id) {
  //   notFound();
  // }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Campaign Settings
        </h1>

        <DeleteCampaignForm />
      </div>
    </div>
  );
}
