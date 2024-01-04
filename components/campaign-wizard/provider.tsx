'use client';
import {CampaignFormValues} from "@/types/campaign-form-values";
import React, {createContext, ReactNode, useContext, useState} from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function CampaignWizardProvider({ children }: FormProviderProps) {
    const route = useRouter();
    const methods = useForm<CampaignFormValues>({
        defaultValues: {
            name: '',
            startDate: new Date(),
            campaignLinks: {
                link_one: '',
                link_two: '',
                link_three: '',
            },
            bonusAmount: 50,
            active: true,
            companyId: '',
            buddyListId: '',
            currentSegment: 'details'
        },
    });

    const onSubmit: SubmitHandler<CampaignFormValues> = (data) => {
        const isValid = !!(data.name &&  data.companyId);

        if (isValid) {
            route.push('/thank-you');
        } else {
            route.replace('/schedule_type');
        }
    };

    return (
        <CampaignWizardProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-full">
                {children}
            </form>
        </CampaignWizardProvider>
    );
}

interface FormProviderProps {
    children: React.ReactNode;
}
