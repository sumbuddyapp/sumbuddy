import { useRouter, usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import useCampaignContext from "@/lib/hooks/use-campaign-context";
import CampaignWizardStep from "@/components/campaign-wizard/step";

export default function CampaignWizardActions() {
    const router = useRouter();
    const { trigger, formState } = useCampaignContext();
    const { isValid } = formState;
    const { watch } = useCampaignContext();
    const values = watch();
    const schedulable = values.schedulable;


    const pathname = usePathname();
    const tailEnd = pathname.split('/').pop();
    console.log('Tail end of pathname:', tailEnd);
    const segment = tailEnd
    console.log('Segment:', segment);
    const validateStep = async () => {
        await trigger();
        if (isValid) {
            router.push(`./${next()}`);
        } else {
            alert('Please fix the errors in the form');
        }
    };

    const previous = () => {
        switch (segment) {
            case 'thank-you': return 'thank-you';
            case 'summary': return schedulable ? 'schedule' : 'links';
            case 'schedule': return 'links';
            case 'links': return  'buddylist';
            case 'buddylist': return 'details';
            case 'details': return '';
            default: return 'details';
        }
    };

    const next = () => {
        console.log('Segment:', segment);

        switch (segment) {
            case 'details': return 'buddylist';
            case 'buddylist': return 'links';
            case 'links': return schedulable ? 'schedule' : "summary";
            case 'schedule': return 'summary';
            case 'summary': return 'thank-you';
            case 'thank-you': return 'thank-you';
            default: return 'buddylist';
        }
    };

    // Define the steps array here as before
    // ...

    return (
        <div className="mt-auto flex justify-between items-center lg:static fixed lg:bottom-auto bottom-0 lg:inset-auto inset-x-0 lg:z-0 z-10 lg:bg-transparent bg-white lg:drop-shadow-none drop-shadow-2xl lg:p-0 p-4">
            {segment !== 'details' && (
                <button
                    type="button"
                    onClick={() => router.push(`./${previous()}`)}
                    className="bg-marine-blue transition duration-300 hover:opacity-80 text-magnolia mr-4 px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
                >
                    Previous Step
                </button>
            )}

            {segment !== 'summary' && (
                <button
                    type="button"
                    onClick={() => router.push(`./${next()}`)}
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
