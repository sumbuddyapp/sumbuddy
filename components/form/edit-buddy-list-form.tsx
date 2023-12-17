import {PrismaClient, BuddyList} from '@prisma/client';
import Uploader from "@/components/uploader";
import DeleteBuddyListForm from "@/components/form/delete-buddy-list-form";
import {deleteBuddyList} from "@/lib/actions";


const prisma = new PrismaClient();
export default function EditBuddyListForm({buddyList}: { buddyList: BuddyList }) {
    const editBuddyListFormAction = async (formData: FormData) => {
        'use server'
        const startDate = formData.get('startDate') as string;
        const startDateWithTime = `${startDate}T00:00:00.000Z`; // Append a default time to the date

        const buddyListId = formData.get('buddyListId') as string;
        const buddyList = await prisma.buddyList.update({
            where: {id: buddyListId}, data: {
                filename: formData.get('filename') as string
            }
        });
        return buddyList;
    }
    const inputClass = "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
    return (
        <form className="flex flex-col space-y-4" action={editBuddyListFormAction}>
        <Uploader/>
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Save</button>
            <DeleteBuddyListForm/>
    </form>

    )
}
