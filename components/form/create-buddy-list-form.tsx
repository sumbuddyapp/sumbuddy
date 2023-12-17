"use client";

import { toast } from "sonner";
import { createBuddyList} from "@/lib/actions";
import {useParams, useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import va from "@vercel/analytics";
import Uploader from "@/components/uploader";

export default function CreateBuddyListForm() {
    const router = useRouter();
    const { id } = useParams() as { id: string };

    // TODO: add role based access control
    // if (!data || data.userId !== session.user.id) {
    //   notFound();
    // }

    const [data, setData] = useState({
    });


    useEffect(() => {
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            setData(JSON.parse(savedFormData));
        }
    }, []);
    // Save form data to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(data));
    }, [data]);
    // Update form data and save to local storage when form fields change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData = { ...data, [e.target.name]: e.target.value };
        setData(newData);
        localStorage.setItem('formData', JSON.stringify(newData));
    };
    return (
        <form action={async (data: FormData) =>
            createBuddyList(data, id, null).then((res: any) => {
                if (res.error) {
                    toast.error(res.error);
                } else {
                    va.track("Created BuddyList");
                    const { id } = res;
                    router.refresh();
                    router.push(`/buddy-list/${id}`);
                    toast.success(`Successfully created buddyList!`);
                }
            })
        }
              className="w-full rounded-md bg-white dark:bg-black md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700"
        >
            <div className="relative flex flex-col space-y-4 p-5 md:p-10">
                <h2 className="font-cal text-2xl dark:text-white">Create a new buddy list</h2>
                <div className="flex flex-col space-y-2">
                    <Uploader/>
                </div>
                <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 md:px-10">
                    <CreateBuddyListFormButton />
                </div>
            </div>
        </form>
    );
}

function CreateBuddyListFormButton() {
    const { pending } = useFormStatus();
    return (
        <button
            className={cn(
                "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
                pending
                    ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                    : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
            )}
            disabled={pending}
        >
            {pending ? <LoadingDots color="#808080" /> : <p>Create BuddyList</p>}
        </button>
    );
}
