import 'dotenv/config';
import { prisma } from '../src/index';

async function clean() {
  await prisma.$executeRawUnsafe(`DELETE FROM "UserOrganization"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "Site"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "Organization"`);
}

async function main() {
  await clean();
  const demoUserId = 'cm9agz4dy0000fcmr74o6wq77'; // Replace with your actual user ID

  // Create 5 orgs
  for (let i = 1; i <= 5; i++) {
    const org = await prisma.organization.create({
      data: {
        name: `Demo Org ${i}`,
        userOrganizations: {
          create: {
            userId: demoUserId,
            role: 'admin',
          },
        },
      },
    });    

    // Create 3 sites per org
    await prisma.site.createMany({
      data: Array.from({ length: 3 }).map((_, j) => ({
        name: `Site ${j + 1} for Org ${i}`,
        organizationId: org.id,
      })),
    });

    console.log(`Seeded Org ${i} with 3 sites.`);
  }

  console.log('✅ Demo data seeded.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
