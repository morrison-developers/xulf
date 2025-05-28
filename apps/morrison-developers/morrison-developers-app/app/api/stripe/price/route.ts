// /app/api/stripe/price/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: Request) {
  const { amountCents, interval, productId } = await req.json();

  const price = await stripe.prices.create({
    unit_amount: amountCents,
    currency: 'usd',
    recurring: { interval },
    product: productId,
  });

  return NextResponse.json({ priceId: price.id });
}