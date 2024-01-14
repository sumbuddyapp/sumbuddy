"use client";

import clsx from "clsx";
import useCampaignContext from "@/lib/hooks/use-campaign-context";
import CampaignWizardActions from "@/components/campaign-wizard/actions";
import CampaignFormWrapper from "@/components/campaign-wizard/wrapper";
import type {PutBlobResult} from '@vercel/blob';
import React, {useRef, useState} from 'react';
import BuddyListUploader from "@/components/form/buddy-list-uploader"

export default function BuddylistPage() {
    const {register, trigger, formState, setValue} = useCampaignContext();
    const {errors} = formState;
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setFileSize(file.size);
            const response = await fetch(`/api/upload/buddy-list?filename=${file.name}`, {
                method: 'POST',
                body: file,
            });
            // Store the URL in the form state
            const newBlob = (await response.json()) as PutBlobResult;
            setValue('buddyListURL', newBlob.url);
            setBlob(newBlob);
        }
    };


    return (
        <CampaignFormWrapper
            heading="Buddy List"
            description="Upload a csv file of employee sms capable phone numbers, names and employee ids. (or do this later)"
        >
            <label className="flex flex-col mt-4">
                <div className="flex justify-between">
                    {blob && (
                        <div>
                            Blob url: <a href={blob.url}>{blob.url}</a>
                        </div>
                    )}
                    {errors.buddyListURL && (
                        <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                    {errors.buddyListURL.message}
                    </span>
                    )}
                </div>
                <BuddyListUploader />

            </label>
            <CampaignWizardActions/>
        </CampaignFormWrapper>

    );
}
