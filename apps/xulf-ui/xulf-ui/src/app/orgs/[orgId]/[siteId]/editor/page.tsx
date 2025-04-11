// NO 'use client' here
import { prisma } from '@xulf/db';
import { notFound } from 'next/navigation';
import type { SiteJson } from '../../../../types/layout';
import EditorPageClient from '../../../../components/editor/EditorPageClient';

interface Props {
  params: {
    orgId: string;
    siteId: string;
  };
}

export default async function EditorPage({ params }: Props) {
  const site = await prisma.site.findFirst({
    where: {
      id: params.siteId,
      organizationId: params.orgId,
    },
    select: {
      id: true,
      name: true,
      layoutJson: true,
    },
  });

  if (!site) return notFound();

  const parsedSiteJson: SiteJson =
    site.layoutJson && typeof site.layoutJson === 'object' && 'modules' in site.layoutJson
      ? (site.layoutJson as unknown as SiteJson)
      : { modules: [] };

  return <EditorPageClient site={site} siteJson={parsedSiteJson} orgId={params.orgId} />;
}
