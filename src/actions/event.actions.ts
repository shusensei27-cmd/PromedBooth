"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireAdmin, canWrite } from "@/lib/rbac";
import { createEventSchema, updateEventSchema } from "@/schemas/event.schema";
import { slugify } from "@/lib/utils";
import type { ActionResponse } from "@/types";
import type { z } from "zod";
import type { Prisma } from "@prisma/client";

export async function getEvents(params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const session = await requireAuth();
  const { search, status, page = 1, limit = 20 } = params || {};

  const where: Record<string, unknown> = {
    organizationId: session.user.organizationId,
  };

  if (status) where.status = status;
  if (search) where.name = { contains: search, mode: "insensitive" };

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      include: {
        template: { select: { id: true, name: true, thumbnail: true } },
        _count: { select: { photos: true, transactions: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.event.count({ where }),
  ]);

  return {
    data: events,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    hasMore: page * limit < total,
  };
}

export async function getEvent(id: string) {
  const session = await requireAuth();
  const event = await prisma.event.findFirst({
    where: { id, organizationId: session.user.organizationId },
    include: {
      template: true,
      _count: { select: { photos: true, transactions: true } },
    },
  });

  if (!event) throw new Error("Event not found");
  return event;
}

export async function getPublicEvent(slug: string) {
  const event = await prisma.event.findFirst({
    where: { slug, status: "ACTIVE" },
    include: {
      template: { select: { id: true, name: true, thumbnail: true } },
      _count: { select: { photos: true } },
    },
  });
  return event;
}

export async function createEvent(
  input: z.infer<typeof createEventSchema>
): Promise<ActionResponse> {
  try {
    const session = await requireAdmin();
    const validated = createEventSchema.parse(input);

    const event = await prisma.event.create({
      data: {
        ...validated,
        slug: slugify(validated.name),
        organizationId: session.user.organizationId,
        welcomeScreen: validated.welcomeScreen as Prisma.InputJsonValue | undefined,
        filters: validated.filters as Prisma.InputJsonValue | undefined,
      },
    });

    revalidatePath("/events");
    return { success: true, data: event };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create event";
    return { success: false, error: message };
  }
}

export async function updateEvent(
  id: string,
  input: z.infer<typeof updateEventSchema>
): Promise<ActionResponse> {
  try {
    const session = await requireAdmin();
    const validated = updateEventSchema.parse(input);

    const existing = await prisma.event.findFirst({
      where: { id, organizationId: session.user.organizationId },
    });
    if (!existing) throw new Error("Event not found");

    const data: Record<string, unknown> = { ...validated };
    if (validated.welcomeScreen) data.welcomeScreen = validated.welcomeScreen as Prisma.InputJsonValue;
    if (validated.filters) data.filters = validated.filters as Prisma.InputJsonValue;
    if (validated.name && validated.name !== existing.name) {
      data.slug = slugify(validated.name);
    }

    const event = await prisma.event.update({
      where: { id },
      data,
    });

    revalidatePath("/events");
    revalidatePath(`/events/${id}`);
    return { success: true, data: event };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update event";
    return { success: false, error: message };
  }
}

export async function duplicateEvent(id: string): Promise<ActionResponse> {
  try {
    const session = await requireAdmin();
    const original = await prisma.event.findFirst({
      where: { id, organizationId: session.user.organizationId },
    });
    if (!original) throw new Error("Event not found");

    const event = await prisma.event.create({
      data: {
        name: `${original.name} (Copy)`,
        slug: slugify(`${original.name} copy`),
        description: original.description,
        organizationId: session.user.organizationId,
        theme: original.theme,
        templateId: original.templateId,
        status: "DRAFT",
      },
    });

    revalidatePath("/events");
    return { success: true, data: event };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to duplicate event";
    return { success: false, error: message };
  }
}

export async function archiveEvent(id: string): Promise<ActionResponse> {
  try {
    const session = await requireAdmin();
    const event = await prisma.event.findFirst({
      where: { id, organizationId: session.user.organizationId },
    });
    if (!event) throw new Error("Event not found");

    await prisma.event.update({
      where: { id },
      data: { status: "ARCHIVED" },
    });

    revalidatePath("/events");
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to archive event";
    return { success: false, error: message };
  }
}

export async function deleteEvent(id: string): Promise<ActionResponse> {
  try {
    const session = await requireAdmin();
    const event = await prisma.event.findFirst({
      where: { id, organizationId: session.user.organizationId },
    });
    if (!event) throw new Error("Event not found");

    await prisma.event.delete({ where: { id } });
    revalidatePath("/events");
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete event";
    return { success: false, error: message };
  }
}
