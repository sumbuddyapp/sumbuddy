import {useState } from 'react';
import { useFormContext } from 'react-hook-form';
// Types
import { CampaignFormValues } from '@/types/campaign-form-values';


export const useMultiStepForm = (steps: []) => {
    // States
    const [currentStep, setCurrentStep] = useState(0);

    // Setting and increase currentStep by 1
    // Return the next step from the array
    const next = () => {
        setCurrentStep((prev) => {
            if (prev < steps.length - 1) return prev + 1;
            return prev;
        });
    };

    // Setting and decrease currenStep by 1
    // Return the previous step in the steps array
    const back = () => {
        setCurrentStep((prev) => {
            if (prev > 0) return prev - 1;
            return prev;
        });
    };

    // Setting current step to any given index
    const goTo = (index: number) => {
        setCurrentStep(index);
    };

    return {
        next,
        back,
        goTo,
        Step: steps[currentStep],
        currentStep,
        isLastStep: currentStep === steps.length - 1,
        isFirstStep: currentStep === 0,
    };
};


export default function useCampaignContext() {
    return useFormContext<CampaignFormValues>();
}
