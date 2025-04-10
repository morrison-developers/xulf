import { NextResponse } from 'next/server';
import { prisma } from '@xulf/db'; // Or wherever your Prisma client is

export async function GET() {
  // Fetch all orgs (consider pagination in the future)
  const orgs = await prisma.organization.findMany();
  return NextResponse.json(orgs);
}
