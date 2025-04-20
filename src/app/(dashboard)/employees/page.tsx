import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmployeeDataTable } from "@/components/employee/data-table";
import { EmployeeFilters } from "@/components/employee/employee-filters"; // Import filters
import Link from "next/link";
import {
  getFilteredEmployees,
  getUniqueEmployeeFilters,
} from "@/actions/employee.action"; // Assume these actions exist

// Define the expected shape of searchParams
interface EmployeesPageProps {
  searchParams?: {
    search?: string;
    division?: string;
    service?: string;
    grade?: string;
    ladder?: string;
    page?: string;
    limit?: string;
    sort?: string;
  };
}

const EmployeesPage = async ({ searchParams }: EmployeesPageProps) => {
  // Destructure searchParams to ensure it's awaited
  const {
    page: pageParam = "1",
    limit: limitParam = "10",
    sort = "createdAt:desc",
    search = "",
    division = "",
    service = "",
    grade = "",
    ladder = "",
  } = searchParams || {};

  // Default values for pagination and sorting can be added here if needed
  const page = Number(pageParam);
  const limit = Number(limitParam);

  // Fetch unique filter values and employees concurrently
  const [uniqueFilters, employeeData] = await Promise.all([
    getUniqueEmployeeFilters(),
    getFilteredEmployees({
      page,
      limit,
      sort,
      search,
      division,
      service,
      grade,
      ladder,
    }),
  ]);

  // TODO: Handle potential errors from fetching data

  const { employees, totalCount } = employeeData;
  const pageCount = Math.ceil(totalCount / limit);

  return (
    <section className="flex flex-col gap-4 items-center w-full">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestion des employés</h1>
        <Button asChild>
          <Link href="/employees/add">Ajouter un employé</Link>
        </Button>
      </div>

      {/* Render Filters */}
      <EmployeeFilters uniqueFilters={uniqueFilters} />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Liste des employés</CardTitle>
          {/* Description can be added if needed */}
        </CardHeader>
        <CardContent className="w-full">
          {/* Pass fetched employees and pagination/sorting info */}
          <EmployeeDataTable
            data={employees}
            pageCount={pageCount}
            // Pass other necessary props like column definitions if they are dynamic
          />
        </CardContent>
      </Card>
    </section>
  );
};

export default EmployeesPage;
