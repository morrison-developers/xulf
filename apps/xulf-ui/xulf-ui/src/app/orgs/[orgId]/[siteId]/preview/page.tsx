import { notFound } from 'next/navigation';
import { prisma } from '@xulf/db';
import { componentRegistry } from '@xulf/editor-ui';
import type { SiteJson } from '../../../../types/layout';

interface Props {
  params: { orgId: string; siteId: string };
}

export default async function PreviewPage({ params }: Props) {
  const { siteId } = params;

  const site = await prisma.site.findUnique({
    where: { id: siteId },
    select: { layoutJson: true },
  });

  const layoutJson = site?.layoutJson as unknown as SiteJson;

  if (!site || !layoutJson?.modules) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-screen-lg p-8 space-y-6">
      {layoutJson.modules.map((mod) => {
        const Component = componentRegistry[mod.type];
        if (!Component) return null;

        return (
          <Component
            key={mod.id}
            {...mod.props}
            className={mod.props?.customStyles}
          />
        );
      })}
    </main>
  );
}
