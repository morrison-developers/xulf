import { prisma } from '@xulf/db';
import EntityList from '../../components/layouts/EntityList';

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

  const list = sites.map((site) => ({
    id: site.id,
    name: site.name,
    href: `/orgs/${params.orgId}/${site.id}`,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sites for Organization {params.orgId}</h1>
      <EntityList items={list} emptyMessage="No sites found. Get started by creating one!" />
    </div>
  );
}
