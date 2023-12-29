import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import EditBuddyListForm from "@/components/form/edit-buddy-list-form";

export default async function BuddyListPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  console.log(params);
  // pause if params doesn't contain a valid buddyList id
    if (!params.id) {
        return <div>loading...</div>;
    }



  const data = await prisma.buddyList.findUnique({
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

  return <EditBuddyListForm buddyList={data} />;
}
