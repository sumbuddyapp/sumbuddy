"use client";

import clsx from "clsx";
import useCampaignContext from "@/lib/hooks/use-campaign-context";
import CampaignFormWrapper from "@/components/campaign-wizard/wrapper";
import CampaignWizardActions from "@/components/campaign-wizard/actions";

export default function DetailsPage() {
    const { register, trigger, formState } = useCampaignContext();
    const { errors } = formState;

    return (
        <CampaignFormWrapper
            heading="Campaign Schedule"
            description="Define the frequency for sending out campaign messages"
        >

        <div className="flex flex-col mt-6">
            <label className="flex flex-col">
                <div className="flex justify-between">
          <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
            schedule
          </span>
                    {errors.schedule && (
                        <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
              {errors.schedule.message}
            </span>
                    )}
                </div>
                <input
                    placeholder="e.g. Floor Staff Roles Q1"
                    className={clsx(
                        "border",
                        errors.schedule
                            ? "border-strawberry-red"
                            : "border-light-gray focus:border-purplish-blue",
                        "py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1",
                        "text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold",
                        "focus:outline-none",
                    )}
                    {...register("schedule", {
                        required: "This field is required",
                        maxLength: {
                            value: 20,
                            message: "Name must be less than 20 characters",
                        },
                    })}
                    onBlur={() => trigger("schedule")}
                    autoComplete="schedule"
                />
            </label>
        </div>
            <CampaignWizardActions />
        </CampaignFormWrapper>
    );
}
