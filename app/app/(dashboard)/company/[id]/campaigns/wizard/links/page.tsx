"use client";

import clsx from "clsx";
import useCampaignContext from "@/lib/hooks/use-campaign-context";

export default function LinksPage() {
    const { register, trigger, formState } = useCampaignContext();
    const { errors } = formState;

    return (
        <div className="flex flex-col mt-6">
            <label className="flex flex-col">
                <div className="flex justify-between">
          <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
            link_one
          </span>
                    {errors.campaignLinks && errors.campaignLinks["link_one"] && (
                        <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
              {errors.campaignLinks["link_one"].message}
            </span>
                    )}
                </div>
                <input
                    type="url"
                    placeholder="e.g. https://example.com"
                    className={clsx(
                        "border",
                        errors.campaignLinks && errors.campaignLinks["link_one"]
                            ? "border-strawberry-red"
                            : "border-light-gray focus:border-purplish-blue",
                        "py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1",
                        "text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold",
                        "focus:outline-none",
                    )}
                    {...register("campaignLinks.link_one", {
                        required: "This field is required",
                        maxLength: {
                            value: 2000,
                            message: "URL must be less than 2000 characters",
                        },
                    })}
                    onBlur={() => trigger("campaignLinks.link_one")}
                    autoComplete="url"
                />
            </label>

            <label className="flex flex-col">
                <div className="flex justify-between">
          <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
            link two
          </span>
                    {errors.campaignLinks && errors.campaignLinks["link_two"] && (
                        <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
              {errors.campaignLinks["link_two"].message}
            </span>
                    )}
                </div>
                <input
                    type="url"
                    placeholder="e.g. https://example.com"
                    className={clsx(
                        "border",
                        errors.campaignLinks && errors.campaignLinks["link_two"]
                            ? "border-strawberry-red"
                            : "border-light-gray focus:border-purplish-blue",
                        "py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1",
                        "text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold",
                        "focus:outline-none",
                    )}
                    {...register("campaignLinks.link_two", {
                        required: "This field is required",
                        maxLength: {
                            value: 2000,
                            message: "URL must be less than 2000 characters",
                        },
                    })}
                    onBlur={() => trigger("campaignLinks.link_two")}
                    autoComplete="url"
                />
            </label>

            <label className="flex flex-col">
                <div className="flex justify-between">
          <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">
            link three
          </span>
                    {errors.campaignLinks && errors.campaignLinks["link_three"] && (
                        <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
              {errors.campaignLinks["link_three"].message}
            </span>
                    )}
                </div>
                <input
                    type="url"
                    placeholder="e.g. https://example.com"
                    className={clsx(
                        "border",
                        errors.campaignLinks && errors.campaignLinks["link_three"]
                            ? "border-strawberry-red"
                            : "border-light-gray focus:border-purplish-blue",
                        "py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1",
                        "text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold",
                        "focus:outline-none",
                    )}
                    {...register("campaignLinks.link_three", {
                        required: "This field is required",
                        maxLength: {
                            value: 2000,
                            message: "URL must be less than 2000 characters",
                        },
                    })}
                    onBlur={() => trigger("campaignLinks.link_three")}
                    autoComplete="url"
                />
            </label>
        </div>
    );
}
