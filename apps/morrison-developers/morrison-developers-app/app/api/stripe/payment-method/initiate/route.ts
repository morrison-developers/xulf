// /app/api/stripe/payment-method/initiate/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: Request) {
  // This assumes use of Stripe's hosted bank account setup (Financial Connections)
  const { stripeCustomerId } = await req.json();

  const stripeSession = await stripe.financialConnections.sessions.create({
    account_holder: { type: 'customer', customer: stripeCustomerId },
    permissions: ['payment_method'],
  });

  return NextResponse.json({ sessionSecret: stripeSession.client_secret });
}