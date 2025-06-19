// /app/api/stripe/payment-method/initiate/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: Request) {
  const { stripeCustomerId } = await req.json();

  const intent = await stripe.setupIntents.create({
    customer: stripeCustomerId,
    payment_method_types: ['us_bank_account'],
  });

  return NextResponse.json({ clientSecret: intent.client_secret });
}
