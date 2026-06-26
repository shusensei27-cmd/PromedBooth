import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PromedboothAdapter } from "./auth-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PromedboothAdapter(),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      return !!user.email;
    },
    async jwt({ token, account, profile, user }) {
      const id = (user?.id as string) || (account?.providerAccountId as string) || "";
      if (account && profile) {
        const email = (profile.email as string) || (user?.email as string) || "";
        const isAdmin = email === (process.env.ADMIN_EMAIL || "shusensei27@gmail.com");
        token.id = id;
        token.role = isAdmin ? "ADMIN" : "VIEWER";
        token.organizationId = "";
        token.organizationSlug = "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || "";
        session.user.role = (token.role as "GUEST" | "VIEWER" | "ADMIN") || "VIEWER";
        session.user.organizationId = (token.organizationId as string) || "";
        session.user.organizationSlug = (token.organizationSlug as string) || "";
      }
      return session;
    },
  },
});
