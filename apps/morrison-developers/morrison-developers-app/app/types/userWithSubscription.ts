import type { Prisma } from '@xulf/mor-dev-db';

export type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscriptions: true;
    paymentMethods: true;
  };
}> & {
  stripeCustomerId: string | null; // match the actual DB shape
};