import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@xulf/db'; // Or wherever your Prisma client is
import { authConfig } from '../auth/config';


export async function GET() {
  // Fetch all orgs (consider pagination in the future)
  const orgs = await prisma.organization.findMany();
  return NextResponse.json(orgs);
}

export async function POST(request: Request) {
  // Parse the request JSON body
  const body = await request.json();
  const { name } = body;

  // Validate input
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  // Retrieve the user session
  const session = await getServerSession(authConfig);
  if (!session) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  // Create the organization using Prisma
  try {
    const newOrg = await prisma.organization.create({ data: { name } });
    return NextResponse.json(newOrg, { status: 201 });
  } catch (error) {
    console.error('Error creating organization:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}