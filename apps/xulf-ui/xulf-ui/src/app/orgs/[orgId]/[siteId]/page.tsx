import { prisma } from '@xulf/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    orgId: string;
    siteId: string;
  };
}

export default async function SiteDashboard({ params }: Props) {
  const site = await prisma.site.findFirst({
    where: {
      id: params.siteId,
      organizationId: params.orgId,
    },
    include: {
      organization: true,
      // modules: true (if you have a relation)
    },
  });

  if (!site) return notFound();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{site.name}</h1>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(site.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="space-x-2">
          <Link href={`/orgs/${params.orgId}/${params.siteId}/editor`}>
            <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
              Edit Site
            </button>
          </Link>
          <Link href={`/orgs/${params.orgId}/${params.siteId}/preview`}>
            <button className="px-4 py-2 rounded border border-gray-300">
              Preview
            </button>
          </Link>
        </div>
      </div>

      {/* Site Stats Placeholder */}
      <section className="border p-4 rounded bg-white">
        <h2 className="font-semibold mb-2">Stats</h2>
        <p className="text-gray-500 text-sm">Coming soon: module count, visits, collaborators...</p>
      </section>

      {/* Back Link */}
      <div>
        <Link href={`/orgs/${params.orgId}`}>
          <button className="text-blue-600 text-sm hover:underline">← Back to Organization</button>
        </Link>
      </div>
    </div>
  );
}
