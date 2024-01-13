import { useFormContext } from 'react-hook-form';
// Types
import { CampaignFormValues } from '@/types/campaign-form-values';

export default function useCampaignContext() {
    // const [fileData, setFileData] = useState(null);
    return useFormContext<CampaignFormValues>();
}
