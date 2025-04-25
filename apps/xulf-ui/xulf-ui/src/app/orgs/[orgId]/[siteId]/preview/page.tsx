import { notFound } from 'next/navigation';
import { prisma } from '@xulf/db';
import ClientModuleRenderer from '../../../../components/renderers/ClientModuleRenderer';
import type { SiteJSON } from '@xulf/types';
import { ModuleInstanceToResolvedModuleInstance } from '@xulf/utils';  // Function to resolve ModuleInstance
import { ResolvedModuleInstanceToLayoutModule } from '@xulf/utils'; // Function to convert to LayoutModule

interface PreviewPageProps {
  params: { orgId: string; siteId: string };
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  // Fetch site data from the database
  const site = await prisma.site.findUnique({
    where: { id: params.siteId },
    select: { layoutJson: true, name: true },
  });

  // Ensure we have the layoutJson and site data
  const layoutJson = site?.layoutJson as SiteJSON | undefined;

  if (!site || !layoutJson?.layout.modules) {
    notFound();
  }

  // Resolve each ModuleInstance to ResolvedModuleInstance first
  const resolvedModules = Object.values(layoutJson.layout.modules).map(mod =>
    ModuleInstanceToResolvedModuleInstance(mod, layoutJson.layout.modules)
  );

  // Convert the resolved modules into LayoutModule for rendering
  const layoutModules = resolvedModules.map(mod => ResolvedModuleInstanceToLayoutModule(mod));

  return (
    <>
      <header className="mb-6 border-b pb-2">
        <h1 className="text-2xl font-bold">{site.name}</h1>
      </header>
      <main className="mx-auto max-w-screen-lg p-8 space-y-6">
        {/* Pass the layoutModules (converted from ResolvedModuleInstance to LayoutModule) */}
        <ClientModuleRenderer modules={layoutModules} />
      </main>
    </>
  );
}
