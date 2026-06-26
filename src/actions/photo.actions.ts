"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireAdmin } from "@/lib/rbac";
import type { ActionResponse } from "@/types";

export async function getPhotos(params?: {
  eventId?: string;
  search?: string;
  page?: number;
  limit?: number;
  isPublic?: boolean;
}) {
  const session = await requireAuth();
  const { eventId, search, page = 1, limit = 20, isPublic } = params || {};

  const where: Record<string, unknown> = {
    event: { organizationId: session.user.organizationId },
  };

  if (eventId) where.eventId = eventId;
  if (search) where.event = { name: { contains: search, mode: "insensitive" } };
  if (isPublic !== undefined) where.isPublic = isPublic;

  const [photos, total] = await Promise.all([
    prisma.photo.findMany({
      where,
      include: {
        event: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.photo.count({ where }),
  ]);

  return {
    data: photos,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getPublicPhotos(eventSlug?: string, params?: { page?: number; limit?: number }) {
  const where: Record<string, unknown> = {
    isPublic: true,
  };

  if (eventSlug) {
    where.event = { slug: eventSlug, status: "ACTIVE" };
  }

  const { page = 1, limit = 20 } = params || {};

  const [photos, total] = await Promise.all([
    prisma.photo.findMany({
      where,
      include: {
        event: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.photo.count({ where }),
  ]);

  return { data: photos, total, page, totalPages: Math.ceil(total / limit) };
}

export async function deletePhoto(id: string): Promise<ActionResponse> {
  try {
    const session = await requireAdmin();
    const photo = await prisma.photo.findFirst({
      where: { id, event: { organizationId: session.user.organizationId } },
    });
    if (!photo) throw new Error("Photo not found");

    await prisma.photo.delete({ where: { id } });
    revalidatePath("/gallery");
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete photo";
    return { success: false, error: message };
  }
}

export async function togglePhotoVisibility(id: string): Promise<ActionResponse> {
  try {
    const session = await requireAdmin();
    const photo = await prisma.photo.findFirst({
      where: { id, event: { organizationId: session.user.organizationId } },
    });
    if (!photo) throw new Error("Photo not found");

    await prisma.photo.update({
      where: { id },
      data: { isPublic: !photo.isPublic },
    });

    revalidatePath("/gallery");
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update photo visibility";
    return { success: false, error: message };
  }
}
