'use client';
import useCampaignContext from '@/lib/hooks/use-campaign-context';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CampaignWizardStep({ step, segment }: StepProps) {
    return (
        <Link href={`/${step.segment}`}>
            <div className="flex items-center gap-4">
                <button
                    className={clsx(
                        'w-[33px] h-[33px] rounded-full border',
                        'transition-colors duration-300',
                        step.segment === segment
                            ? 'bg-light-blue text-marine-blue border-transparent'
                            : 'bg-transparent text-white border-white',
                        'font-bold text-sm'
                    )}
                >
                    {step.number}
                </button>
                <div className="hidden lg:flex flex-col uppercase">
                    <h3 className={clsx('font-normal text-[13px] text-cool-gray')}>
                        Step {step.number}
                    </h3>
                    <h2
                        className={clsx(
                            'font-bold text-white text-[14px] tracking-[0.1em]'
                        )}
                    >
                        {step.heading}
                    </h2>
                </div>
            </div>
            {/* </button> */}
        </Link>
    );
}

interface StepProps {
    step: {
        number: number;
        segment: 'details' | 'buddylist' | 'links' | 'schedule' | 'summary';
        heading: string;
    };
    segment: 'details' | 'buddylist' | 'links' | 'schedule' | 'summary';
}
