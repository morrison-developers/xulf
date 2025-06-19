import { PrismaClient, Prisma } from './lib/generated/morrison-prisma-client';

export const morDevPrisma = new PrismaClient();
export type { Prisma }; // 👈 this line exposes all Prisma types under the `Prisma` namespace
