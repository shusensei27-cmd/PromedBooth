import { z } from "zod";

export const eventThemeEnum = z.enum([
  "MINIMALIST",
  "VINTAGE",
  "NEWSPAPER",
  "FUNKY",
  "FLORAL",
  "RETRO",
]);

export const paymentMethodEnum = z.enum([
  "FREE",
  "CASH",
  "QRIS",
  "HYBRID",
]);

export const paymentGatewayEnum = z.enum([
  "MIDTRANS",
  "TRIPAY",
  "XENDIT",
  "NONE",
]);

export const eventStatusEnum = z.enum([
  "DRAFT",
  "ACTIVE",
  "ARCHIVED",
]);

export const createEventSchema = z.object({
  name: z.string().min(1, "Event name is required").max(200),
  description: z.string().max(2000).optional(),
  theme: eventThemeEnum.default("MINIMALIST"),
  allowGuestThemeChange: z.boolean().default(false),
  cameraDevice: z.string().optional(),
  orientation: z.enum(["PORTRAIT", "LANDSCAPE"]).default("PORTRAIT"),
  zoom: z.number().min(0).max(5).default(1),
  mirror: z.boolean().default(true),
  filters: z.array(z.string()).optional(),
  brandingLogo: z.string().url().optional().or(z.literal("")),
  brandingName: z.string().max(100).optional(),
  eventNameVisible: z.boolean().default(true),
  welcomeScreen: z.record(z.string(), z.unknown()).optional(),
  startButtonText: z.string().max(50).default("Mulai"),
  backgroundMedia: z.string().url().optional().or(z.literal("")),
  overlayPng: z.string().url().optional().or(z.literal("")),
  fullscreen: z.boolean().default(true),
  paymentMethod: paymentMethodEnum.default("FREE"),
  price: z.number().min(0).default(0),
  qrisImage: z.string().url().optional().or(z.literal("")),
  templateId: z.string().uuid().optional(),
  status: eventStatusEnum.default("DRAFT"),
});

export const updateEventSchema = createEventSchema.partial();

export const eventFilterSchema = z.object({
  search: z.string().optional(),
  status: eventStatusEnum.optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type EventFilterInput = z.infer<typeof eventFilterSchema>;
