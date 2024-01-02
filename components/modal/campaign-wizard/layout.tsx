import clsx from 'clsx';
// Components
import Provider from '@/components/modal/campaign-wizard/context/multi-step-form-provider';
import Sidebar from '@/components/modal/campaign-wizard/context/sidebar';
// Styles
import '@/styles/globals.css';

export const metadata = {
    title: 'Multi-step Campaign Creation Form | SumBuddy',
    description: 'Front Line Employee Referral Platform',
};
export default function CampaignWizardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
})
{
    return (
        <main className="font-normal relative w-full max-w-lg lg:max-w-[940px]">
            <div className="lg:bg-white w-full flex flex-col lg:flex-row px-4 lg:p-4 rounded-2xl lg:shadow-lg">
                <Sidebar/>
                <Provider>{children}</Provider>
            </div>
            <footer
                className={clsx(
                    'absolute -bottom-16 lg:-bottom-12',
                    'py-4 px-4',
                    'text-xs lg:text-sm text-cool-gray',
                    'flex flex-col gap-x-1 lg:flex-row justify-center w-full items-center'
                )}
            >
            <span>
            Challenge by{' '}
                <a
                    href="https://www.frontendmentor.io?ref=challenge"
                    target="_blank"
                    className="text-marine-blue"
                >
            Frontend Mentor
            </a>
            .
            </span>
            <span>
            Coded by{' '}
                                <a
                                    href="https://github.com/waldosmuts"
                                    target="_blank"
                                    className="text-marine-blue"
                                >
            Waldo
            </a>
            .
            </span>
            </footer>
        </main>
    );
}