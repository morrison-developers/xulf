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
      const allowedEmails = ['andrew@xulf.dev', 'friend@example.com'];
      return allowedEmails.includes(user.email!); // only allow whitelisted emails
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  },
  secret: process.env.AUTH_SECRET,
};
