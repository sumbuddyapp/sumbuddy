"use client";

import clsx from "clsx";
import useCampaignContext from "@/lib/hooks/use-campaign-context";
import CampaignWizardActions from "@/components/campaign-wizard/actions";
import CampaignFormWrapper from "@/components/campaign-wizard/wrapper";
import React, {useRef, useState} from 'react';
import BuddyListUploader from "@/components/form/buddy-list-uploader"

export default function BuddylistPage() {
    const {register, trigger, formState, setValue} = useCampaignContext();
    const {errors} = formState;




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
