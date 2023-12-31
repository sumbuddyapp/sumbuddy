import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import CreateCompanyButton from "./modal/buttons/create-company";
import CreateCompanyModal from "./modal/create-company";
import Link from "next/link";

export default async function OverviewCompaniesCta() {
  const session = await getSession();
  if (!session) {
    return 0;
  }
  const Companies = await prisma.company.count({
    where: {
      userId: session.user.id as string,
    },
  });

  return Companies > 0 ? (
    <Link
      href="/companies"
      className="rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
    >
      View All Companies
    </Link>
  ) : (
    <CreateCompanyButton>
      <CreateCompanyModal />
    </CreateCompanyButton>
  );
}
