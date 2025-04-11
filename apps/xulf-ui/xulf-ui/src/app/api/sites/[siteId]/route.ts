import { prisma } from '@xulf/db';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { siteId: string } }) {
  const body = await req.json();

  const updated = await prisma.site.update({
    where: { id: params.siteId },
    data: { layoutJson: body },
  });

  return Response.json({ success: true, layoutJson: updated.layoutJson });
}

export async function GET(_req: NextRequest, { params }: { params: { siteId: string } }) {
  const site = await prisma.site.findUnique({
    where: { id: params.siteId },
  });

  return Response.json({ layoutJson: site?.layoutJson || { modules: [] } });
}
