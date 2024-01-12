"use client";

import clsx from "clsx";
import useCampaignContext from "@/lib/hooks/use-campaign-context";
import CampaignWizardActions from "@/components/campaign-wizard/actions";
import CampaignFormWrapper from "@/components/campaign-wizard/wrapper";
import React from "react";

export default function DetailsPage() {
    const { register, trigger, formState } = useCampaignContext();
    const { errors } = formState;

    return (
        <CampaignFormWrapper
            heading="Buddy List"
            description="Upload a csv file of employee sms capable phone numbers, names and emmployee ids. (or do this later)"
        >
        <label className="flex flex-col mt-4">
                <div className="flex justify-between">
                    <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
                        CSV File
                    </span>
                    {errors.buddyList && (
                    <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                        {errors.buddyList.message}
                    </span>
                    )}
                </div>
                <input
                    type="file"
                    accept=".csv"
                    className={clsx(
                        "border",
                        errors.buddyList
                            ? "border-strawberry-red"
                            : "border-light-gray focus:border-purplish-blue",
                        "py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1",
                        "text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold",
                        "focus:outline-none",
                    )}
                    {...register("buddyList", {
                        required: "This field is required",
                    })}
                    onChange={() => trigger("buddyList")}
                />
            </label>
        <div className="flex flex-col mt-6">
            <label className="flex flex-col">
                <div className="flex justify-between">
          <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
            fileName
          </span>
                    {errors.fileName && (
                        <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
              {errors.fileName.message}
            </span>
                    )}
                </div>
                <input
                    className={clsx(
                        "border",
                        errors.fileName
                            ? "border-strawberry-red"
                            : "border-light-gray focus:border-purplish-blue",
                        "py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1",
                        "text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold",
                        "focus:outline-none",
                    )}
                    {...register("fileName", {
                        required: "This field is required",
                        maxLength: {
                            value: 20,
                            message: "filname must be short",
                        },
                    })}
                    onBlur={() => trigger("fileName")}
                    autoComplete="fileName"
                />
            </label>
        </div>
    <CampaignWizardActions/>
</CampaignFormWrapper>

);
}
// 'use client';
//
// import type { PutBlobResult } from '@vercel/blob';
// import { useState, useRef } from 'react';
//
// export default function AvatarUploadPage() {
//     const inputFileRef = useRef<HTMLInputElement>(null);
//     const [blob, setBlob] = useState<PutBlobResult | null>(null);
//     return (
//         <>
//             <h1>Upload Your Avatar</h1>
//
//             <form
//                 onSubmit={async (event) => {
//                     event.preventDefault();
//
//                     if (!inputFileRef.current?.files) {
//                         throw new Error('No file selected');
//                     }
//
//                     const file = inputFileRef.current.files[0];
//
//                     const response = await fetch(
//                         `/api/avatar/upload?filename=${file.name}`,
//                         {
//                             method: 'POST',
//                             body: file,
//                         },
//                     );
//
//                     const newBlob = (await response.json()) as PutBlobResult;
//
//                     setBlob(newBlob);
//                 }}
//             >
//                 <input name="file" ref={inputFileRef} type="file" required />
//                 <button type="submit">Upload</button>
//             </form>
//             {blob && (
//                 <div>
//                     Blob url: <a href={blob.url}>{blob.url}</a>
//                 </div>
//             )}
//         </>
//     );
// }