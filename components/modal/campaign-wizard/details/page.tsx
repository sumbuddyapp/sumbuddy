'use client';

import clsx from 'clsx';
import {useRouter} from 'next/navigation';
import useCampaignContext from "@/lib/hooks/use-campaign-context";
import CampaignFormWrapper from "@/components/modal/campaign-wizard/campaign-form-wrapper";
import CampaignFormActions from "@/components/modal/campaign-wizard/campaign-form-actions";

export default function DetailsPage() {
    const router = useRouter();
    const {register, trigger,
           formState} = useCampaignContext();
    const {isValid,
           errors} = formState;
    const validateStep = async () => {
        await trigger();
        if (isValid) {
            router.push('/buddylist');
        }
    };
    return (
        <CampaignFormWrapper heading="Referral Campaing" description="Set a name, a bonus amount, and the frequency mode">
          <div className="flex flex-col mt-6">
            <label className="flex flex-col">
                    <div className="flex justify-between">
                      <span className="capitalize text-xs text-marine-blue lg:text-sm font-medium tracking-wide">name</span>
                    {errors.name && (
                      <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">{errors.name.message}</span>
                    )}
                    </div>
                    <input
                        placeholder="e.g. Floor Staff Roles Q1"
                        className={clsx(
                            'border',
                            errors.name
                                ? 'border-strawberry-red'
                                : 'border-light-gray focus:border-purplish-blue',
                            'py-2 lg:py-3 px-3 lg:px-4 rounded-[4px] lg:rounded-lg mt-1',
                            'text-[15px] lg:text-base text-marine-blue placeholder:text-cool-gray font-medium lg:font-bold',
                            'focus:outline-none'
                        )}
                        {...register('name', {
                            required: 'This field is required',
                            maxLength: {
                                value: 20,
                                message: 'Name must be less than 20 characters',
                            },
                        })}
                        onBlur={() => trigger('name')}
                        autoComplete="name"
                    />
            </label>
          </div>
            <CampaignFormActions>
                <button type="button" onClick={validateStep}
                 className="bg-marine-blue transition duration-300 hover:opacity-80 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
                >
                Next Step
                </button>
            </CampaignFormActions>
        </CampaignFormWrapper>
    );


}
