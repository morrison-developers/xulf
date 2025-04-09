import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import { type AuthOptions } from 'next-auth';
import { prisma } from '@xulf/db';

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
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
  secret: process.env.AUTH_SECRET,
};

