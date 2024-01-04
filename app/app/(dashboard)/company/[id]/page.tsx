import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Campaigns from "@/components/campaigns";
import Link from 'next/link';
import CampaignWizard from "../../../../../components/campaign-wizard";
import CampaignWizardButton from "@/components/campaign-wizard/campaign-wizard-button";
export default async function CompanyCampaigns({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }


  const data = await prisma.company.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  if (!data || data.userId !== session.user.id) {
    return notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="w-60 truncate font-cal text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
            All Campaigns for {data.name}
          </h1>
          <a
            href={process.env.NEXT_PUBLIC_VERCEL_ENV ? `https://${url}` : `http://${data.subdomain}.localhost:3000`}
            target="_blank"
            rel="noreferrer"
            className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>
        </div>
      </div>
      <Campaigns companyId={decodeURIComponent(params.id)} />
    </>
  );
}