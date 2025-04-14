import { Employee } from "@prisma/client"; 

interface EmployeeActions {
  getAllEmployees: () => Promise<Employee[]>;
  getEmployeeById: (id: string) => Promise<Employee | null>;
  searchEmployees: (query: string) => Promise<Employee[]>;
  filterEmployees: (filters: {
    grade?: string;
    division?: string;
    service?: string;
  }) => Promise<Employee[]>;
  createEmployee: (data: {
    cin: string;
    ppr: string;
    firstName: string;
    lastName: string;
    grade: string;
    division: string;
    service: string;
    address: string;
    decisionNumber: string;
    decisionDate: Date;
  }) => Promise<Employee>;
  updateEmployee: (
    id: string,
    data: Partial<{
      cin: string;
      ppr: string;
      firstName: string;
      lastName: string;
      grade: string;
      division: string;
      service: string;
      address: string;
      decisionNumber: string;
      decisionDate: Date;
    }>
  ) => Promise<Employee | null>;
}



export const fetchEmployees = async () => {
  try {
    const response = await fetch("/api/employees");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return [];
  }
};
