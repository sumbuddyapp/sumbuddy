export interface CampaignFormValues {
    name: string;
    schedulable: boolean;

    startDate: Date;
    campaignLinks: {
        link_one: string;
        link_two: string;
        link_three: string;
    };
    bonusAmount: number;
    active: boolean,
    companyId: string,
    buddyListId: string,
}
