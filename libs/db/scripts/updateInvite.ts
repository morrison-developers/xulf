import { prisma } from '../src/index';

async function main() {
  const email = 'morrison.andrew422@gmail.com';

  await prisma.invite.upsert({
    where: { email }, // Check for the invite with the same email
    update: { used: false }, // If the invite exists, mark it as used
    create: { email, used: false }, // If the invite doesn't exist, create a new one and mark it as used
  });

  console.log(`Invite created or updated for ${email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
