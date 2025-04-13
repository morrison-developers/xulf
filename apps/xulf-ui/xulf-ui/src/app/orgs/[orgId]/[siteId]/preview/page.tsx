import { notFound } from 'next/navigation';
import { prisma } from '@xulf/db';
import ClientModuleRenderer from '../../../../components/renderers/ClientModuleRenderer';
import type { SiteJSON } from '@xulf/types';
interface PreviewPageProps {
  params: { orgId: string; siteId: string };
}

export default async function PreviewPage({ params }: PreviewPageProps) {

  const site = await prisma.site.findUnique({
    where: { id: params.siteId },
    select: { layoutJson: true, name: true },
  });  

  const layoutJson = site?.layoutJson as unknown as SiteJSON;

  if (!site || !layoutJson?.layout.modules) {
    notFound();
  }

  return (
    <>
      <header className="mb-6 border-b pb-2">
        <h1 className="text-2xl font-bold">{site.name}</h1>
      </header>
      <main className="mx-auto max-w-screen-lg p-8 space-y-6">
        <ClientModuleRenderer modules={Object.values(layoutJson.layout.modules)} />
      </main>
    </>
  );
}
