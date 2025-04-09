import { PrismaAdapter } from '@auth/prisma-adapter';
import NodemailerProvider from '@auth/core/providers/nodemailer';
import { type AuthConfig } from '@auth/core/types';
import { prisma } from '@xulf/db';

export const authConfig: AuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    NodemailerProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      // ✅ This is the correct place for invite-only logic
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

      // ✅ Mark invite as used after login
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
