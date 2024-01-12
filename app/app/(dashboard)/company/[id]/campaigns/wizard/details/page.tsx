"use client";

import clsx from "clsx";
import useCampaignContext from "@/lib/hooks/use-campaign-context";
import CampaignWizardActions from "@/components/campaign-wizard/actions";
import CampaignFormWrapper from "@/components/campaign-wizard/wrapper";
import React from "react";

export default function DetailsPage() {
    const {register, trigger, formState} = useCampaignContext();
    const {errors} = formState;

    return (
        <CampaignFormWrapper
            heading="Campaign Details"
            description="Set a name, a bonus amount, and the frequency mode"
        >
            <div className="flex flex-col mt-6">
                <label className="flex flex-col">
                    <div className="flex justify-between mt-2">
            <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
              name
            </span>
                        {errors.name && (
                            <span
                                className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.name.message}
              </span>
                        )}
                    </div>
                    <input
                        placeholder="e.g. Floor Staff Roles Q1"
                        className={clsx(
                            "border",
                            errors.name
                                ? "border-strawberry-red"
                                : "border-light-gray focus:border-purplish-blue",
                            "py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1",
                            "text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold",
                            "focus:outline-none",
                        )}
                        {...register("name", {
                            required: "This field is required",
                            maxLength: {
                                value: 20,
                                message: "Name must be less than 20 characters",
                            },
                        })}
                        onBlur={() => trigger("name")}
                        autoComplete="name"
                    />
                </label>

                <label className="flex flex-col mt-4">
                    <div className="flex justify-between mt-2">
            <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
              bonus amount
            </span>
                        {errors.bonusAmount && (
                            <span
                                className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                {errors.bonusAmount.message}
              </span>
                        )}
                    </div>
                    <input
                        type="number"
                        min="0"
                        step="10"
                        defaultValue="50"
                        className={clsx(
                            "border",
                            errors.bonusAmount
                                ? "border-strawberry-red"
                                : "border-light-gray focus:border-purplish-blue",
                            "w-1/4 py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1",
                            "text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold",
                            "focus:outline-none",
                        )}
                        {...register("bonusAmount", {
                            required: "This field is required",
                            pattern: {
                                value: /^[0-9]+$/,
                                // value: /^\d*(\.\d{0,2})?$/,

                                message: "Bonus amount must be a number",
                            },

                        })}
                        onBlur={() => trigger("bonusAmount")}
                        autoComplete="bonusAmount"
                    />
                </label>
                <label className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        {...register("schedulable")}
                    />
                    <span className="ml-2 text-gray-700">Schedulable</span>
                </label>
            </div>
            <CampaignWizardActions/>
        </CampaignFormWrapper>
    );
}
