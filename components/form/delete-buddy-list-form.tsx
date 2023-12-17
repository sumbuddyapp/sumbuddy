"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useFormStatus, useFormState } from "react-dom";
import {useParams, useRouter} from "next/navigation";
import {getCompanyFromBuddyListId, deleteBuddyList} from "@/lib/actions";
import {toast} from "sonner";
import va from "@vercel/analytics";


export default function DeleteBuddyListForm() {
    const { id } = useParams() as { id: string };
    const router = useRouter();

    return (
      <form
          action={async (data: FormData)=>
          deleteBuddyList(data, id, 'delete').then((res: any) => {
              if (res.error) {
                  toast.error(res.error);
              } else {
                  va.track("Deleted BuddyList");
                  const { id } = res;
                  router.refresh();
                  router.push(`/company/${id}`);
                  toast.success(`Successfully deleted buddyList!`);
              }
          })
      }
      className="rounded-lg border border-red-600 bg-white dark:bg-black"
      >
        <input type="hidden" name="buddyListId" value={id} />
        <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
          <p className="text-center text-sm text-stone-500 dark:text-stone-400">
            This action is irreversible. Please proceed with caution.
          </p>
          <div className="w-32">
           <DeleteButton />
          </div>
        </div>
      </form>
  )
}


function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" aria-disabled={pending}
      className={cn(
        "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 dark:hover:bg-transparent",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Delete BuddyList</p>}
    </button>
  );
}
