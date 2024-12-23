import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.test.create({
    data: {
      name: 'hello',
      email: 'hello@one.com',
      description: 'lorem Ipsum',
    },
  });
  await prisma.test.create({
    data: {
      name: 'bi',
      email: 'bi@one.com',
      description: 'Testing one two',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
