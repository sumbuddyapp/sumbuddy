import { Suspense } from "react";
import Companies from "@/components/companies";
import PlaceholderCard from "@/components/placeholder-card";
import CreateCompanyButton from "@/components/create-company-button";
import CreateCompanyModal from "@/components/modal/create-company";

export default function AllCompanies({ params }: { params: { id: string } }) {
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            All Companies
          </h1>
          <CreateCompanyButton>
            <CreateCompanyModal />
          </CreateCompanyButton>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          {/* @ts-expect-error Server Component */}
          <Companies companyId={decodeURIComponent(params.id)} />
        </Suspense>
      </div>
    </div>
  );
}
