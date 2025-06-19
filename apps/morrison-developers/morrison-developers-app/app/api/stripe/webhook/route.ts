import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { morDevPrisma } from '@xulf/mor-dev-db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, secret);
  } catch (err) {
    return new NextResponse(`Webhook error: ${(err as Error).message}`, { status: 400 });
  }

  switch (event.type) {
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      const parent = invoice.parent as { type: string; subscription_details?: { subscription: string } };

      if (parent?.type === 'subscription_details' && parent.subscription_details?.subscription) {
        const subId = parent.subscription_details.subscription;
        await morDevPrisma.subscription.update({
          where: { stripeSubId: subId },
          data: { status: 'active' },
        });
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const parent = invoice.parent as { type: string; subscription_details?: { subscription: string } };

      if (parent?.type === 'subscription_details' && parent.subscription_details?.subscription) {
        const subId = parent.subscription_details.subscription;
        await morDevPrisma.subscription.update({
          where: { stripeSubId: subId },
          data: { status: 'past_due' },
        });
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await morDevPrisma.subscription.update({
        where: { stripeSubId: subscription.id },
        data: { status: 'canceled' },
      });
      break;
    }
    case 'setup_intent.succeeded': {
      const setupIntent = event.data.object as Stripe.SetupIntent;
      const customerId = setupIntent.customer as string;
      const paymentMethodId = setupIntent.payment_method as string;

      if (!customerId || !paymentMethodId) break;

      const pm = await stripe.paymentMethods.retrieve(paymentMethodId) as Stripe.PaymentMethod;

      if (pm.us_bank_account) {
        await morDevPrisma.paymentMethod.upsert({
          where: { stripePmId: pm.id },
          update: {
            verified: true,
            bankName: pm.us_bank_account.bank_name ?? null,
            last4: pm.us_bank_account.last4 ?? null,
          },
          create: {
            user: { connect: { stripeCustomerId: customerId } },
            stripePmId: pm.id,
            verified: true,
            bankName: pm.us_bank_account.bank_name ?? null,
            last4: pm.us_bank_account.last4 ?? null,
          },
        });
      }

      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse('Received', { status: 200 });
}
