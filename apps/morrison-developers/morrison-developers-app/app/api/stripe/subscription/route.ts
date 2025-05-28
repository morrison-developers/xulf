// /app/api/stripe/subscription/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { morDevPrisma } from '@xulf/mor-dev-db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: Request) {
  const { userId, priceId, paymentMethodId } = await req.json();

  const user = await morDevPrisma.user.findUnique({ where: { id: userId } });
  if (!user?.stripeCustomerId) return new NextResponse('Stripe customer not found', { status: 400 });

  await stripe.paymentMethods.attach(paymentMethodId, {
    customer: user.stripeCustomerId,
  });

  await stripe.customers.update(user.stripeCustomerId, {
    invoice_settings: { default_payment_method: paymentMethodId },
  });

  const sub = await stripe.subscriptions.create({
    customer: user.stripeCustomerId,
    items: [{ price: priceId }],
    metadata: { userId },
  });

  await morDevPrisma.subscription.create({
    data: {
      userId,
      stripeSubId: sub.id,
      priceCents: sub.items.data[0].price.unit_amount!,
      interval: sub.items.data[0].price.recurring!.interval,
      status: sub.status,
    },
  });

  return NextResponse.json({ subscriptionId: sub.id });
}