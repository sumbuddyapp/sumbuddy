import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import useCampaignContext from "@/lib/hooks/use-campaign-context";
import CampaignWizardStep from "@/components/campaign-wizard/step";

export default function CampaignWizardActions() {
    const router = useRouter();
    const { trigger, formState } = useCampaignContext();
    const { isValid } = formState;
    const segment = useSelectedLayoutSegment() as
        | 'details'
        | 'buddylist'
        | 'links'
        | 'schedule'
        | 'summary';

    const validateStep = async () => {
        await trigger();
        if (isValid) {
            router.push(`/${next()}`);
        }
    };

    const previous = () => {
        switch (segment) {
            case 'buddylist': return 'details';
            case 'links': return 'buddylist';
            case 'schedule': return 'links';
            case 'summary': return 'schedule';
            default: return '';
        }
    };

    const next = () => {
        switch (segment) {
            case 'details': return 'buddylist';
            case 'buddylist': return 'links';
            case 'links': return 'schedule';
            case 'schedule': return 'summary';
            default: return '';
        }
    };

    // Define the steps array here as before
    // ...

    return (
        <div className="mt-auto flex justify-between items-center lg:static fixed lg:bottom-auto bottom-0 lg:inset-auto inset-x-0 lg:z-0 z-10 lg:bg-transparent bg-white lg:drop-shadow-none drop-shadow-2xl lg:p-0 p-4">
            {segment !== 'details' && (
                <button
                    type="button"
                    onClick={() => router.push(`/${previous()}`)}
                    className="bg-marine-blue transition duration-300 hover:opacity-80 text-magnolia mr-4 px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
                >
                    Previous Step
                </button>
            )}

            {segment !== 'summary' && (
                <button
                    type="button"
                    onClick={validateStep}
                    className="bg-marine-blue transition duration-300 hover:opacity-80 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
                >
                    Next Step
                </button>
            )}

            {segment === 'summary' && (
                <button
                    type="submit"
                    className="bg-marine-blue transition duration-300 hover:opacity-80 text-magnolia ml-auto px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
                >
                    Submit
                </button>
            )}
        </div>
    );
}
