"use client";
import clsx from "clsx";
import { toast } from "sonner";
// Styles
import "@/styles/globals.css";
import useCampaignContext, {
    useMultiStepForm,
} from "@/lib/hooks/use-campaign-context";
import CampaignWizardSidebar from "./sidebar";
import { useState } from "react";
import { useRouter } from "next/router";
import Details from "./details/page";
import Summary from "./summary/page";
import CampaignWizardProvider from "./provider";

export const metadata = {
    title: "Multi-step Campaign Creation Form | SumBuddy",
    description: "Front Line Employee Referral Platform",
};

export default function CampaignWizard({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const [step, setStep] = useState("1");
    const validateStep = async () => {
        await trigger();
        if (isValid) {
            router.push("/buddylist");
        }
    };
    const { register, trigger, formState } = useCampaignContext();
    const { currentStep } = useMultiStepForm([
        "details",
        "buddylist",
        "links",
        "schedule",
        "summary",
    ]);
    const { isValid, errors } = formState;

    return (

    );
}
