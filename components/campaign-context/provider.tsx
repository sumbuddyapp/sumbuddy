'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import {CampaignFormValues} from "@/types/campaign-form-values";

export default function Provider({ children }: FormProviderProps) {
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
