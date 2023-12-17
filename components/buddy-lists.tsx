import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import BuddyListCard from "@/components/buddy-list-card";
import Image from "next/image";

export default async function BuddyLists({
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
  const buddyLists = await prisma.buddyList.findMany({
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

  return buddyLists.length > 0 ? (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {buddyLists.map((buddylist) => (
            <BuddyListCard key={buddylist.id} data={buddylist} />
        ))}
      </div>
  ) : (
      <div className="flex flex-col items-center space-x-4">
        <h1 className="font-cal text-4xl">No BuddyLists Yet</h1>
        <Image
            alt="missing campaign"
            src="https://illustrations.popsy.co/gray/graphic-design.svg"
            width={400}
            height={400}
        />
        <p className="text-lg text-stone-500">
          You do not have any buddy lists yet. Create one to get started.
        </p>
      </div>
  );
}
