import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      // Add anything else you want, e.g. name, role
    };
  }

  interface User {
    id: string;
  }
}
