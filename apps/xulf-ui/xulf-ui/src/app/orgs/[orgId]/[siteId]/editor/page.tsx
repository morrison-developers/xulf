// NO 'use client' here
import { prisma } from '@xulf/db';
import { notFound } from 'next/navigation';
import { validateSiteJsonOrDefault } from '@xulf/types';
import { SiteJSON } from '@xulf/module-props';
import EditorPageClient from '../../../../components/editor/containers/EditorPageClient';

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
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!site) return notFound();

  const parsedSiteJSON = validateSiteJsonOrDefault(site);

  return (
    <EditorPageClient
      site={site}
      siteJson={parsedSiteJSON as SiteJSON}
      orgId={params.orgId}
    />
  );
}
