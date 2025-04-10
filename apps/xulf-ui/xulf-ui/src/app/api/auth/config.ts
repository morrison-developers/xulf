import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import { type AuthOptions } from 'next-auth';
import { prisma } from '@xulf/db';

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASS,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      const invite = await prisma.invite.findUnique({
        where: { email: user.email! },
      });

      if (!invite || invite.used) {
        console.warn(`Blocked login for ${user.email}`);
        return false;
      }

      return true;
    },

    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Customize the redirect after sign-in
      // Always redirect to '/orgs' after successful sign-in
      if (url.startsWith(baseUrl)) {
        return '/orgs';  // Ensure it redirects to '/orgs' instead of '/app/orgs'
      }
      return url;
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.email) return;

      await prisma.invite.updateMany({
        where: {
          email: user.email,
          used: false,
        },
        data: {
          used: true,
        },
      });
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
