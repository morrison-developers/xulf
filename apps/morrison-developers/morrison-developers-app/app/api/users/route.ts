import { NextResponse } from 'next/server';
import { morDevPrisma } from '@xulf/mor-dev-db';

export async function GET() {
  const users = await morDevPrisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      path: true,
      image: true,
      createdAt: true,
      stripeCustomerId: true,
      subscriptions: {
        select: {
          id: true,
          stripeSubId: true,
          priceCents: true,
          interval: true,
          status: true,
          createdAt: true,
        },
      },
      paymentMethods: {
        select: {
          id: true,
          stripePmId: true,
          bankName: true,
          last4: true,
          verified: true,
          createdAt: true,
        },
      },
    },
  });

  return NextResponse.json({ users });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, path } = body;

    if (!name || !email || !path) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const user = await morDevPrisma.user.create({
      data: {
        name,
        email,
        path,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
