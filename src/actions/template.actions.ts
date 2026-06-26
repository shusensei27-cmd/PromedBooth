"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireAuth } from "@/lib/rbac";
import { createTemplateSchema, saveCanvasSchema } from "@/schemas/template.schema";
import { slugify } from "@/lib/utils";
import type { ActionResponse } from "@/types";
import type { z } from "zod";
import type { Prisma } from "@prisma/client";

export async function getTemplates(params?: { search?: string; page?: number; limit?: number }) {
  const session = await requireAuth();
  const { search, page = 1, limit = 20 } = params || {};

  const where: Record<string, unknown> = {
    organizationId: session.user.organizationId,
  };

  if (search) where.name = { contains: search, mode: "insensitive" };

  const [templates, total] = await Promise.all([
    prisma.template.findMany({
      where,
      include: { _count: { select: { layers: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.template.count({ where }),
  ]);

  return {
    data: templates,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getTemplate(id: string) {
  const session = await requireAuth();
  const template = await prisma.template.findFirst({
    where: { id, organizationId: session.user.organizationId },
    include: {
      layers: { orderBy: { zIndex: "asc" } },
    },
  });
  if (!template) throw new Error("Template not found");
  return template;
}

export async function createTemplate(
  input: z.infer<typeof createTemplateSchema>
): Promise<ActionResponse> {
  try {
    const session = await requireAdmin();
    const validated = createTemplateSchema.parse(input);

    const template = await prisma.template.create({
      data: {
        ...validated,
        slug: slugify(validated.name),
        organizationId: session.user.organizationId,
      },
    });

    revalidatePath("/templates");
    return { success: true, data: template };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create template";
    return { success: false, error: message };
  }
}

export async function saveCanvas(
  templateId: string,
  input: z.infer<typeof saveCanvasSchema>
): Promise<ActionResponse> {
  try {
    const session = await requireAdmin();
    const validated = saveCanvasSchema.parse(input);

    const template = await prisma.template.findFirst({
      where: { id: templateId, organizationId: session.user.organizationId },
    });
    if (!template) throw new Error("Template not found");

    await prisma.templateLayer.deleteMany({ where: { templateId } });

    if (validated.layers.length > 0) {
      await prisma.templateLayer.createMany({
        data: validated.layers.map((layer) => ({
          templateId,
          type: layer.type,
          fabricJson: layer.fabricJson as Prisma.InputJsonValue,
          zIndex: layer.zIndex,
          locked: layer.locked,
          visible: layer.visible,
        })),
      });
    }

    if (validated.thumbnail) {
      await prisma.template.update({
        where: { id: templateId },
        data: { thumbnail: validated.thumbnail },
      });
    }

    revalidatePath(`/templates/${templateId}/edit`);
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save canvas";
    return { success: false, error: message };
  }
}

export async function deleteTemplate(id: string): Promise<ActionResponse> {
  try {
    const session = await requireAdmin();
    const template = await prisma.template.findFirst({
      where: { id, organizationId: session.user.organizationId },
    });
    if (!template) throw new Error("Template not found");

    await prisma.template.delete({ where: { id } });
    revalidatePath("/templates");
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete template";
    return { success: false, error: message };
  }
}

export async function duplicateTemplate(id: string): Promise<ActionResponse> {
  try {
    const session = await requireAdmin();
    const original = await prisma.template.findFirst({
      where: { id, organizationId: session.user.organizationId },
      include: { layers: true },
    });
    if (!original) throw new Error("Template not found");

    const template = await prisma.template.create({
      data: {
        name: `${original.name} (Copy)`,
        slug: slugify(`${original.name} copy`),
        canvasWidth: original.canvasWidth,
        canvasHeight: original.canvasHeight,
        organizationId: session.user.organizationId,
        isPublic: false,
      },
    });

    if (original.layers.length > 0) {
      await prisma.templateLayer.createMany({
        data: original.layers.map((l) => ({
          templateId: template.id,
          type: l.type,
          fabricJson: l.fabricJson as Prisma.InputJsonValue,
          zIndex: l.zIndex,
          locked: l.locked,
          visible: l.visible,
        })),
      });
    }

    revalidatePath("/templates");
    return { success: true, data: template };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to duplicate template";
    return { success: false, error: message };
  }
}
