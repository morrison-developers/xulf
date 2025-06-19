import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get('customerId');
  if (!customerId) return new NextResponse('Missing customerId', { status: 400 });

  const [customer, subscriptions, invoices, paymentMethods] = await Promise.all([
    stripe.customers.retrieve(customerId),
    stripe.subscriptions.list({ customer: customerId }),
    stripe.invoices.list({ customer: customerId, limit: 10 }),
    stripe.paymentMethods.list({ customer: customerId, type: 'card' }),
  ]);

  return NextResponse.json({ customer, subscriptions: subscriptions.data, invoices: invoices.data, paymentMethods: paymentMethods.data });
}