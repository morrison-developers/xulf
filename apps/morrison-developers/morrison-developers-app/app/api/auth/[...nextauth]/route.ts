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
    async session({ session }) {
      if (session.user?.email) {
        const user = await morDevPrisma.user.findUnique({
          where: { email: session.user.email.toLowerCase() },
        });
        if (user) {
          session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            path: user.path,
          };
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };