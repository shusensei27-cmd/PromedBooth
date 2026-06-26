import "next-auth";

declare module "next-auth" {
  interface User {
    role?: "GUEST" | "VIEWER" | "ADMIN";
    organizationId?: string;
    organizationSlug?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: "GUEST" | "VIEWER" | "ADMIN";
      organizationId: string;
      organizationSlug: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "GUEST" | "VIEWER" | "ADMIN";
    organizationId: string;
    organizationSlug: string;
  }
}
