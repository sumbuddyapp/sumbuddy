import {PrismaClient, Campaign} from '@prisma/client';
import Uploader from "@/components/uploader";
import DeleteCampaignForm from "@/components/form/delete-campaign-form";
import {deleteCampaign} from "@/lib/actions";


const prisma = new PrismaClient();
export default function EditCampaignForm({campaign}: { campaign: Campaign }) {
    const editCampaignFormAction = async (formData: FormData) => {
        'use server'
        const startDate = formData.get('startDate') as string;
        const startDateWithTime = `${startDate}T00:00:00.000Z`; // Append a default time to the date

        const campaignId = formData.get('campaignId') as string;
        const campaign = await prisma.campaign.update({
            where: {id: campaignId}, data: {
                name: formData.get('name') as string,
                startDate: startDateWithTime,
                campaignLinks: [formData.get('link1') as string,
                                formData.get('link2') as string,
                                formData.get('link3') as string],
                bonusAmount: parseInt(formData.get('bonusAmount') as string),
            }
        });
        return campaign;
    }
    const inputClass = "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
    return (
        <form className="flex flex-col space-y-4" action={editCampaignFormAction}>
        <input type="hidden" id="campaignId" name="campaignId" value={campaign.id}/>
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Campaign Name</label>
            <input type="text" id="name" name="name" required
                   className={inputClass}
                   defaultValue={campaign.name}/>
        </div>
        <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="date" id="startDate" name="startDate" required
                   className={inputClass}
                   defaultValue={new Date(campaign.startDate).toISOString().split('T')[0]}/>
        </div>
        <div>
            <label htmlFor="link1" className="block text-sm font-medium text-gray-700">Link 1</label>
            <input type="url" id="link1" name="link1"
                   className={inputClass}
                   defaultValue={campaign?.campaignLinks[0]}/>
        </div>
        <div>
            <label htmlFor="link2" className="block text-sm font-medium text-gray-700">Link 2</label>
            <input type="url" id="link2" name="link2"
                   className={inputClass}
                   defaultValue={campaign?.campaignLinks[1]}/>
        </div>
        <div>
            <label htmlFor="link3" className="block text-sm font-medium text-gray-700">Link 3</label>
            <input type="url" id="link3" name="link3"
                   className={inputClass}
                   defaultValue={campaign?.campaignLinks[2]}/>
        </div>
        <div>
            <label htmlFor="bonusAmount" className="block text-sm font-medium text-gray-700">Bonus Amount</label>
            <input type="number" id="bonusAmount" name="bonusAmount" required step="10"
                   className={inputClass}
                   defaultValue={campaign.bonusAmount}/>
        </div>
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Save</button>
            <DeleteCampaignForm/>
    </form>

    )
}
