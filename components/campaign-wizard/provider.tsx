'use client';
import {CampaignFormValues} from "@/types/campaign-form-values";
import React, {createContext, ReactNode, useContext, useState} from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function CampaignWizardProvider({ children }: FormProviderProps) {
    const route = useRouter();
    const methods = useForm<CampaignFormValues>({
    });

    const onSubmit: SubmitHandler<CampaignFormValues> = (data) => {
        console.log(data)
        route.push('./thank-you');
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-full">
                {children}
            </form>
        </FormProvider>
    );
}

interface FormProviderProps {
    children: React.ReactNode;
}
