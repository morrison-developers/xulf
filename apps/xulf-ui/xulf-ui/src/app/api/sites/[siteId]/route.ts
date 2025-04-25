import { prisma } from '@xulf/db';
import { NextRequest } from 'next/server';
import { siteJsonSchema } from '@xulf/types';

export async function POST(req: NextRequest, { params }: { params: { siteId: string } }) {
  const body = await req.json();
  const result = siteJsonSchema.safeParse(body);

  if (!result.success) {
    console.error('Invalid layoutJson:', result.error);
    return new Response(JSON.stringify({ error: 'Invalid layoutJson' }), { status: 400 });
  }

  const updated = await prisma.site.update({
    where: { id: params.siteId },
    data: {
      layoutJson: result.data,
    },
  });

  return Response.json({ success: true, layoutJson: updated.layoutJson });
}

export async function GET(_req: NextRequest, { params }: { params: { siteId: string } }) {
  const site = await prisma.site.findUnique({
    where: { id: params.siteId },
  });

  // Fallback only if site.layoutJson is missing
  const defaultLayout = {
    id: params.siteId,
    name: 'Untitled Site',
    layout: {
      rootModuleIds: [],
      modules: {},
    },
    functions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return Response.json({ layoutJson: site?.layoutJson ?? defaultLayout });
}
