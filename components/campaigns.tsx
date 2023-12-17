import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import CampaignCard from "./campaign-card";
import Image from "next/image";

export default async function Campaigns({
  companyId,
  limit,
}: {
  companyId?: string;
  limit?: number;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const campaigns = await prisma.campaign.findMany({
    where: {
      ...(companyId ? { companyId } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      company: true,
    },
    ...(limit ? { take: limit } : {}),
  });

  return campaigns.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} data={campaign} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Campaigns Yet</h1>
      <Image
        alt="missing campaign"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any campaigns yet. Create one to get started.
      </p>
    </div>
  );
}
