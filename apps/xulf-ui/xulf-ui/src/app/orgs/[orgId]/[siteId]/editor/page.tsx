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
      functionGraph: true,  // Add functionGraph to the selection
    },
  });

  if (!site) return notFound();

  // Safely parse the layoutJson to fit the SiteJson shape
  let parsedSiteJson: SiteJson = { modules: [], functionGraph: { nodes: [], edges: [] } };

  if (site.layoutJson && typeof site.layoutJson === 'object' && !Array.isArray(site.layoutJson)) {
    // If layoutJson is an object, try to cast it to SiteJson
    parsedSiteJson = {
      modules: (site.layoutJson as any).modules ?? [], // Fallback to an empty array if modules is missing
      functionGraph: (site.layoutJson as any).functionGraph ?? { nodes: [], edges: [] }, // Fallback if functionGraph is missing
    };
  }

  return (
    <EditorPageClient
      site={site}
      siteJson={parsedSiteJson} // Pass the parsed SiteJson
      orgId={params.orgId}
    />
  );
}
