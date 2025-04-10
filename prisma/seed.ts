import { PrismaClient, Prisma } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Seed User
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: "admin", // Plaintext for now
    },
  });

  // Seed Employee
  await prisma.employee.upsert({
    where: { cin: "AB123456" },
    update: {},
    create: {
      name: "Ahmed",
      cin: "AB123456",
      ppr: "PPR001",
      surname: "El Idrissi",
      grade: "Technicien",
      division: "IT",
      service: "Support",
      decisionNumber: "D001",
      decisionDate: new Date("2020-01-15"),
      address: "123 Rue Example, Tiznit",
    },
  });

  console.log("Database seeded!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
