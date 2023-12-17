"use client";

import { useEffect, useState, useTransition } from "react";
import { Campaign } from "@prisma/client";
import { updateCampaign } from "@/lib/actions";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import LoadingDots from "./icons/loading-dots";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

type CampaignWithCompany = Campaign & { company: { subdomain: string | null } | null };

export default function CampaignEditor({ campaign }: { campaign: CampaignWithCompany }) {
    let [isPendingSaving, startTransitionSaving] = useTransition();
    let [isPendingActive, startTransitionActive] = useTransition();
    const [data, setData] = useState<CampaignWithCompany>(campaign);
    const [hydrated, setHydrated] = useState(false);

    const url = process.env.NEXT_PUBLIC_VERCEL_ENV
        ? `https://${data.company?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.id}`
        : `http://${data.company?.subdomain}.localhost:3000/${data.id}`;

    // listen to CMD + S and override the default behavior
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey && e.key === "s") {
                e.preventDefault();
                startTransitionSaving(async () => {
                    await updateCampaign(data);
                });
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [data, startTransitionSaving]);
    const inputClass = "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

    return (
        <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 dark:border-stone-700 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
            <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
                {data.active && (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </a>
                )}
                <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500">
                    {isPendingSaving ? "Saving..." : "Saved"}
                </div>
                <button
                    onClick={() => {
                        const formData = new FormData();
                    }}
                    className={cn(
                        "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none",
                        isPendingActive
                            ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                            : "border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
                    )}
                    disabled={isPendingActive}
                >
                    {isPendingActive ? (
                        <LoadingDots />
                    ) : (
                        <p>{"Update"}</p>
                    )}
                </button>
            </div>

            <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
                    <input type="hidden" id="campaignId" name="campaignId" value={campaign.id}/>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Campaign Name</label>
                        <input type="text" id="name" name="name" required
                               className={inputClass}
                               defaultValue={campaign.name}/>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input type="date" id="startDate" name="startDate" required
                               className={inputClass}
                               defaultValue={new Date(campaign.startDate).toISOString().split('T')[0]}/>
                        <label htmlFor="link1" className="block text-sm font-medium text-gray-700">Link 1</label>
                        <input type="url" id="link1" name="link1"
                               className={inputClass}
                               defaultValue={campaign?.campaignLinks[0]}/>
                        <label htmlFor="link2" className="block text-sm font-medium text-gray-700">Link 2</label>
                        <input type="url" id="link2" name="link2"
                               className={inputClass}
                               defaultValue={campaign?.campaignLinks[1]}/>
                        <label htmlFor="link3" className="block text-sm font-medium text-gray-700">Link 3</label>
                        <input type="url" id="link3" name="link3"
                               className={inputClass}
                               defaultValue={campaign?.campaignLinks[2]}/>
                        <label htmlFor="bonusAmount" className="block text-sm font-medium text-gray-700">Bonus Amount</label>
                        <input type="number" id="bonusAmount" name="bonusAmount" required step="10"
                               className={inputClass}
                               defaultValue={campaign.bonusAmount}/>
                    {/*<button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Save</button>*/}
            </div>

        </div>
    );
}
