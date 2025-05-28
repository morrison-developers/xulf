import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { morDevPrisma } from "@xulf/mor-dev-db";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await morDevPrisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const customerId = user.stripeCustomerId ?? (
    await stripe.customers.create({ email })
  ).id;

  if (!user.stripeCustomerId) {
    await morDevPrisma.user.update({
      where: { email },
      data: { stripeCustomerId: customerId },
    });
  }

  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
  });

  return NextResponse.json({ clientSecret: setupIntent.client_secret });
}