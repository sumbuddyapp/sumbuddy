'use client';

import clsx from 'clsx';
import { toast } from "sonner";
import {useParams, useRouter} from 'next/navigation';
import Details from "./details/page";
import Summary from "./summary/page";
import useCampaignContext from "@/lib/hooks/use-campaign-context";

export default function CampaignWizardPage() {
  const router = useRouter();
  const {
    register, trigger,
    formState
  } = useCampaignContext();
  const {
    isValid,
    errors
  } = formState;

  switch (step) {
    case '1':
      return <Details/>;
    case '2':
      return <Subpage2/>;
    case '3':
      return <Subpage3/>;
    case '4':
      return <Subpage4/>;
    case '5':
      return <Subpage5/>;
    default:
      return null;
  }
}

