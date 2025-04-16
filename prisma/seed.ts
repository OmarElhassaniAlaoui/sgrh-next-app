import { PrismaClient, Prisma, LeaveType } from "../src/app/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  // Seed Users
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  });

  await prisma.user.upsert({
    where: { username: "hr1" },
    update: {},
    create: {
      username: "hr1",
      password: userPassword,
    },
  });

  // Seed Employees
  const employees = [
    {
      cin: "AB123456",
      ppr: "PPR001",
      firstName: "Ahmed",
      lastName: "El Idrissi",
      grade: "Technicien",
      ladder: "Grade 6",
      service: "IT Support",
      division: "Information Technology",
      decisionNumber: "D001",
      decisionDate: new Date("2020-01-15"),
      address: "123 Rue Example, Tiznit",
    },
    {
      cin: "CD789012",
      ppr: "PPR002",
      firstName: "Fatima",
      lastName: "Benali",
      grade: "Ingénieur",
      ladder: "Grade 8",
      service: "Development",
      division: "Information Technology",
      decisionNumber: "D002",
      decisionDate: new Date("2019-05-20"),
      address: "456 Avenue Hassan II, Agadir",
    },
    {
      cin: "EF345678",
      ppr: "PPR003",
      firstName: "Karim",
      lastName: "Amrani",
      grade: "Chef de Service",
      ladder: "Grade 10",
      service: "Ressources Humaines",
      division: "Administration",
      decisionNumber: "D003",
      decisionDate: new Date("2018-11-10"),
      address: "789 Boulevard Mohammed V, Marrakech",
    },
    {
      cin: "GH901234",
      ppr: "PPR004",
      firstName: "Amina",
      lastName: "Lahcen",
      grade: "Secrétaire",
      ladder: "Grade 5",
      service: "Accueil",
      division: "Administration",
      decisionNumber: "D004",
      decisionDate: new Date("2021-03-05"),
      address: "101 Rue Ibn Batouta, Tanger",
    },
    {
      cin: "IJ567890",
      ppr: "PPR005",
      firstName: "Youssef",
      lastName: "Cherkaoui",
      grade: "Comptable",
      ladder: "Grade 7",
      service: "Finances",
      division: "Comptabilité",
      decisionNumber: "D005",
      decisionDate: new Date("2017-09-12"),
      address: "202 Avenue des FAR, Rabat",
    },
  ];

  for (const employee of employees) {
    await prisma.employee.upsert({
      where: { cin: employee.cin },
      update: {},
      create: {
        ...employee,
        annualLeaveBalance: {
          create: {
            year: new Date().getFullYear(),
            currentYearBalance: 22,
            specialPermissions: 10,
            previousYearBalance: 5, // Assuming some carried over from last year
          },
        },
      },
    });
  }

  // Seed some leave requests
  const leaveTypes: Array<keyof typeof LeaveType> = [
    "ANNUAL",
    "SPECIAL_PERMISSION",
    "SICK",
    "MATERNITY",
  ];

  // Get all employees
  const allEmployees = await prisma.employee.findMany();

  for (let i = 0; i < 10; i++) {
    const randomEmployee =
      allEmployees[Math.floor(Math.random() * allEmployees.length)];
    const randomReplacement = allEmployees.find(
      (e) => e.id !== randomEmployee.id
    );
    const randomType =
      leaveTypes[Math.floor(Math.random() * leaveTypes.length)];

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 1);

    await prisma.leaveRequest.create({
      data: {
        employeeId: randomEmployee.id,
        leaveType: randomType,
        startDate,
        endDate,
        duration: calculateWorkingDays(startDate, endDate),
        status: i < 5 ? "APPROVED" : "PENDING",
        replacementId: randomReplacement?.id,
        reason: ["Vacation", "Family event", "Medical", "Personal"][
          Math.floor(Math.random() * 4)
        ],
      },
    });
  }

  console.log("Database seeded with multiple records!");
}

function calculateWorkingDays(startDate: Date, endDate: Date): number {
  let count = 0;
  const current = new Date(startDate);

  while (current <= endDate) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) count++; // Skip weekends
    current.setDate(current.getDate() + 1);
  }

  return count;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
