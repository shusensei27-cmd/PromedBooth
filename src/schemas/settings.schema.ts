import { z } from "zod";

export const updateOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name is required").max(200),
  description: z.string().max(2000).optional(),
  logo: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
});

export const inviteUserSchema = z.object({
  email: z.string().email("Valid email is required"),
  role: z.enum(["VIEWER", "ADMIN"]).default("VIEWER"),
});

export const updatePaymentConfigSchema = z.object({
  paymentGateway: z.enum(["MIDTRANS", "TRIPAY", "XENDIT", "NONE"]),
  gatewayApiKey: z.string().optional(),
  gatewaySecret: z.string().optional(),
  qrisImage: z.string().url().optional().or(z.literal("")),
});

export const updateBrandingSchema = z.object({
  logo: z.string().url().optional().or(z.literal("")),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
});

export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>;
export type InviteUserInput = z.infer<typeof inviteUserSchema>;
