import { prisma } from '@xulf/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditorShell from '../../../../components/editor/EditorShell';
import type { SiteJson } from '../../../../types/layout';

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

  // Use stored siteJson from the DB or fallback to empty layout
  const parsedSiteJson: SiteJson =
  site.layoutJson && typeof site.layoutJson === 'object' && 'modules' in site.layoutJson
    ? (site.layoutJson as unknown as SiteJson)
    : { modules: [] };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Editor – {site.name}</h1>
        <Link
          href={`/orgs/${params.orgId}/${params.siteId}`}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Site Dashboard
        </Link>
      </div>

      <EditorShell siteId={site.id} siteJson={parsedSiteJson} />
    </div>
  );
}
