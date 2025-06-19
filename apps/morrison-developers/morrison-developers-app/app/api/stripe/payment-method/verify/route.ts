import { NextResponse } from 'next/server';
import { morDevPrisma } from '@xulf/mor-dev-db';

export async function POST(req: Request) {
  const { userId, stripePmId, bankName, last4 } = await req.json();

  if (!userId || !stripePmId) {
    return new NextResponse('Missing required fields', { status: 400 });
  }

  try {
    await morDevPrisma.paymentMethod.upsert({
      where: { stripePmId },
      update: {
        bankName,
        last4,
        verified: true,
      },
      create: {
        userId,
        stripePmId,
        bankName,
        last4,
        verified: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[payment-method/verify] Error saving payment method', err);
    return new NextResponse('Internal error', { status: 500 });
  }
}
