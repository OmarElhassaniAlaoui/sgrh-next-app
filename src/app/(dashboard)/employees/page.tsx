"use client";
import React, { useEffect } from "react";
import useEmployeeStore, { EmployeeStore } from "@/stores/employee.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmployeeDataTable } from "@/components/employee/data-table"; // Import the new data table component

const page = () => {
  const fetchEmployees = useEmployeeStore(
    (state: EmployeeStore) => state.fetchEmployees
  );
  const employees = useEmployeeStore((state: EmployeeStore) => state.employees);
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <section className="flex flex-col gap-4 items-center w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">Employees</h1>
            <Button>Add Employee</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          {/* Render the new data table component */}
          <EmployeeDataTable data={employees} />
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
