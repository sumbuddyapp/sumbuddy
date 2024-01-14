"use client";

import CampaignWizardActions from "@/components/campaign-wizard/actions";
import CampaignFormWrapper from "@/components/campaign-wizard/wrapper";
import BuddyListUploader from "@/components/form/buddy-list-uploader"

export default function BuddylistPage() {
    return (
        <CampaignFormWrapper
            heading="Buddy List"
            description="Upload a csv file of employee sms capable phone numbers, names and employee ids. (or do this later)"
        >
            <BuddyListUploader />
            <CampaignWizardActions/>
        </CampaignFormWrapper>

    );
}
