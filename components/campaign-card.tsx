import {Campaign, Company} from "@prisma/client";
import Link from "next/link";

export default function CampaignCard({
                                         data,
                                     }: {
    data: Campaign & { company: Company | null };
}) {
    return (
        <div
            className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
            <Link
                href={`/campaign/${data.id}`}
                className="flex flex-col overflow-hidden rounded-lg"
            >
                <div className="relative h-44 overflow-hidden">
                    {/*get and render in Mon Nov 12, 2023 format for the startDate from the data object*/}
                    <p className="absolute top-2 right-2 text-sm font-medium text-white bg-stone-500 rounded-md px-2 py-1">
                        {new Date(data.startDate).toLocaleDateString("en-US")}</p>
                    {data.campaignLinks && (
                        <div className="absolute top-2 left-2 text-sm font-medium text-white bg-stone-500 rounded-md px-2 py-1">
                            {data.campaignLinks?.map((link: any) => (
                                link.url
                            ))}
                        </div>
                    )}

                    <div className="border-t border-stone-200 p-4 dark:border-stone-700">
                        <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white">
                            {data.name}
                        </h3>
                        <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
                            {data.bonusAmount}
                        </p>
                    </div>
                </div>

            </Link>
        </div>
    );
}
