import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export function getCloudinaryUrl(publicId: string, options?: Record<string, string | number>): string {
  const base = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
  const transformations = options
    ? Object.entries(options)
        .map(([k, v]) => `${k}_${v}`)
        .join(",") + "/"
    : "";
  return `${base}/${transformations}${publicId}`;
}

export function getOptimizedUrl(publicId: string, width?: number, height?: number): string {
  const opts: Record<string, string | number> = {
    f_auto: "auto",
    q_auto: "best",
  };
  if (width) opts.w = width;
  if (height) opts.h = height;
  if (width && height) opts.c_fill = "fill";
  return getCloudinaryUrl(publicId, opts);
}

export function getUploadSignature(timestamp: number): { signature: string; timestamp: number } {
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "promedbooth" },
    process.env.CLOUDINARY_API_SECRET!
  );
  return { signature, timestamp };
}
