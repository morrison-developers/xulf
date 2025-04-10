import { prisma } from '@xulf/db';
import Link from 'next/link';

interface Props {
  params: {
    orgId: string;
  };
}

export default async function OrgDetailPage({ params }: Props) {
  const sites = await prisma.site.findMany({
    where: { organizationId: params.orgId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sites for Organization {params.orgId}</h1>

      {sites.length === 0 ? (
        <div className="text-gray-500">No sites found. Get started by creating one!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sites.map((site) => (
            <Link key={site.id} href={`/orgs/${params.orgId}/${site.id}`}>
              <div className="p-4 border rounded hover:shadow transition">
                <h2 className="text-lg font-semibold">{site.name}</h2>
                <p className="text-sm text-gray-500">{site.id}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
