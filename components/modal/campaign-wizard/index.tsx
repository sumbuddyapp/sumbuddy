'use client';
import clsx from 'clsx';
import { toast } from "sonner";
// Styles
import '@/styles/globals.css';
import useCampaignContext from "@/lib/hooks/use-campaign-context";
import Sidebar from './sidebar';
import { useState } from "react";
import { useRouter } from 'next/router';
import Details from "./details/page";
import Summary from "./summary/page";
import CampaignWizardProvider from "./provider";

export const metadata = {
    title: 'Multi-step Campaign Creation Form | SumBuddy',
    description: 'Front Line Employee Referral Platform',
};


export default function CampaignWizard({children,}: {
    children: React.ReactNode
}) {
    const router = useRouter();

    const [step, setStep] = useState('1');
    const validateStep = async () => {
        await trigger();
        if (isValid) {
            router.push('/buddylist');
        }
    };
    const {
        register, trigger,
        formState
    } = useCampaignContext();
    const {
        isValid,
        errors
    } = formState;


    return (
            <main className="font-normal relative w-full max-w-lg lg:max-w-[940px]">
                <div className="lg:bg-white w-full flex flex-col lg:flex-row px-4 lg:p-4 rounded-2xl lg:shadow-lg">
                    <Sidebar/>
                    <CampaignWizardProvider>{children}</CampaignWizardProvider>
                </div>
                <footer className={clsx(
                    'absolute -bottom-16 lg:-bottom-12',
                    'py-4 px-4',
                    'text-xs lg:text-sm text-cool-gray',
                    'flex flex-col gap-x-1 lg:flex-row justify-center w-full items-center'
                )}
                ><span> Coded by{' '} <a href="https://github.com/sumbuddyapp" target="_blank"
                                         className="text-marine-blue">
                    Sumbuddy Team
                    </a>
            .
            </span>
                </footer>
            </main>
    );
}





