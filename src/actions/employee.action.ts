"use server";

import prisma from "@/lib/prisma";
// Import types directly from the generated location
import { Prisma } from "@/app/generated/prisma";

// Helper function to parse sort string (e.g., "firstName:asc") into Prisma OrderBy object
const parseSortString = (
  sort: string
): Prisma.EmployeeOrderByWithRelationInput => {
  const [field, direction] = sort.split(":");
  if (field && (direction === "asc" || direction === "desc")) {
    // Basic validation, more robust validation might be needed for allowed fields
    return { [field]: direction };
  }
  return { createdAt: "desc" }; // Default sort
};

// Action to get unique values for filter dropdowns
export const getUniqueEmployeeFilters = async () => {
  try {
    const [divisions, services, grades, ladders] = await Promise.all([
      prisma.employee.findMany({
        select: { division: true },
        distinct: ["division"],
      }),
      prisma.employee.findMany({
        select: { service: true },
        distinct: ["service"],
      }),
      prisma.employee.findMany({
        select: { grade: true },
        distinct: ["grade"],
      }),
      prisma.employee.findMany({
        select: { ladder: true },
        distinct: ["ladder"],
      }),
    ]);

    return {
      divisions: divisions.map((d) => d.division).filter(Boolean) as string[],
      services: services.map((s) => s.service).filter(Boolean) as string[],
      grades: grades.map((g) => g.grade).filter(Boolean) as string[],
      ladders: ladders.map((l) => l.ladder).filter(Boolean) as string[],
    };
  } catch (error) {
    console.error("Error fetching unique employee filters:", error);
    // Return empty arrays or throw a custom error
    return { divisions: [], services: [], grades: [], ladders: [] };
  }
};

// Action to get employees with filtering, searching, sorting, and pagination
interface GetFilteredEmployeesParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  division?: string;
  service?: string;
  grade?: string;
  ladder?: string;
}

export const getFilteredEmployees = async ({
  page = 1,
  limit = 10,
  sort = "createdAt:desc",
  search = "",
  division = "",
  service = "",
  grade = "",
  ladder = "",
}: GetFilteredEmployeesParams) => {
  try {
    const skip = (page - 1) * limit;
    const orderBy = parseSortString(sort);

    // Build the where clause dynamically
    const whereConditions: Prisma.EmployeeWhereInput[] = []; // Initialize as an array

    // Add search condition
    if (search) {
      whereConditions.push({
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { cin: { contains: search, mode: "insensitive" } },
          { ppr: { contains: search, mode: "insensitive" } },
          // Add other searchable fields if needed
        ],
      });
    }

    // Add filter conditions
    if (division) whereConditions.push({ division: { equals: division } });
    if (service) whereConditions.push({ service: { equals: service } });
    if (grade) whereConditions.push({ grade: { equals: grade } });
    if (ladder) whereConditions.push({ ladder: { equals: ladder } });

    // Combine conditions with AND
    const whereClause: Prisma.EmployeeWhereInput =
      whereConditions.length > 0 ? { AND: whereConditions } : {};

    // Fetch employees and total count concurrently
    const [employees, totalCount] = await Promise.all([
      prisma.employee.findMany({
        where: whereClause, // Use the combined where clause
        orderBy: orderBy,
        skip: skip,
        take: limit,
      }),
      prisma.employee.count({
        where: whereClause,
      }),
    ]);

    return {
      employees,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching filtered employees:", error);
    // Return empty result or throw a custom error
    return { employees: [], totalCount: 0 };
  }
};

// --- Other potential actions (add, update, delete) can be added here ---
// Example: Get Employee By ID (Server Action)
export const getEmployeeById = async (id: string) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });
    return employee;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    return null;
  }
};

// Example: Create Employee (Server Action) - Adapt data structure as needed
// Use Prisma.EmployeeCreateInput directly if available after fixing imports
// If not, define a specific input type based on your schema fields
type CreateEmployeeInput = Omit<
  Prisma.EmployeeCreateInput,
  | "createdAt"
  | "updatedAt"
  | "annualLeaveBalance"
  | "leaveRequests"
  | "replacementFor"
>;

export const createEmployee = async (data: CreateEmployeeInput) => {
  try {
    // Use a transaction to create Employee and AnnualLeaveBalance together
    const newEmployeeWithBalance = await prisma.$transaction(async (tx) => {
      const newEmployee = await tx.employee.create({
        data: {
          ...data, // Spread the provided employee data
        },
      });

      // Create the initial leave balance record for the new employee
      await tx.annualLeaveBalance.create({
        data: {
          employeeId: newEmployee.id,
          year: new Date().getFullYear(), // Set the current year
          currentYearBalance: 22, // Default annual leave
          specialPermissions: 10, // Default special permissions
          previousYearBalance: 0, // Default previous year balance
        },
      });

      return newEmployee; // Return the created employee
    });

    return newEmployeeWithBalance;
  } catch (error) {
    console.error("Error creating employee with leave balance:", error);
    // Consider returning a specific error object or null
    return null;
  }
};

// Example: Update Employee (Server Action)
// Use Prisma.EmployeeUpdateInput directly if available after fixing imports
export const updateEmployee = async (
  id: string,
  data: Prisma.EmployeeUpdateInput
) => {
  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data,
    });
    return updatedEmployee;
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error);
    // Handle specific Prisma errors like P2025 (Record not found) if needed
    return null;
  }
};

// Example: Delete Employee (Server Action)
export const deleteEmployeeAction = async (id: string) => {
  try {
    await prisma.employee.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    // Handle specific Prisma errors like P2025 (Record not found) if needed
    return { success: false, error: "Failed to delete employee" };
  }
};
