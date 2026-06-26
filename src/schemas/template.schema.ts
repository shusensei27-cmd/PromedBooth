import { z } from "zod";

export const layerTypeEnum = z.enum([
  "PHOTO_SLOT",
  "TEXT",
  "STICKER",
  "LOGO",
  "QR_CODE",
]);

export const createTemplateSchema = z.object({
  name: z.string().min(1, "Template name is required").max(200),
  canvasWidth: z.number().min(100).max(4096).default(1080),
  canvasHeight: z.number().min(100).max(4096).default(1920),
  isPublic: z.boolean().default(false),
  thumbnail: z.string().optional(),
});

export const updateTemplateSchema = createTemplateSchema.partial();

export const saveLayerSchema = z.object({
  templateId: z.string().uuid(),
  type: layerTypeEnum,
    fabricJson: z.record(z.string(), z.unknown()),
  zIndex: z.number().int().min(0),
  locked: z.boolean().default(false),
  visible: z.boolean().default(true),
});

export const saveCanvasSchema = z.object({
  layers: z.array(z.object({
    id: z.string().uuid(),
    type: layerTypeEnum,
  fabricJson: z.record(z.string(), z.unknown()),
    zIndex: z.number().int().min(0),
    locked: z.boolean().default(false),
    visible: z.boolean().default(true),
  })),
  thumbnail: z.string().optional(),
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateInput = z.infer<typeof updateTemplateSchema>;
export type SaveLayerInput = z.infer<typeof saveLayerSchema>;
