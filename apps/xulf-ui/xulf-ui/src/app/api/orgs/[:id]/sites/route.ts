import { NextResponse } from 'next/server';
import { prisma } from '@xulf/db';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../../auth/config';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  // Retrieve the current session.
  const session = await getServerSession(authConfig);
  
  // Check for authentication.
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  // Verify user's membership in the organization.
  const membership = await prisma.userOrganization.findUnique({
    where: {
      userId_organizationId: {
        userId: session.user.id,
        organizationId: params.id,
      },
    },
  });

  if (!membership) {
    return NextResponse.json({ error: 'Forbidden: You are not a member of this organization' }, { status: 403 });
  }

  // Fetch organization's sites.
  const sites = await prisma.site.findMany({
    where: { organizationId: params.id },
  });

  return NextResponse.json(sites);
}
