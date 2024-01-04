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
