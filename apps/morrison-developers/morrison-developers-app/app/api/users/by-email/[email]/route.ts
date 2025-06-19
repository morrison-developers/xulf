import { NextResponse } from 'next/server';
import { morDevPrisma } from '@xulf/mor-dev-db';

export async function GET(_: Request, { params }: { params: { email: string } }) {
  try {
    const decodedEmail = decodeURIComponent(params.email);
    const normalizedEmail = decodedEmail.replace(/\.(?=[^@]*@)/g, '');

    console.log('[by-email] searching with:', {
      param: params.email,
      decoded: decodedEmail,
      normalized: normalizedEmail,
    });

    if (!decodedEmail) {
      return new NextResponse('Missing email', { status: 400 });
    }

    const user = await morDevPrisma.user.findFirst({
      where: {
        AND: [
          {
            email: {
              contains: '@',
            },
          },
          {
            email: {
              startsWith: normalizedEmail.split('@')[0].replaceAll('.', ''),
            },
          },
          {
            email: {
              endsWith: '@' + normalizedEmail.split('@')[1],
            },
          },
        ],
      },
      include: {
        subscriptions: true,
        paymentMethods: true,
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error('[by-email] Failed to fetch user:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}