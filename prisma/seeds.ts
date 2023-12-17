const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

async function main() {
  // Add your seeding logic here
  // Example: await prisma.user.create({ data: { name: 'John Doe', email: 'john.doe@example.com' } });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });