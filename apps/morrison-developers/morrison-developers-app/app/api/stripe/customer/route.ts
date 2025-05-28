// /app/api/stripe/customer/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { morDevPrisma } from '@xulf/mor-dev-db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: Request) {
  const { userId } = await req.json();
  const user = await morDevPrisma.user.findUnique({ where: { id: userId } });
  if (!user) return new NextResponse('User not found', { status: 404 });

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: { userId: user.id },
  });

  await morDevPrisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return NextResponse.json({ customerId: customer.id });
}