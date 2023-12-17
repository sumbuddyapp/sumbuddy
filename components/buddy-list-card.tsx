import { BuddyList, Company } from "@prisma/client";
import Link from "next/link";
import {FileSpreadsheet} from "lucide-react";
export default function BuddyListCard({
                                          data,
                                      }: {
    data: BuddyList & { company: Company | null; buddyCount: number };
}) {
    return (
        <div className="relative rounded-lg border border-stone-200 shadow-md transition-all hover:shadow-xl dark:border-stone-700">
            <Link href={`/buddy-list/${data.id}`} className="flex flex-col overflow-hidden rounded-lg">
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold tracking-wide dark:text-white">
                            {data.filename}
                        </h3>
                        <FileSpreadsheet className="h-6 w-6 text-stone-500" /> {/* CSV Icon */}
                    </div>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                        Created: {new Date(data.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                        Buddies Count: {data.buddyCount}
                    </p>
                </div>
            </Link>
        </div>
    );
}
