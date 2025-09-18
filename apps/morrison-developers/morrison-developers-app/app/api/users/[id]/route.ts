// /app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import { morDevPrisma } from '@xulf/mor-dev-db';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const user = await morDevPrisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      email: true,
      path: true,
      image: true,
      createdAt: true,
      stripeCustomerId: true,
      subscriptions: {
        select: {
          id: true,
          stripeSubId: true,
          priceCents: true,
          interval: true,
          status: true,
          createdAt: true,
        },
      },
      paymentMethods: {
        select: {
          id: true,
          stripePmId: true,
          bankName: true,
          last4: true,
          verified: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  return NextResponse.json({ user });
}