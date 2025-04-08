import { PrismaClient } from '@prisma/client';

declare global {
  // Avoid re-instantiating in dev or hot reload
  // eslint-disable-next-line no-var
  var _prisma: PrismaClient | undefined;
}

export const prisma =
  global._prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env['NODE_ENV'] !== 'production') {
  global._prisma = prisma;
}
