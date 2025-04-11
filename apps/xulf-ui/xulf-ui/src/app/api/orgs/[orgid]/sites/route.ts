import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@xulf/db';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../../auth/config';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);

  const orgId = context.params.id;

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const membership = await prisma.userOrganization.findUnique({
    where: {
      userId_organizationId: {
        userId: session.user.id,
        organizationId: orgId,
      },
    },
  });

  if (!membership) {
    return NextResponse.json({ error: 'Forbidden: Not a member' }, { status: 403 });
  }

  const sites = await prisma.site.findMany({
    where: { organizationId: orgId },
  });

  return NextResponse.json(sites);
}

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);
  const orgId = context.params.id;
  console.log('params:', context.params);


  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  const body = await request.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ error: 'Site name is required' }, { status: 400 });
  }

  const membership = await prisma.userOrganization.findUnique({
    where: {
      userId_organizationId: {
        userId: session.user.id,
        organizationId: orgId,
      },
    },
  });

  if (!membership || !['admin', 'editor'].includes(membership.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const newSite = await prisma.site.create({
    data: {
      name,
      organizationId: orgId,
    },
  });

  return NextResponse.json(newSite, { status: 201 });
}
