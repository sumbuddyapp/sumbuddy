import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request)  {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new Response(
      "Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.",
      {
        status: 401,
      },
    );
  }
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get('filename');
  console.log(filename)
  const file = req.body || "";
  const contentType = req.headers.get("content-type") || "text/csv";
  const blobFilename = `${nanoid()}.${contentType.split("/")[1]}`;
  const blob = await put(blobFilename, file, {
    contentType,
    access: "public",
  });

  return NextResponse.json(blob);
}
