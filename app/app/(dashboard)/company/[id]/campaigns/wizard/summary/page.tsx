"use client";

import clsx from "clsx";
import useCampaignContext from "@/lib/hooks/use-campaign-context";

export default function DetailsPage() {
    const { register, trigger, formState } = useCampaignContext();
    const { errors } = formState;

    return (
        <div className="flex flex-col mt-6">
        {/*This should be a non editable summary of the values in the form
            name: string;
            fileName: string;
            campaignLinks: {
                link_one: string;
                link_two: string;
                link_three: string;
            };
           schedule: string;
}

        */}
        </div>
    );
}
