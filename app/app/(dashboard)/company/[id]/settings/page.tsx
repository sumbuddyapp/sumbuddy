import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateCompany } from "@/lib/actions";
import DeleteCompanyForm from "@/components/form/delete-company-form";

export default async function CompanySettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.company.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Name"
        description="The name of your company. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.name!,
          placeholder: "My Awesome Company",
          maxLength: 32,
        }}
        handleSubmit={updateCompany}
      />

      <Form
        title="Description"
        description="The description of your company. This will be used as the meta description on Google as well."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder: "A blog about really interesting things.",
        }}
        handleSubmit={updateCompany}
      />

      <DeleteCompanyForm companyName={data?.name!} />
    </div>
  );
}
