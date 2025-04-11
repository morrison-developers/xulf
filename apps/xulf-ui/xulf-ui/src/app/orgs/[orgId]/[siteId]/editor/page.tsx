import { prisma } from '@xulf/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditorShell from '../../../../components/editor/EditorShell'; // adjust if needed

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
    // include: { modules: true } ← if you later link to actual layout content
  });

  if (!site) return notFound();

  // Simulate layout JSON until stored in DB
  const mockSiteJson = {
    modules: [
      {
        id: '1',
        type: 'box',
        props: { customStyles: 'bg-yellow-100 p-4', children: 'I am a Box!' },
      },
    ],
  };  

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

      <EditorShell siteJson={mockSiteJson} />
    </div>
  );
}
