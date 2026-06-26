import { auth } from "./auth";

export type Role = "GUEST" | "VIEWER" | "ADMIN";

const ROLE_HIERARCHY: Record<Role, number> = {
  GUEST: 0,
  VIEWER: 1,
  ADMIN: 2,
};

export function hasMinimumRole(userRole: Role | undefined, minimumRole: Role): boolean {
  if (!userRole) return false;
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minimumRole];
}

export function canWrite(userRole: Role | undefined): boolean {
  return userRole === "ADMIN";
}

export function canRead(userRole: Role | undefined): boolean {
  return userRole === "VIEWER" || userRole === "ADMIN";
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireRole(minimumRole: Role) {
  const session = await requireAuth();
  if (!hasMinimumRole(session.user.role as Role, minimumRole)) {
    throw new Error("Forbidden: insufficient permissions");
  }
  return session;
}

export async function requireAdmin() {
  return requireRole("ADMIN");
}
