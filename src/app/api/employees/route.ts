import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        annualLeaveBalance: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      cin,
      ppr,
      grade,
      ladder,
      division,
      service,
      decisionNumber,
      decisionDate,
      address,
    } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !cin || !ppr) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEmployee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        cin,
        ppr,
        grade,
        ladder,
        division,
        service,
        decisionNumber,
        decisionDate: decisionDate ? new Date(decisionDate) : null,
        address,
        annualLeaveBalance: {
          create: {
            year: new Date().getFullYear(),
            currentYearBalance: 22,
            specialPermissions: 10,
            previousYearBalance: 0,
          },
        },
      },
      include: {
        annualLeaveBalance: true,
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// TypeScript type for the request methods
export type EmployeeAPI = {
  GET: typeof GET;
  POST: typeof POST;
};
