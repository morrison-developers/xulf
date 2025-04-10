import { NextResponse } from 'next/server';
import { prisma } from '@xulf/db';

interface Params {
  params: { id: string };
}

export async function GET({ params }: Params) {
  const sites = await prisma.site.findMany({
    where: { organizationId: params.id },
  });
  return NextResponse.json(sites);
}
