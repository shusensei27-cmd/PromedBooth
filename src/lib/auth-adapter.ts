import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import type { Adapter, AdapterUser } from "next-auth/adapters";

export function PromedboothAdapter(): Adapter {
  const base = PrismaAdapter(prisma);
  const adminEmail = process.env.ADMIN_EMAIL || "shusensei27@gmail.com";

  return {
    ...base,
    async createUser(data) {
      const isAdmin = data.email === adminEmail;
      const orgSlug = (data.name || "org")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .slice(0, 40) + "-" + Date.now().toString(36);

      const org = await prisma.organization.create({
        data: {
          name: `${data.name?.split(" ")[0] || "User"}'s Organization`,
          slug: orgSlug,
        },
      });

      const user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          avatar: data.image,
          role: isAdmin ? "ADMIN" : "VIEWER",
          organizationId: org.id,
        },
      });

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.avatar,
        emailVerified: null,
      } as AdapterUser;
    },
  };
}
