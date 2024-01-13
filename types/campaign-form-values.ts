export interface CampaignFormValues {
    name: string;
    schedulable: boolean;
    bonusAmount: number;
    buddyListURL: string

    campaignLinks: {
        link_one: string;
        link_two: string;
        link_three: string;
    };

    // startDate: Date;
    schedule: string;
    // active: boolean;
    // companyId: string;
}
