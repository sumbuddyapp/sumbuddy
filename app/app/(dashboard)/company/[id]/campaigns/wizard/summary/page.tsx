"use client";

import clsx from "clsx";
import useCampaignContext from "@/lib/hooks/use-campaign-context";
import CampaignFormWrapper from "@/components/campaign-wizard/wrapper";
import CampaignWizardActions from "@/components/campaign-wizard/actions";
export default function SummaryPage() {
    const { register, trigger, formState } = useCampaignContext();
    const { errors } = formState;
    const { watch } = useCampaignContext();
    // Watch all form values
    const values = watch();

    return (
        <CampaignFormWrapper
            heading="Campaign Summary"
            description="Review your campaign settings before submitting."
        >

        <div className="flex flex-col mt-6">
                {/* Display form values */}
                <pre>{JSON.stringify(values, null, 2)}</pre>

        </div>
        <CampaignWizardActions />
        </CampaignFormWrapper>
    );
}
