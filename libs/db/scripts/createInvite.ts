import { prisma } from '../src/index';

async function main() {
  await prisma.invite.create({
    data: {
      email: 'morrison.andrew422@gmail.com',
      used: false,  // Ensure the invite is marked as used
    },
  });
  console.log('Invite created and marked as used');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
