// /app/api/stripe/payment-method/verify/route.ts
import { NextResponse } from 'next/server';
import { morDevPrisma } from '@xulf/mor-dev-db';

export async function POST(req: Request) {
  const { userId, stripePmId, bankName, last4 } = await req.json();

  const user = await morDevPrisma.user.findUnique({ where: { id: userId } });
  if (!user) return new NextResponse('User not found', { status: 404 });

  await morDevPrisma.paymentMethod.create({
    data: {
      userId,
      stripePmId,
      bankName,
      last4,
      verified: true,
    },
  });

  return NextResponse.json({ success: true });
}