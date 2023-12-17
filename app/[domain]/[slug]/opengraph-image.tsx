/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from 'next/og';
import {sql} from "@vercel/postgres";

export const runtime = "edge";

export default async function CampaignOG({
                                         params,
                                     }: {
    params: { domain: string; slug: string };
}) {
    const domain = decodeURIComponent(params.domain);
    const slug = decodeURIComponent(params.slug);

    const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
        ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
        : null;

    const response = await sql`
        SELECT *
        FROM "Campaign" as campaign
        JOIN "Company" as company ON company.id = campaign."companyId"
        WHERE (
                company.subdomain = ${subdomain}
                OR company."customDomain" = ${domain}
        )
        LIMIT 1;
    `;
    const data = response.rows[0];

    if (!data) {
        return new Response("Not found", {status: 404});
    }

    const clashData = await fetch(
        new URL("@/styles/CalSans-SemiBold.otf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div tw="flex flex-col items-center w-full h-full bg-white">
                <div tw="flex flex-col items-center justify-center mt-8">
                    <h1 tw="text-6xl font-bold text-gray-900 leading-none tracking-tight">
                        {data.name}
                    </h1>
                    <p tw="mt-4 text-xl text-gray-600 max-w-xl text-center">
                        {data.startDate}
                    </p>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 600,
            fonts: [
                {
                    name: "Clash",
                    data: clashData,
                },
            ],
            emoji: "blobmoji",
        },
    );
}
