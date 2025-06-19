import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { morDevPrisma } from "@xulf/mor-dev-db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login", // optional custom sign-in page
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user?.email) {
        const dbUser = await morDevPrisma.user.findUnique({
          where: { email: session.user.email.toLowerCase() },
        });
        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.name = dbUser.name;
          session.user.email = dbUser.email;
          session.user.image = dbUser.image;
          session.user.path = dbUser.path;
          session.user.role = dbUser.role;
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };