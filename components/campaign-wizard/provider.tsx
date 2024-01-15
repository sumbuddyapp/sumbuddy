'use client';
import {CampaignFormValues} from "@/types/campaign-form-values";
import React, {createContext, ReactNode, useContext, useState} from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import {useParams, useRouter} from 'next/navigation';
import { createCampaign } from "@/lib/actions";
import {toast} from "sonner";
import va from "@vercel/analytics";


export default function CampaignWizardProvider({ children }: FormProviderProps) {
    const route = useRouter();
    const methods = useForm<CampaignFormValues>({
    });
    const { id: companyId } = useParams() as { id: string };



    return (
        <FormProvider {...methods}>

            <form action={async (data: FormData) =>
                createCampaign(data, companyId, null).then((res: any) => {
                    if (res.error) {
                        toast.error(res.error);
                    } else {
                        va.track("Created Campaign");
                        const { campaign_id } = res;
                        route.refresh();
                        route.push(`/campaign/${campaign_id}`);
                        toast.success(`Successfully created campaign!`);
                    }
                })
            }
            className="flex w-full">
            {/*<form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-full">*/}
                {children}
            </form>
        </FormProvider>
    );
}

interface FormProviderProps {
    children: React.ReactNode;
}
