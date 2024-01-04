"use client";
// Styles
import '@/styles/globals.css';

import clsx from "clsx";
import CampaignFormWrapper from "@/components/campaign-wizard/wrapper";
import CampaignWizardActions from "@/components/campaign-wizard/actions";
import CampaignWizardSidebar from "@/components/campaign-wizard/sidebar";
import CampaignWizardProvider from "@/components/campaign-wizard/provider";
import React from "react";


export default function WizardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="font-normal relative w-full max-w-lg lg:max-w-[940px]">
            <div className="lg:bg-white w-full flex flex-col lg:flex-row px-4 lg:p-4 rounded-2xl lg:shadow-lg">
                <CampaignWizardSidebar />
                <CampaignWizardProvider>
                    {children}
                </CampaignWizardProvider>
                  </div>
            <footer
                className={clsx(
                    "absolute -bottom-16 lg:-bottom-12",
                    "py-4 px-4",
                    "text-xs lg:text-sm text-cool-gray",
                    "flex flex-col gap-x-1 lg:flex-row justify-center w-full items-center",
                )}
            >
        <span>
          {" "}
            Coded by{" "}
            <a
                href="https://github.com/sumbuddyapp"
                target="_blank"
                className="text-marine-blue"
            >
            Sumbuddy Team
          </a>
          .
        </span>
            </footer>
        </main>
    );
}
