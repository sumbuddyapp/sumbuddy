import { useFormContext } from 'react-hook-form';
// Types
import { CampaignFormValues } from '@/types/campaign-form-values';

export default function useCampaignContext() {
    return useFormContext<CampaignFormValues>();
}
