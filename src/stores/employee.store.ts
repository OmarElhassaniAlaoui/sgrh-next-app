import { create } from "zustand";
import { Employee } from "@prisma/client";

interface EmployeeState {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  addEmployee: (
    employee: Omit<Employee, "id" | "createdAt" | "updatedAt">
  ) => Promise<Employee>;
  updateEmployee: (id: string, data: Partial<Employee>) => Promise<Employee>;
  deleteEmployee: (id: string) => Promise<void>;
  searchEmployees: (query: string) => Promise<Employee[]>;
  filterEmployees: (filters: {
    grade?: string;
    ladder?: string;
    service?: string;
    division?: string;
  }) => void;
}

export const useEmployeeStore = create<EmployeeState>()((set, get) => ({
  employees: [],
  isLoading: false,
  error: null,

  fetchEmployees: async () => {
    set({ isLoading: true, error: null });
    try {
      const employees = await fetch("/api/employees").then((res) => res.json());
      set({ employees, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch employees", isLoading: false });
    }
  },

  addEmployee: async (employee) => {
    set({ isLoading: true, error: null });
    try {
      const newEmployee = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      }).then((res) => res.json());

      set((state) => ({
        employees: [...state.employees, newEmployee],
        isLoading: false,
      }));

      return newEmployee;
    } catch (error) {
      set({ error: "Failed to add employee", isLoading: false });
      throw error;
    }
  },

  updateEmployee: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEmployee = await fetch(`/api/employees/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      set((state) => ({
        employees: state.employees.map((emp) =>
          emp.id === id ? updatedEmployee : emp
        ),
        isLoading: false,
      }));

      return updatedEmployee;
    } catch (error) {
      set({ error: "Failed to update employee", isLoading: false });
      throw error;
    }
  },

  deleteEmployee: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await fetch(`/api/employees/${id}`, { method: "DELETE" });
      set((state) => ({
        employees: state.employees.filter((emp) => emp.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete employee", isLoading: false });
      throw error;
    }
  },

  searchEmployees: async (query) => {
    try {
      if (!query.trim()) return get().employees;

      const results = get().employees.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(query.toLowerCase()) ||
          emp.lastName.toLowerCase().includes(query.toLowerCase()) ||
          emp.cin.toLowerCase().includes(query.toLowerCase()) ||
          emp.ppr.toLowerCase().includes(query.toLowerCase())
      );

      return results;
    } catch (error) {
      console.error("Search failed:", error);
      return [];
    }
  },

  filterEmployees: (filters) => {
    set({ isLoading: true });
    try {
      const { employees } = get();
      const filtered = employees.filter((emp) => {
        let match = true;
        if (filters.grade && emp.grade !== filters.grade) match = false;
        if (filters.ladder && emp.ladder !== filters.ladder) match = false;
        if (filters.service && emp.service !== filters.service) match = false;
        if (filters.division && emp.division !== filters.division)
          match = false;
        return match;
      });

      set({ employees: filtered, isLoading: false });
    } catch (error) {
      set({ error: "Failed to filter employees", isLoading: false });
    }
  },
}));
