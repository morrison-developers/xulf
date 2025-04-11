import { notFound } from 'next/navigation';
import { prisma } from '@xulf/db';
import ClientModuleRenderer from '../../../../components/renderers/ClientModuleRenderer';
import type { SiteJson } from '../../../../types/layout';
interface PreviewPageProps {
  params: { orgId: string; siteId: string };
}

export default async function PreviewPage({ params }: PreviewPageProps) {

  const site = await prisma.site.findUnique({
    where: { id: params.siteId },
    select: { layoutJson: true },
  });  

  const layoutJson = site?.layoutJson as unknown as SiteJson;

  if (!site || !layoutJson?.modules) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-screen-lg p-8 space-y-6">
      <ClientModuleRenderer modules={layoutJson.modules} />
    </main>
  );
}
