"use client";

import { toast } from "sonner";
import { createCampaign } from "@/lib/actions";
import {useParams, useRouter} from "next/navigation";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import va from "@vercel/analytics";
import Uploader from "@/components/uploader";

export default function CreateCampaignForm() {
    const router = useRouter();
    const { id } = useParams() as { id: string };

    // TODO: add role based access control
    // if (!data || data.userId !== session.user.id) {
    //   notFound();
    // }

    const [data, setData] = useState({
        name: "",
        // set startDate to today
        startDate: new Date().toISOString().split('T')[0],
        link1: "https://example.com/jobs/link?jobid=1",
        link2: "https://example.com/jobs/linkjobid=2",
        link3: "https://example.com/jobs/linkjobid=3",
        bonusAmount: 50,
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
            createCampaign(data, id, null).then((res: any) => {
                if (res.error) {
                    toast.error(res.error);
                } else {
                    va.track("Created Campaign");
                    const { id } = res;
                    router.refresh();
                    router.push(`/campaign/${id}`);
                    toast.success(`Successfully created campaign!`);
                }
            })
        }
              className="w-full rounded-md bg-white dark:bg-black md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700"
        >
            <div className="relative flex flex-col space-y-4 p-5 md:p-10">
                <h2 className="font-cal text-2xl dark:text-white">Create a new campaign</h2>

                <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium text-stone-500 dark:text-stone-400"
                    >
                        Campaign Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        placeholder="New Referral Campaign"
                        autoFocus
                        value={data.name || new Date().toLocaleString('en-US', { month: 'short', day: '2-digit' }) + ' Campaign'}
                        onChange={handleChange}
                        maxLength={32}
                        required
                        className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                    />
                </div>
                <label
                    htmlFor="startDate"
                    className="text-sm font-medium text-stone-500 dark:text-stone-400"
                >
                    Start Date
                </label>
                <input
                    name="startDate"
                    type="date"
                    placeholder=""
                    autoFocus
                    value={data.startDate || new Date().toISOString().split('T')[0]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                />
                <label
                    htmlFor="link1"
                    className="text-sm font-medium text-stone-500 dark:text-stone-400"
                >
                    Link 1
                </label>
                <input
                    name="link1"
                    type="url"
                    placeholder={`https://yourcompany.com/jobs/link`}
                    autoFocus
                    value={data.link1}
                    onChange={handleChange}
                    className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                />
                <label
                    htmlFor="link2"
                    className="text-sm font-medium text-stone-500 dark:text-stone-400"
                >
                    Link 2
                </label>
                <input
                    name="link2"
                    type="url"
                    placeholder={`https://yourcompany.com/jobs/link`}
                    autoFocus
                    value={data.link2}
                    onChange={handleChange}
                    className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                />
                <label
                    htmlFor="link3"
                    className="text-sm font-medium text-stone-500 dark:text-stone-400"
                >
                    Link 3
                </label>
                <input
                    name="link3"
                    type="url"
                    placeholder={`https://yourcompany.com/jobs/link`}
                    autoFocus
                    value={data.link3}
                    onChange={handleChange}
                    className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                />
                <label
                    htmlFor="bonusAmount"
                    className="text-sm font-medium text-stone-500 dark:text-stone-400"
                >
                    Bonus Amount
                </label>
                <input
                    name="bonusAmount"
                    type="number"
                    step="10"
                    placeholder="My Awesome Company"
                    autoFocus
                    value={data.bonusAmount}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
                />
                <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 md:px-10">
                    <CreateCampaignFormButton />
                </div>
            </div>
        </form>
    );
}

function CreateCampaignFormButton() {
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
            {pending ? <LoadingDots color="#808080" /> : <p>Create Campaign</p>}
        </button>
    );
}
