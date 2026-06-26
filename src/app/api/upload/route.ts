import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUploadSignature } from "@/lib/cloudinary";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = getUploadSignature(timestamp);

  return NextResponse.json({
    ...signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder: `orgs/${session.user.organizationId}`,
  });
}
