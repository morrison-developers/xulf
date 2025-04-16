import { prisma } from '@xulf/db';
import { getServerSession } from 'next-auth';
import { authConfig } from '../api/auth/config';
import EntityList from '../components/layouts/EntityList';
import { OrganizationSummary } from '@xulf/types';

export default async function OrgsPage() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) {
    return null;
  }

  const memberships = await prisma.userOrganization.findMany({
    where: { userId: session.user.id },
    include: { organization: true },
  });

  const orgs: OrganizationSummary[] = memberships.map(
    ({ organization }: { organization: { id: string; name: string } }) => ({
      id: organization.id,
      name: organization.name,
      href: `/orgs/${organization.id}`,
    })
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Organizations</h1>
      <EntityList items={orgs} emptyMessage="You're not part of any organizations yet." />
    </div>
  );
}
