// /app/api/stripe/subscription/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { morDevPrisma } from '@xulf/mor-dev-db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: Request) {
  const {
    userId,
    label,
    amountCents,
    startDate,
    paymentMethodId,
  } = await req.json();

  if (!userId || !label || !amountCents || !startDate || !paymentMethodId) {
    return new NextResponse('Missing required fields', { status: 400 });
  }

  const user = await morDevPrisma.user.findUnique({ where: { id: userId } });
  if (!user?.stripeCustomerId) {
    return new NextResponse('Stripe customer not found', { status: 400 });
  }

  // Attach the payment method
  await stripe.paymentMethods.attach(paymentMethodId, {
    customer: user.stripeCustomerId,
  });

  await stripe.customers.update(user.stripeCustomerId, {
    invoice_settings: { default_payment_method: paymentMethodId },
  });

  // Create a Stripe Price
  const price = await stripe.prices.create({
    unit_amount: amountCents,
    currency: 'usd',
    recurring: { interval: 'month' },
    product_data: { name: label },
  });

  // Calculate UNIX timestamp for trial_end
  const trialEnd = Math.floor(new Date(startDate).getTime() / 1000);

  const sub = await stripe.subscriptions.create({
    customer: user.stripeCustomerId,
    items: [{ price: price.id }],
    payment_behavior: 'default_incomplete',
    trial_end: trialEnd,
    metadata: { userId, label },
  });

  // Determine next due date (one month after startDate)
  const dueDate = new Date(startDate);
  dueDate.setMonth(dueDate.getMonth() + 1);

  // Save to your database
  await morDevPrisma.subscription.create({
    data: {
      userId,
      stripeSubId: sub.id,
      label,
      priceCents: amountCents,
      interval: 'monthly',
      startDate: new Date(startDate),
      dueDate,
      status: sub.status,
    },
  });

  return NextResponse.json({ subscriptionId: sub.id });
}
