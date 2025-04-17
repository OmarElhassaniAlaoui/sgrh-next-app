import { Employee } from "@prisma/client";
import { create } from "zustand";

export interface EmployeeStore {
  employees: Employee[];
  fetchEmployees: () => Promise<void>;
}

const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  fetchEmployees: async () => {
    try {
      const employees = await fetch("/api/employees");
      if (!employees.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await employees.json();
      set({ employees: data });
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  },
}));

export default useEmployeeStore;
