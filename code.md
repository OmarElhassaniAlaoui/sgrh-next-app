================================================
FILE: index.html
================================================
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>maroc-leave-manager-system</title>
    <meta name="description" content="Lovable Generated Project" />
    <meta name="author" content="Lovable" />

    <meta property="og:title" content="maroc-leave-manager-system" />
    <meta property="og:description" content="Lovable Generated Project" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@lovable_dev" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
  </head>

  <body>
    <div id="root"></div>
    <!-- IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT! -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>





================================================
FILE: src/App.css
================================================
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}



================================================
FILE: src/App.tsx
================================================

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import useSettingsStore from "@/store/useSettingsStore";

// Pages
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import EmployeesPage from "./pages/employees/index";
import NewEmployeePage from "./pages/employees/new";
import EditEmployeePage from "./pages/employees/[id]";
import EmployeeDetailsPage from "./pages/employees/[id]/details";
import LeavesPage from "./pages/leaves/index";
import NewLeavePage from "./pages/leaves/new";
import LeaveDetailsPage from "./pages/leaves/[id]";
import ReportsPage from "./pages/reports";
import SettingsPage from "./pages/settings";
import NotFound from "./pages/NotFound";

// Create Query Client only once
const queryClient = new QueryClient();

const App = () => {
  const { theme } = useSettingsStore();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme={theme}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/employees/new" element={<NewEmployeePage />} />
              <Route path="/employees/:id" element={<EditEmployeePage />} />
              <Route path="/employees/:id/details" element={<EmployeeDetailsPage />} />
              <Route path="/leaves" element={<LeavesPage />} />
              <Route path="/leaves/new" element={<NewLeavePage />} />
              <Route path="/leaves/:id" element={<LeaveDetailsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;



================================================
FILE: src/index.css
================================================

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 210 64% 27%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 210 64% 27%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 64% 50%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 210 64% 50%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}

.print-only {
  display: none;
}

@media print {
  .no-print {
    display: none !important;
  }
  
  .print-only {
    display: block;
  }
  
  body {
    background-color: white;
  }
}

.page-break {
  page-break-after: always;
}




================================================
FILE: src/main.tsx
================================================
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);



================================================
FILE: src/vite-env.d.ts
================================================
/// <reference types="vite/client" />



================================================
FILE: src/components/theme-provider.tsx
================================================

import { createContext, useContext, useEffect, useState } from "react";
import useSettingsStore from "@/store/useSettingsStore";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const settingsStore = useSettingsStore();
  
  // Get initial theme from store or use default
  const [theme, setTheme] = useState<Theme>(
    () => (settingsStore.theme as Theme) || defaultTheme
  );

  // This effect handles applying the theme to the DOM
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // This effect syncs theme changes to the settings store
  // We use a separate effect to avoid causing infinite loops
  useEffect(() => {
    // Only update the store if the theme doesn't match
    if (settingsStore.theme !== theme) {
      settingsStore.setTheme(theme);
    }
  }, [theme, settingsStore]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};



================================================
FILE: src/components/dashboard/monthly-leaves-chart.tsx
================================================

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveRequest } from "@/store/useLeaveStore";
import { useTheme } from "@/components/theme-provider";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { getMonthName } from "@/utils/date-utils";

interface MonthlyLeavesChartProps {
  leaveRequests: LeaveRequest[];
}

type MonthlyData = {
  name: string;
  count: number;
  month: number;
};

export function MonthlyLeavesChart({ leaveRequests }: MonthlyLeavesChartProps) {
  const { theme } = useTheme();
  
  // Process data to get monthly counts
  const processMonthlyData = (): MonthlyData[] => {
    // Initialize an array for all 12 months
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      name: getMonthName(i),
      count: 0,
      month: i,
    }));
    
    // Count leave requests per month
    leaveRequests.forEach((leave) => {
      const startDate = new Date(leave.startDate);
      const month = startDate.getMonth();
      monthlyData[month].count += 1;
    });
    
    // Get current month index
    const currentMonth = new Date().getMonth();
    
    // Re-arrange months to start from current month - 5 (showing 6 months in the past and current month)
    const result = [];
    for (let i = currentMonth - 5; i <= currentMonth + 6; i++) {
      const normalizedIndex = ((i % 12) + 12) % 12; // Handle negative indices
      if (result.length < 12) { // Only take 12 months
        result.push(monthlyData[normalizedIndex]);
      }
    }
    
    return result;
  };
  
  const data = processMonthlyData();
  
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Demandes de congés par mois</CardTitle>
        <CardDescription>
          Nombre total de demandes de congés soumises par mois
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: theme === 'dark' ? '#94a3b8' : '#64748b' }}
              axisLine={{ stroke: theme === 'dark' ? '#334155' : '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fill: theme === 'dark' ? '#94a3b8' : '#64748b' }}
              axisLine={{ stroke: theme === 'dark' ? '#334155' : '#e2e8f0' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                color: theme === 'dark' ? '#e2e8f0' : '#334155',
                border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
              }}
            />
            <Bar 
              dataKey="count" 
              name="Demandes" 
              fill={theme === 'dark' ? '#3b82f6' : '#2563eb'} 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}



================================================
FILE: src/components/dashboard/recent-leaves-table.tsx
================================================

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { LeaveRequest, LeaveStatus } from "@/store/useLeaveStore";
import { Employee } from "@/store/useEmployeeStore";
import { formatDate } from "@/utils/date-utils";
import { getLeaveTypeLabel } from "@/utils/leave-utils";
import { cn } from "@/lib/utils";

interface RecentLeavesTableProps {
  leaves: LeaveRequest[];
  employees: Record<string, Employee>;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const getStatusBadgeColor = (status: LeaveStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "approved":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "rejected":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "cancelled":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getStatusLabel = (status: LeaveStatus) => {
  switch (status) {
    case "pending":
      return "En attente";
    case "approved":
      return "Approuvé";
    case "rejected":
      return "Rejeté";
    case "cancelled":
      return "Annulé";
  }
};

export function RecentLeavesTable({
  leaves,
  employees,
  onApprove,
  onReject,
}: RecentLeavesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employé</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead>Durée</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaves.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              Aucune demande de congé récente
            </TableCell>
          </TableRow>
        ) : (
          leaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell className="font-medium">
                {employees[leave.employeeId]?.name} {employees[leave.employeeId]?.surname}
              </TableCell>
              <TableCell>{getLeaveTypeLabel(leave.type)}</TableCell>
              <TableCell>
                {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
              </TableCell>
              <TableCell>{leave.duration} jours</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn("font-normal", getStatusBadgeColor(leave.status))}
                >
                  {getStatusLabel(leave.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {leave.status === "pending" && (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 text-green-600"
                      onClick={() => onApprove(leave.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => onReject(leave.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}



================================================
FILE: src/components/dashboard/stat-card.tsx
================================================

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  className?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  className,
  trend,
}: StatCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <CardDescription className="text-xs text-muted-foreground mt-1">
            {description}
          </CardDescription>
        )}
        {trend && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "text-xs font-medium",
                trend.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.positive ? "+" : "-"}
              {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">depuis le mois dernier</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}



================================================
FILE: src/components/employees/employee-filters.tsx
================================================
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";
import { Employee } from "@/store/useEmployeeStore";

interface EmployeeFiltersProps {
  employees: Employee[];
  onFilter: (filters: Partial<Record<keyof Employee, string>>) => void;
}

export function EmployeeFilters({ employees, onFilter }: EmployeeFiltersProps) {
  const [filters, setFilters] = useState<
    Partial<Record<keyof Employee, string>>
  >({});
  const [divisions, setDivisions] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [ladders, setLadders] = useState<string[]>([]);

  // Extract unique values for filters
  useEffect(() => {
    if (!employees?.length) return;

    setDivisions([...new Set(employees.map((emp) => emp.division))]);
    setServices([...new Set(employees.map((emp) => emp.service))]);
    setGrades([...new Set(employees.map((emp) => emp.grade))]);
    setLadders([...new Set(employees.map((emp) => emp.ladder))]);
  }, [employees]);

  const handleFilterChange = (key: keyof Employee, value: string) => {
    const filterValue = value === "_all" ? "" : value;

    // Check if the selected value is different from the current value
    if (filters[key] !== filterValue) {
      // Create a new filters object without empty values
      const newFilters = { ...filters, [key]: filterValue };

      // Remove empty filters to keep the object clean
      Object.keys(newFilters).forEach((key) => {
        if (newFilters[key as keyof Employee] === "") {
          delete newFilters[key as keyof Employee];
        }
      });

      setFilters(newFilters);
      onFilter(newFilters);
    }
  };

  const resetFilters = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <div className="bg-muted/40 p-4 rounded-lg space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Filtres</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          disabled={Object.keys(filters).length === 0}
        >
          <FilterX className="mr-2 h-4 w-4" />
          Réinitialiser
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="division">Division</Label>
          <Select
            value={filters.division || ""}
            onValueChange={(value) => handleFilterChange("division", value)}
          >
            <SelectTrigger id="division">
              <SelectValue placeholder="Toutes les divisions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">Toutes les divisions</SelectItem>
              {divisions.sort().map(
                (
                  division // Added sort() for consistency
                ) => (
                  <SelectItem key={division} value={division}>
                    {division}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="service">Service</Label>
          <Select
            value={filters.service || ""}
            onValueChange={(value) => handleFilterChange("service", value)}
          >
            <SelectTrigger id="service">
              <SelectValue placeholder="Tous les services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">Tous les services</SelectItem>
              {services.sort().map(
                (
                  service // Added sort() for consistency
                ) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="grade">Grade</Label>
          <Select
            value={filters.grade || ""}
            onValueChange={(value) => handleFilterChange("grade", value)}
          >
            <SelectTrigger id="grade">
              <SelectValue placeholder="Tous les grades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">Tous les grades</SelectItem>
              {grades.sort().map(
                (
                  grade // Added sort() for consistency
                ) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ladder">Échelle</Label>
          <Select
            value={filters.ladder || ""}
            onValueChange={(value) => handleFilterChange("ladder", value)}
          >
            <SelectTrigger id="ladder">
              <SelectValue placeholder="Toutes les échelles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">Toutes les échelles</SelectItem>
              {ladders.sort().map(
                (
                  ladder // Added sort() for consistency
                ) => (
                  <SelectItem key={ladder} value={ladder}>
                    {ladder}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}



================================================
FILE: src/components/employees/employee-form.tsx
================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Employee } from "@/store/useEmployeeStore";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  surname: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères",
  }),
  cin: z.string().min(4, {
    message: "Le CIN doit contenir au moins 4 caractères",
  }),
  ppr: z.string().min(4, {
    message: "Le PPR doit contenir au moins 4 caractères",
  }),
  grade: z.string().min(2, {
    message: "Le grade est requis",
  }),
  ladder: z.string().min(2, {
    message: "L'échelle est requise",
  }),
  service: z.string().min(2, {
    message: "Le service est requis",
  }),
  division: z.string().min(2, {
    message: "La division est requise",
  }),
  decisionNumber: z.string().min(2, {
    message: "Le numéro de décision est requis",
  }),
  decisionDate: z.date({
    required_error: "La date de décision est requise",
  }),
  address: z.string().min(2, {
    message: "L'adresse est requise",
  }),
});

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

export function EmployeeForm({ employee, onSubmit }: EmployeeFormProps) {
  const navigate = useNavigate();
  const isEditing = !!employee;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: employee
      ? {
          ...employee,
          decisionDate: new Date(employee.decisionDate),
        }
      : {
          name: "",
          surname: "",
          cin: "",
          ppr: "",
          grade: "",
          ladder: "",
          service: "",
          division: "",
          decisionNumber: "",
          decisionDate: new Date(),
          address: "",
        },
  });
  
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
    toast.success(
      isEditing
        ? "Employé mis à jour avec succès"
        : "Nouvel employé ajouté avec succès"
    );
    navigate("/employees");
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="El Alaoui" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Mohammed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIN</FormLabel>
                <FormControl>
                  <Input placeholder="A123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ppr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PPR</FormLabel>
                <FormControl>
                  <Input placeholder="PPR12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade</FormLabel>
                <FormControl>
                  <Input placeholder="Administrateur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ladder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Échelle</FormLabel>
                <FormControl>
                  <Input placeholder="Échelle 11" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <FormControl>
                  <Input placeholder="Ressources Humaines" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="division"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Division</FormLabel>
                <FormControl>
                  <Input placeholder="Administration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="decisionNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de décision</FormLabel>
                <FormControl>
                  <Input placeholder="DC-2023-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="decisionDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de décision</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="123 Rue Hassan II, Rabat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/employees")}>
            Annuler
          </Button>
          <Button type="submit">{isEditing ? "Mettre à jour" : "Créer"}</Button>
        </div>
      </form>
    </Form>
  );
}



================================================
FILE: src/components/employees/employee-search.tsx
================================================
import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DownloadCloud,
  FileSpreadsheet,
  FileText,
  Search,
  UserPlus,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToExcel, exportToCSV } from "@/utils/export-utils";
import { Employee } from "@/store/useEmployeeStore";
import { toast } from "sonner";

// Define the keys available for export, potentially mapping to user-friendly names
const employeeKeys: { key: keyof Employee; label: string }[] = [
  { key: "name", label: "Prénom" },
  { key: "surname", label: "Nom" },
  { key: "cin", label: "CIN" },
  { key: "ppr", label: "PPR" },
  { key: "grade", label: "Grade" },
  { key: "ladder", label: "Échelle" },
  { key: "service", label: "Service" },
  { key: "division", label: "Division" },
  { key: "decisionNumber", label: "N° Décision" },
  { key: "decisionDate", label: "Date Décision" },
  { key: "address", label: "Adresse" },
  { key: "leaveBalance", label: "Solde Congé" },
  // { key: "id", label: "ID Technique" }, // Usually not needed for user export
];

interface EmployeeSearchProps {
  onSearch: (query: string) => void;
  employees: Employee[];
}

export function EmployeeSearch({ onSearch, employees }: EmployeeSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<keyof Employee>>(
    new Set(employeeKeys.map((k) => k.key)) // Default to all selected
  );
  const [exportType, setExportType] = useState<"excel" | "csv" | null>(null);
  const navigate = useNavigate();

  // Debounce search for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  const handleExportClick = (type: "excel" | "csv") => {
    if (employees.length === 0) {
      toast.error("Aucun employé à exporter.");
      return;
    }
    setExportType(type);
    setIsDialogOpen(true);
  };

  const handleSelectKey = (key: keyof Employee, checked: boolean) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(key);
      } else {
        next.delete(key);
      }
      return next;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedKeys(new Set(employeeKeys.map((k) => k.key)));
    } else {
      setSelectedKeys(new Set());
    }
  };

  const performActualExport = () => {
    if (!exportType || selectedKeys.size === 0) {
      toast.error("Veuillez sélectionner au moins une colonne à exporter.");
      return;
    }

    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `employees-${timestamp}`;
    const keysToExport = Array.from(selectedKeys);

    // Pass the original employees array and the selected keys to the export functions
    try {
      if (exportType === "excel") {
        exportToExcel(employees, filename, keysToExport);
        toast.success("Export Excel réussi");
      } else {
        exportToCSV(employees, filename, keysToExport);
        toast.success("Export CSV réussi");
      }
      setIsDialogOpen(false); // Close dialog on success
    } catch (error) {
      toast.error("Erreur lors de l'export");
      console.error("Export error:", error);
      // Optionally keep dialog open on error: setIsDialogOpen(false);
    }
  };

  const areAllSelected = useMemo(
    () => selectedKeys.size === employeeKeys.length,
    [selectedKeys]
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par nom, prénom, CIN, PPR, grade..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-10 w-full"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <DownloadCloud className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExportClick("excel")}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportClick("csv")}>
              <FileText className="mr-2 h-4 w-4" />
              Export CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={() => navigate("/employees/new")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nouvel Employé
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choisir les colonnes à exporter</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center space-x-2 mb-2 border-b pb-2">
              <Checkbox
                id="select-all"
                checked={areAllSelected}
                onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
              />
              <Label htmlFor="select-all" className="font-medium">
                Tout sélectionner / désélectionner
              </Label>
            </div>
            {employeeKeys.map(({ key, label }) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`checkbox-${key}`}
                  checked={selectedKeys.has(key)}
                  onCheckedChange={(checked) =>
                    handleSelectKey(key, Boolean(checked))
                  }
                />
                <Label htmlFor={`checkbox-${key}`}>{label}</Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button onClick={performActualExport}>Confirmer l'export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}



================================================
FILE: src/components/employees/employee-table.tsx
================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit, MoreHorizontal, Trash2, User } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Employee } from "@/store/useEmployeeStore";
import { toast } from "sonner";

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (id: string) => void;
}

export function EmployeeTable({ employees, onDelete }: EmployeeTableProps) {
  const navigate = useNavigate();
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  const handleEdit = (id: string) => {
    navigate(`/employees/${id}`);
  };

  const handleNewLeave = (id: string) => {
    navigate(`/leaves/new?employeeId=${id}`);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/employees/${id}/details`);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      onDelete(employeeToDelete.id);
      toast.success("Employé supprimé avec succès");
      setEmployeeToDelete(null);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom complet</TableHead>
            <TableHead>CIN</TableHead>
            <TableHead>PPR</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Division</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                Aucun employé trouvé
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow key={employee.id} className="group">
                <TableCell className="font-medium">
                  {employee.name} {employee.surname}
                </TableCell>
                <TableCell>{employee.cin}</TableCell>
                <TableCell>{employee.ppr}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {employee.grade}
                  </Badge>
                </TableCell>
                <TableCell>{employee.division}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 opacity-70 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleViewDetails(employee.id)}>
                        <User className="mr-2 h-4 w-4" />
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(employee.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleNewLeave(employee.id)}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Créer un congé
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setEmployeeToDelete(employee)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AlertDialog
        open={!!employeeToDelete}
        onOpenChange={(open) => !open && setEmployeeToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'employé{" "}
              <span className="font-medium">
                {employeeToDelete?.name} {employeeToDelete?.surname}
              </span>
              ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}



================================================
FILE: src/components/layout/dashboard-layout.tsx
================================================

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import Sidebar from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export default function DashboardLayout({
  children,
  className,
  fullWidth = false,
}: DashboardLayoutProps) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Only redirect once when authentication changes
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null; // Return null without any side effects
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-60 pt-0 lg:pt-0 mt-16 lg:mt-0 min-h-screen">
        <main className={cn("min-h-screen", fullWidth ? "w-full" : "container py-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}



================================================
FILE: src/components/layout/sidebar.tsx
================================================

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Calendar,
  ClipboardList,
  FileText,
  Home,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
  Users,
} from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState, useCallback } from "react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Use useCallback to prevent function recreation on each render
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Memoize navItems to prevent recreating the array on each render
  const navItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Employés",
      icon: Users,
      href: "/employees",
    },
    {
      title: "Congés",
      icon: Calendar,
      href: "/leaves",
    },
    {
      title: "Demandes",
      icon: ClipboardList,
      href: "/requests",
    },
    {
      title: "Rapports",
      icon: BarChart3,
      href: "/reports",
    },
    {
      title: "Paramètres",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile hamburger menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-background border-b p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">ماروك نظام إدارة الإجازة</h1>
        <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </Button>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-20 lg:hidden bg-background transition-transform transform",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="pt-16 h-full overflow-y-auto">
          <div className="space-y-4 py-4">
            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
                Menu
              </h2>
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant={location.pathname === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
                Account
              </h2>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={toggleTheme}
                >
                  {theme === "light" ? (
                    <Moon className="mr-2 h-4 w-4" />
                  ) : (
                    <Sun className="mr-2 h-4 w-4" />
                  )}
                  {theme === "light" ? "Mode Sombre" : "Mode Clair"}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          "hidden lg:flex lg:flex-col h-screen w-60 border-r bg-sidebar text-sidebar-foreground px-3 py-4 fixed left-0 top-0",
          className
        )}
      >
        <div className="flex items-center justify-center mb-8 px-4">
          <div className="flex flex-col items-center">
            <FileText className="h-8 w-8 text-morocco-primary" />
            <h1 className="text-xl font-semibold mt-2 text-morocco-primary">ماروك إجازة</h1>
            <p className="text-xs text-muted-foreground">نظام إدارة الإجازة</p>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <div className="px-1 py-2">
            <h2 className="mb-2 px-2 text-sm font-semibold tracking-tight uppercase text-sidebar-foreground/60">
              Menu Principal
            </h2>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={location.pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <div className="px-1 py-2">
            <h2 className="mb-2 px-2 text-sm font-semibold tracking-tight uppercase text-sidebar-foreground/60">
              Compte
            </h2>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <Moon className="mr-2 h-4 w-4" />
                ) : (
                  <Sun className="mr-2 h-4 w-4" />
                )}
                {theme === "light" ? "Mode Sombre" : "Mode Clair"}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10"
                onClick={() => logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;



================================================
FILE: src/components/leaves/leave-form.tsx
================================================
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select, // Keep Select for other fields like 'type'
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { LeaveType } from "@/store/useLeaveStore";
import { Employee } from "@/store/useEmployeeStore";
import {
  calculateBusinessDays,
  calculateReturnDate,
  toISODateString,
} from "@/utils/date-utils";
import { getLeaveTypeOptions } from "@/utils/leave-utils";
// Removed duplicate import: import { z } from "zod";

export const formSchema = z
  .object({
    employeeId: z.string({
      required_error: "Veuillez sélectionner un employé",
    }),
    type: z.enum(
      [
        "annual",
        "special",
        "sick",
        "maternity",
        "hajj",
        "marriage",
        "bereavement",
      ] as const,
      {
        required_error: "Veuillez sélectionner un type de congé",
      }
    ),
    startDate: z.date({
      required_error: "Veuillez sélectionner une date de début",
    }),
    endDate: z.date({
      required_error: "Veuillez sélectionner une date de fin",
    }),
    returnDate: z.date().optional(),
    replacementColleagueId: z.string().optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "La date de fin doit être postérieure à la date de début",
    path: ["endDate"],
  });

interface LeaveFormProps {
  employees: Employee[];
  preselectedEmployeeId?: string;
  onSubmit: (values: z.infer<typeof formSchema> & { duration: number }) => void;
}

export function LeaveForm({
  employees,
  preselectedEmployeeId,
  onSubmit,
}: LeaveFormProps) {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(0);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [openEmployeeCombobox, setOpenEmployeeCombobox] = useState(false); // State for Employee Combobox
  const [openReplacementCombobox, setOpenReplacementCombobox] = useState(false); // State for Replacement Combobox

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: preselectedEmployeeId || "",
      type: "annual" as LeaveType,
      startDate: new Date(),
      endDate: new Date(),
      replacementColleagueId: "",
    },
  });

  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  // Recalculate duration and return date when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const calculatedDuration = calculateBusinessDays(startDate, endDate);
      const calculatedReturnDate = calculateReturnDate(endDate);

      setDuration(calculatedDuration);
      setReturnDate(calculatedReturnDate);

      form.setValue("returnDate", calculatedReturnDate);
    }
  }, [startDate, endDate, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      ...values,
      duration,
      returnDate: values.returnDate || returnDate,
    });

    toast.success("Demande de congé créée avec succès");
    navigate("/leaves");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="employeeId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Employé</FormLabel>
                <Popover
                  open={openEmployeeCombobox}
                  onOpenChange={setOpenEmployeeCombobox}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openEmployeeCombobox}
                        disabled={!!preselectedEmployeeId}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? employees.find(
                              (employee) => employee.id === field.value
                            )?.name +
                            " " +
                            employees.find(
                              (employee) => employee.id === field.value
                            )?.surname
                          : "Sélectionner un employé"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                    <Command>
                      <CommandInput placeholder="Rechercher un employé..." />
                      <CommandList>
                        <CommandEmpty>Aucun employé trouvé.</CommandEmpty>
                        <CommandGroup>
                          {employees.map((employee) => (
                            <CommandItem
                              value={`${employee.name} ${employee.surname} ${employee.cin} ${employee.id}`} // Searchable value
                              key={employee.id}
                              onSelect={() => {
                                form.setValue("employeeId", employee.id);
                                setOpenEmployeeCombobox(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  employee.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {employee.name} {employee.surname} ({employee.cin}
                              )
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de congé</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type de congé" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getLeaveTypeOptions().map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de début</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de fin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < startDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Durée: <strong>{duration} jours</strong> (hors week-ends)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="replacementColleagueId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Remplaçant (optionnel)</FormLabel>
                <Popover
                  open={openReplacementCombobox}
                  onOpenChange={setOpenReplacementCombobox}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openReplacementCombobox}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value && field.value !== "_none"
                          ? employees.find(
                              (employee) => employee.id === field.value
                            )?.name +
                            " " +
                            employees.find(
                              (employee) => employee.id === field.value
                            )?.surname
                          : "Sélectionner un remplaçant"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                    <Command>
                      <CommandInput placeholder="Rechercher un remplaçant..." />
                      <CommandList>
                        <CommandEmpty>Aucun employé trouvé.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value="_none"
                            onSelect={() => {
                              form.setValue("replacementColleagueId", "_none"); // Use a special value or empty string
                              setOpenReplacementCombobox(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === "_none"
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            Aucun remplaçant
                          </CommandItem>
                          {employees
                            .filter(
                              (emp) => emp.id !== form.getValues("employeeId")
                            ) // Exclude the employee taking leave
                            .map((employee) => (
                              <CommandItem
                                value={`${employee.name} ${employee.surname} ${employee.cin} ${employee.id}`} // Searchable value
                                key={employee.id}
                                onSelect={() => {
                                  form.setValue(
                                    "replacementColleagueId",
                                    employee.id
                                  );
                                  setOpenReplacementCombobox(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    employee.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {employee.name} {employee.surname}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="flex flex-col">
            <FormLabel>Date de retour</FormLabel>
            <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
              {returnDate
                ? format(returnDate, "dd/MM/yyyy")
                : "Calculé automatiquement"}
            </div>
            <FormDescription>
              Calculée automatiquement (jour ouvrable suivant la date de fin)
            </FormDescription>
          </FormItem>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/leaves")}
          >
            Annuler
          </Button>
          <Button type="submit">Créer</Button>
        </div>
      </form>
    </Form>
  );
}



================================================
FILE: src/components/leaves/leave-slip.tsx
================================================

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Printer } from "lucide-react";
import { Employee } from "@/store/useEmployeeStore";
import { LeaveRequest } from "@/store/useLeaveStore";
import { formatDate, formatDateLong } from "@/utils/date-utils";
import { getLeaveTypeLabel } from "@/utils/leave-utils";

interface LeaveSlipProps {
  leave: LeaveRequest;
  employee: Employee;
  replacementEmployee: Employee | null;
}

export function LeaveSlip({
  leave,
  employee,
  replacementEmployee,
}: LeaveSlipProps) {
  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handlePrint} className="print:hidden">
          <Printer className="mr-2 h-4 w-4" />
          Imprimer
        </Button>
      </div>
      
      <Card>
        <CardContent ref={printRef} className="p-6">
          <div className="mb-8 text-center">
            <div className="text-xl font-bold">ROYAUME DU MAROC</div>
            <div className="font-semibold">Ministère de [Département]</div>
            <div>Direction de [Division]</div>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-2 inline-block">
              AUTORISATION DE CONGÉ
            </h1>
            <p className="text-sm text-muted-foreground">
              N° {leave.id.substring(0, 8).toUpperCase()}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Informations de l'employé :</h3>
                <p>
                  <span className="font-medium">Nom et prénom :</span> {employee.name}{" "}
                  {employee.surname}
                </p>
                <p>
                  <span className="font-medium">CIN :</span> {employee.cin}
                </p>
                <p>
                  <span className="font-medium">PPR :</span> {employee.ppr}
                </p>
                <p>
                  <span className="font-medium">Grade :</span> {employee.grade}
                </p>
                <p>
                  <span className="font-medium">Échelle :</span> {employee.ladder}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold">Informations du congé :</h3>
                <p>
                  <span className="font-medium">Type de congé :</span>{" "}
                  {getLeaveTypeLabel(leave.type)}
                </p>
                <p>
                  <span className="font-medium">Date de début :</span>{" "}
                  {formatDate(leave.startDate)}
                </p>
                <p>
                  <span className="font-medium">Date de fin :</span>{" "}
                  {formatDate(leave.endDate)}
                </p>
                <p>
                  <span className="font-medium">Date de retour :</span>{" "}
                  {formatDate(leave.returnDate)}
                </p>
                <p>
                  <span className="font-medium">Durée :</span> {leave.duration} jours
                </p>
              </div>
            </div>
            
            {replacementEmployee && (
              <div>
                <h3 className="font-semibold">Remplaçant :</h3>
                <p>
                  {replacementEmployee.name} {replacementEmployee.surname}
                </p>
              </div>
            )}
            
            <div className="mt-10">
              <p>
                L'agent sus-mentionné est autorisé à prendre un congé de{" "}
                <span className="font-semibold">{getLeaveTypeLabel(leave.type)}</span> de{" "}
                <span className="font-semibold">{leave.duration} jours</span>, du{" "}
                <span className="font-semibold">{formatDateLong(leave.startDate)}</span> au{" "}
                <span className="font-semibold">{formatDateLong(leave.endDate)}</span>.
              </p>
              <p className="mt-2">
                La reprise de service est prévue le{" "}
                <span className="font-semibold">{formatDateLong(leave.returnDate)}</span>.
              </p>
            </div>
            
            <div className="mt-10 flex justify-end">
              <div className="text-center">
                <p>Fait à ______________, le {formatDateLong(new Date())}</p>
                <p className="mt-6">Signature de l'autorité compétente</p>
                <div className="mt-6 border-t-2 border-gray-300 pt-2 w-40 mx-auto"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



================================================
FILE: src/components/requests/request-filters.tsx
================================================

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Request, RequestStatus, RequestType } from "@/types/request";

interface RequestFiltersProps {
  onFilter: (filters: Partial<Request>) => void;
}

export function RequestFilters({ onFilter }: RequestFiltersProps) {
  const handleStatusChange = (value: RequestStatus) => {
    onFilter({ status: value });
  };
  
  const handleTypeChange = (value: RequestType) => {
    onFilter({ type: value });
  };

  return (
    <Card className="p-4">
      <div className="flex flex-wrap gap-4">
        <div className="w-full sm:w-[180px]">
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">Tous les status</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="approved">Approuvée</SelectItem>
              <SelectItem value="rejected">Rejetée</SelectItem>
              <SelectItem value="cancelled">Annulée</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-[180px]">
          <Select onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_all">Tous les types</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="authorization">Autorisation</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}



================================================
FILE: src/components/requests/requests-table.tsx
================================================

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, FileText, X } from "lucide-react";
import { Request, RequestStatus } from "@/types/request";
import useEmployeeStore from "@/store/useEmployeeStore";
import useRequestStore from "@/store/useRequestStore";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface RequestsTableProps {
  requests: Request[];
}

const getStatusBadgeColor = (status: RequestStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "approved":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "rejected":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "cancelled":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getStatusLabel = (status: RequestStatus) => {
  switch (status) {
    case "pending":
      return "En attente";
    case "approved":
      return "Approuvée";
    case "rejected":
      return "Rejetée";
    case "cancelled":
      return "Annulée";
  }
};

export function RequestsTable({ requests }: RequestsTableProps) {
  const { employees } = useEmployeeStore();
  const { updateRequestStatus } = useRequestStore();
  
  const formatDate = (date: string) => {
    return format(new Date(date), "PPpp", { locale: fr });
  };
  
  const handleUpdateStatus = (id: string, status: RequestStatus) => {
    updateRequestStatus(id, status);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employé</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Titre</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              Aucune demande trouvée
            </TableCell>
          </TableRow>
        ) : (
          requests.map((request) => {
            const employee = employees.find((emp) => emp.id === request.employeeId);
            
            return (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {employee ? `${employee.name} ${employee.surname}` : 'N/A'}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {request.type === 'document' ? 'Document' : 'Autorisation'}
                  </Badge>
                </TableCell>
                <TableCell>{request.title}</TableCell>
                <TableCell>{formatDate(request.createdAt)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("font-normal", getStatusBadgeColor(request.status))}
                  >
                    {getStatusLabel(request.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {request.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-green-600"
                          onClick={() => handleUpdateStatus(request.id, "approved")}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-red-600"
                          onClick={() => handleUpdateStatus(request.id, "rejected")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}



================================================
FILE: src/hooks/use-mobile.tsx
================================================
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}



================================================
FILE: src/hooks/use-toast.ts
================================================
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }



================================================
FILE: src/lib/prisma.ts
================================================
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;



================================================
FILE: src/lib/utils.ts
================================================
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



================================================
FILE: src/pages/dashboard.tsx
================================================

import { useMemo } from "react";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CheckCircle,
  Clock,
  TimerOff,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { MonthlyLeavesChart } from "@/components/dashboard/monthly-leaves-chart";
import { RecentLeavesTable } from "@/components/dashboard/recent-leaves-table";
import useLeaveStore from "@/store/useLeaveStore";
import useEmployeeStore from "@/store/useEmployeeStore";
import { toast } from "sonner";

export default function Dashboard() {
  const { leaveRequests, updateLeaveStatus } = useLeaveStore();
  const { employees } = useEmployeeStore();
  
  // Transform employees array to a map for easier lookups
  const employeesMap = useMemo(() => {
    return employees.reduce((acc, employee) => {
      acc[employee.id] = employee;
      return acc;
    }, {} as Record<string, typeof employees[0]>);
  }, [employees]);
  
  // Calculate various metrics
  const totalRequests = leaveRequests.length;
  const approvedRequests = leaveRequests.filter(
    (req) => req.status === "approved"
  ).length;
  const pendingRequests = leaveRequests.filter(
    (req) => req.status === "pending"
  ).length;
  const rejectedRequests = leaveRequests.filter(
    (req) => req.status === "rejected"
  ).length;
  
  // Get the most recent pending leave requests
  const recentPendingRequests = useMemo(() => {
    return leaveRequests
      .filter((req) => req.status === "pending")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [leaveRequests]);
  
  const handleApprove = (id: string) => {
    updateLeaveStatus(id, "approved");
    toast.success("Demande de congé approuvée");
  };
  
  const handleReject = (id: string) => {
    updateLeaveStatus(id, "rejected");
    toast.error("Demande de congé rejetée");
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
          <p className="text-muted-foreground">
            Aperçu des demandes de congés et des métriques clés
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total des demandes"
            value={totalRequests}
            icon={Calendar}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Approuvées"
            value={approvedRequests}
            icon={CheckCircle}
            className="bg-green-50 dark:bg-green-950"
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            title="En attente"
            value={pendingRequests}
            icon={Clock}
            className="bg-yellow-50 dark:bg-amber-950"
            trend={{ value: 5, positive: false }}
          />
          <StatCard
            title="Rejetées"
            value={rejectedRequests}
            icon={TimerOff}
            className="bg-red-50 dark:bg-red-950"
            trend={{ value: 2, positive: true }}
          />
        </div>
        
        <MonthlyLeavesChart leaveRequests={leaveRequests} />
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Demandes récentes</CardTitle>
            <CardDescription>
              Gérez les demandes de congés en attente d'approbation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentLeavesTable
              leaves={recentPendingRequests}
              employees={employeesMap}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}



================================================
FILE: src/pages/Index.tsx
================================================
// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600">Start building your amazing project here!</p>
      </div>
    </div>
  );
};

export default Index;



================================================
FILE: src/pages/login.tsx
================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Lock } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { toast } from "sonner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = login(username, password);
      
      if (success) {
        toast.success("Connexion réussie");
        navigate("/dashboard");
      } else {
        toast.error("Identifiants incorrects");
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="p-3 rounded-full bg-primary/10 mb-4">
            <FileText className="h-8 w-8 text-morocco-primary" />
          </div>
          <h1 className="text-3xl font-bold text-morocco-primary">ماروك إجازة</h1>
          <p className="text-muted-foreground">Système de Gestion des Congés</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>
              Connectez-vous pour accéder au système de gestion des congés
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input
                  id="username"
                  placeholder="Entrer votre nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrer votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connexion en cours...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Lock className="mr-2 h-4 w-4" />
                    Se connecter
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p className="text-sm text-muted-foreground">
            Pour vous connecter, utilisez les identifiants de démonstration: <br />
            <span className="font-medium">Nom d'utilisateur:</span> admin, <span className="font-medium">Mot de passe:</span> admin
          </p>
        </div>
      </div>
    </div>
  );
}



================================================
FILE: src/pages/NotFound.tsx
================================================
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;



================================================
FILE: src/pages/reports.tsx
================================================

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/layout/dashboard-layout";
import useEmployeeStore from "@/store/useEmployeeStore";
import useLeaveStore from "@/store/useLeaveStore";
import { BarChart, FileText, Printer, Users } from "lucide-react";
import { formatDate } from "@/utils/date-utils";
import { getLeaveTypeLabel } from "@/utils/leave-utils";

export default function ReportsPage() {
  const { employees } = useEmployeeStore();
  const { leaveRequests } = useLeaveStore();
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  
  // Get unique divisions
  const divisions = Array.from(new Set(employees.map((emp) => emp.division)));
  
  // Calculate leave balances for an employee
  const calculateEmployeeBalance = (employeeId: string) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    
    if (!employee) return { total: 0, used: 0, remaining: 0 };
    
    const totalBalance = employee.leaveBalance;
    const usedLeaves = leaveRequests
      .filter(
        (leave) =>
          leave.employeeId === employeeId &&
          leave.type === "annual" &&
          leave.status === "approved"
      )
      .reduce((total, leave) => total + leave.duration, 0);
    
    return {
      total: totalBalance,
      used: usedLeaves,
      remaining: Math.max(0, totalBalance - usedLeaves),
    };
  };
  
  // Get leave history for selected employee
  const selectedEmployeeLeaves = selectedEmployee
    ? leaveRequests
        .filter((leave) => leave.employeeId === selectedEmployee)
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    : [];
  
  // Get leave summary for selected division
  const divisionLeaves = selectedDivision
    ? employees
        .filter((emp) => emp.division === selectedDivision)
        .map((emp) => {
          const balance = calculateEmployeeBalance(emp.id);
          return {
            id: emp.id,
            name: `${emp.name} ${emp.surname}`,
            grade: emp.grade,
            total: balance.total,
            used: balance.used,
            remaining: balance.remaining,
          };
        })
    : [];
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rapports</h2>
          <p className="text-muted-foreground">
            Générez et consultez les rapports de congés
          </p>
        </div>
        
        <div className="flex justify-end print:hidden">
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
        </div>
        
        <Tabs defaultValue="employee" className="print:hidden">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-2">
            <TabsTrigger value="employee" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Rapport individuel
            </TabsTrigger>
            <TabsTrigger value="division" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Rapport par division
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="employee" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapport individuel de congé</CardTitle>
                <CardDescription>
                  Consultez les détails de congé pour un employé spécifique
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={selectedEmployee}
                  onValueChange={setSelectedEmployee}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un employé" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name} {employee.surname} ({employee.cin})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedEmployee && (
                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-semibold">
                      Solde de congés annuels
                    </h3>
                    
                    {(() => {
                      const employee = employees.find(
                        (emp) => emp.id === selectedEmployee
                      );
                      const balance = calculateEmployeeBalance(selectedEmployee);
                      
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-muted/40 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              Solde total
                            </p>
                            <p className="text-2xl font-bold">
                              {balance.total} jours
                            </p>
                          </div>
                          <div className="bg-muted/40 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              Congés pris
                            </p>
                            <p className="text-2xl font-bold">
                              {balance.used} jours
                            </p>
                          </div>
                          <div className="bg-muted/40 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              Solde restant
                            </p>
                            <p className="text-2xl font-bold">
                              {balance.remaining} jours
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                    
                    <h3 className="text-lg font-semibold mt-6">
                      Historique des congés
                    </h3>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Dates</TableHead>
                          <TableHead>Durée</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedEmployeeLeaves.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center py-6 text-muted-foreground"
                            >
                              Aucun congé trouvé pour cet employé
                            </TableCell>
                          </TableRow>
                        ) : (
                          selectedEmployeeLeaves.map((leave) => (
                            <TableRow key={leave.id}>
                              <TableCell>
                                {getLeaveTypeLabel(leave.type)}
                              </TableCell>
                              <TableCell>
                                {formatDate(leave.startDate)} -{" "}
                                {formatDate(leave.endDate)}
                              </TableCell>
                              <TableCell>{leave.duration} jours</TableCell>
                              <TableCell>
                                {leave.status === "approved"
                                  ? "Approuvé"
                                  : leave.status === "pending"
                                  ? "En attente"
                                  : leave.status === "rejected"
                                  ? "Rejeté"
                                  : "Annulé"}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="division" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapport par division</CardTitle>
                <CardDescription>
                  Consultez les congés par division
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={selectedDivision}
                  onValueChange={setSelectedDivision}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((division) => (
                      <SelectItem key={division} value={division}>
                        {division}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedDivision && (
                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-semibold">
                      Récapitulatif des congés pour {selectedDivision}
                    </h3>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employé</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Pris</TableHead>
                          <TableHead>Restant</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {divisionLeaves.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="text-center py-6 text-muted-foreground"
                            >
                              Aucun employé trouvé dans cette division
                            </TableCell>
                          </TableRow>
                        ) : (
                          divisionLeaves.map((emp) => (
                            <TableRow key={emp.id}>
                              <TableCell className="font-medium">
                                {emp.name}
                              </TableCell>
                              <TableCell>{emp.grade}</TableCell>
                              <TableCell>{emp.total} jours</TableCell>
                              <TableCell>{emp.used} jours</TableCell>
                              <TableCell>{emp.remaining} jours</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}



================================================
FILE: src/pages/settings.tsx
================================================

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/layout/dashboard-layout";
import useSettingsStore from "@/store/useSettingsStore";
import useLeaveStore from "@/store/useLeaveStore";
import useEmployeeStore from "@/store/useEmployeeStore";
import { toast } from "sonner";
import { Download, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { notificationsEnabled, toggleNotifications } = useSettingsStore();
  const { leaveRequests } = useLeaveStore();
  const { employees } = useEmployeeStore();
  const [exportLoading, setExportLoading] = useState(false);
  
  const handleExportData = () => {
    setExportLoading(true);
    
    try {
      // Prepare data for export
      const exportData = {
        employees,
        leaveRequests,
        exportDate: new Date().toISOString(),
      };
      
      // Convert to JSON string
      const jsonString = JSON.stringify(exportData, null, 2);
      
      // Create blob and download link
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `leave-management-export-${new Date().toISOString().split("T")[0]}.json`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Données exportées avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'exportation des données");
      console.error("Export error:", error);
    } finally {
      setExportLoading(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre application
          </p>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="theme-toggle">Thème sombre</Label>
                  <p className="text-sm text-muted-foreground">
                    Basculer entre le thème clair et sombre
                  </p>
                </div>
                <div className="flex items-center">
                  <Sun className="mr-2 h-4 w-4" />
                  <Switch
                    id="theme-toggle"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) =>
                      setTheme(checked ? "dark" : "light")
                    }
                  />
                  <Moon className="ml-2 h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configurez les paramètres de notification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications-toggle">
                    Activer les notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des alertes pour les approbations de congés
                  </p>
                </div>
                <Switch
                  id="notifications-toggle"
                  checked={notificationsEnabled}
                  onCheckedChange={toggleNotifications}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Exportation des données</CardTitle>
              <CardDescription>
                Exportez toutes les données du système
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-0.5">
                  <Label>Exporter vers JSON</Label>
                  <p className="text-sm text-muted-foreground">
                    Téléchargez toutes les données de l'application au format JSON
                  </p>
                </div>
                <Button
                  onClick={handleExportData}
                  disabled={exportLoading}
                >
                  {exportLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Exportation...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Exporter les données
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>À propos</CardTitle>
              <CardDescription>
                Informations sur l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Système de Gestion des Congés</h3>
                <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                <p className="text-sm mt-2">
                  Développé pour l'administration publique marocaine
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}



================================================
FILE: src/pages/employees/[id].tsx
================================================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { EmployeeForm } from "@/components/employees/employee-form";
import useEmployeeStore, { Employee } from "@/store/useEmployeeStore";
import { format } from "date-fns";
import { toast } from "sonner";

export default function EditEmployeePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEmployeeById, updateEmployee } = useEmployeeStore();
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const emp = getEmployeeById(id);
      setEmployee(emp);
    }
    setLoading(false);
  }, [id, getEmployeeById]);
  
  const handleSubmit = (data: any) => {
    if (id && employee) {
      try {
        updateEmployee(id, {
          ...data,
          decisionDate: format(data.decisionDate, 'yyyy-MM-dd'),
        });
        toast.success("Employé mis à jour avec succès");
        navigate("/employees");
      } catch (error) {
        console.error("Error updating employee:", error);
        toast.error("Erreur lors de la mise à jour de l'employé");
      }
    }
  };
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Chargement...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!employee) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <h3 className="text-xl font-semibold mb-2">Employé non trouvé</h3>
          <p className="text-muted-foreground mb-4">
            L'employé que vous recherchez n'existe pas.
          </p>
          <button
            onClick={() => navigate("/employees")}
            className="text-primary hover:underline"
          >
            Retour à la liste des employés
          </button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Modifier un employé</h2>
          <p className="text-muted-foreground">
            Mettre à jour les informations de l'employé
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Informations de l'employé</CardTitle>
            <CardDescription>
              Modifiez les informations de {employee.name} {employee.surname}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeeForm employee={employee} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}



================================================
FILE: src/pages/employees/index.tsx
================================================
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { EmployeeSearch } from "@/components/employees/employee-search";
import { EmployeeFilters } from "@/components/employees/employee-filters";
import { EmployeeTable } from "@/components/employees/employee-table";
import useEmployeeStore, { Employee } from "@/store/useEmployeeStore";
import { filterEmployeesList } from "@/utils/filterEmployees";

export default function EmployeesPage() {
  const { employees, searchEmployees, deleteEmployee } = useEmployeeStore();
  const [searchResults, setSearchResults] = useState<Employee[]>(employees);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<
    Partial<Record<keyof Employee, string>>
  >({});

  // Combine search and filters
  useEffect(() => {
    let results = employees;

    // Apply search
    if (searchQuery.trim()) {
      results = searchEmployees(searchQuery);
    }

    // Apply filters
    results = filterEmployeesList(results, activeFilters);

    setSearchResults(results);
    setIsSearching(
      searchQuery.trim() !== "" || Object.keys(activeFilters).length > 0
    );
  }, [employees, searchQuery, activeFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filters: Partial<Record<keyof Employee, string>>) => {
    setActiveFilters(filters);
  };

  const handleDeleteEmployee = (id: string) => {
    deleteEmployee(id);
    setSearchResults((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Gestion des employés
          </h2>
          <p className="text-muted-foreground">
            Gérez les informations des employés
          </p>
        </div>

        <EmployeeSearch onSearch={handleSearch} employees={searchResults} />
        <EmployeeFilters employees={employees} onFilter={handleFilter} />

        <Card>
          <CardHeader>
            <CardTitle>Employés</CardTitle>
            <CardDescription>
              {isSearching
                ? `${searchResults.length} résultat(s) trouvé(s)`
                : `Liste de tous les employés (${employees.length})`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeeTable
              employees={searchResults}
              onDelete={handleDeleteEmployee}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}



================================================
FILE: src/pages/employees/new.tsx
================================================

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { EmployeeForm } from "@/components/employees/employee-form";
import useEmployeeStore from "@/store/useEmployeeStore";
import { format } from "date-fns";

export default function NewEmployeePage() {
  const { addEmployee } = useEmployeeStore();
  
  const handleSubmit = (data: any) => {
    addEmployee({
      ...data,
      decisionDate: format(data.decisionDate, 'yyyy-MM-dd'),
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ajouter un employé</h2>
          <p className="text-muted-foreground">
            Créer un nouvel employé dans le système
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Informations de l'employé</CardTitle>
            <CardDescription>
              Remplissez les informations du nouvel employé
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeeForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}



================================================
FILE: src/pages/employees/[id]/details.tsx
================================================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/dashboard-layout";
import useEmployeeStore, { Employee } from "@/store/useEmployeeStore";
import useLeaveStore, { LeaveRequest } from "@/store/useLeaveStore";
import { Calendar, Edit, FileText, User } from "lucide-react";
import { formatDate } from "@/utils/date-utils";
import { getLeaveTypeLabel } from "@/utils/leave-utils";
import { Badge } from "@/components/ui/badge";

export default function EmployeeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEmployeeById } = useEmployeeStore();
  const { getLeavesByEmployeeId } = useLeaveStore();
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const emp = getEmployeeById(id);
      setEmployee(emp);
      
      if (emp) {
        const employeeLeaves = getLeavesByEmployeeId(id);
        setLeaves(employeeLeaves);
      }
    }
    setLoading(false);
  }, [id, getEmployeeById, getLeavesByEmployeeId]);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Chargement...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!employee) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <h3 className="text-xl font-semibold mb-2">Employé non trouvé</h3>
          <p className="text-muted-foreground mb-4">
            L'employé que vous recherchez n'existe pas.
          </p>
          <button
            onClick={() => navigate("/employees")}
            className="text-primary hover:underline"
          >
            Retour à la liste des employés
          </button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {employee.name} {employee.surname}
            </h2>
            <p className="text-muted-foreground">
              CIN: {employee.cin} | PPR: {employee.ppr}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={() => navigate(`/employees/${id}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            <Button onClick={() => navigate(`/leaves/new?employeeId=${id}`)}>
              <Calendar className="mr-2 h-4 w-4" />
              Créer un congé
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="info">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-2">
            <TabsTrigger value="info" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Informations
            </TabsTrigger>
            <TabsTrigger value="leaves" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Historique des congés
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Détails complets de l'employé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Nom complet</h3>
                    <p>
                      {employee.name} {employee.surname}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">CIN</h3>
                    <p>{employee.cin}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">PPR</h3>
                    <p>{employee.ppr}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Grade</h3>
                    <p>{employee.grade}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Échelle</h3>
                    <p>{employee.ladder}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Service</h3>
                    <p>{employee.service}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Division</h3>
                    <p>{employee.division}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Numéro de décision</h3>
                    <p>{employee.decisionNumber}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Date de décision</h3>
                    <p>{formatDate(employee.decisionDate)}</p>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <h3 className="font-semibold">Adresse</h3>
                    <p>{employee.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Solde de congés</CardTitle>
                <CardDescription>
                  Suivi des jours de congés annuels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 p-4 bg-muted/40 rounded-lg">
                    <h3 className="font-semibold">Solde total</h3>
                    <p className="text-2xl font-bold">{employee.leaveBalance} jours</p>
                  </div>
                  
                  <div className="space-y-2 p-4 bg-muted/40 rounded-lg">
                    <h3 className="font-semibold">Congés pris</h3>
                    <p className="text-2xl font-bold">
                      {leaves
                        .filter((leave) => leave.type === "annual" && leave.status === "approved")
                        .reduce((total, leave) => total + leave.duration, 0)}{" "}
                      jours
                    </p>
                  </div>
                  
                  <div className="space-y-2 p-4 bg-muted/40 rounded-lg">
                    <h3 className="font-semibold">Solde restant</h3>
                    <p className="text-2xl font-bold">
                      {Math.max(
                        0,
                        employee.leaveBalance -
                          leaves
                            .filter(
                              (leave) => leave.type === "annual" && leave.status === "approved"
                            )
                            .reduce((total, leave) => total + leave.duration, 0)
                      )}{" "}
                      jours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leaves">
            <Card>
              <CardHeader>
                <CardTitle>Historique des congés</CardTitle>
                <CardDescription>
                  Liste des congés pris par l'employé
                </CardDescription>
              </CardHeader>
              <CardContent>
                {leaves.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucun congé trouvé pour cet employé
                  </div>
                ) : (
                  <div className="space-y-4">
                    {leaves
                      .sort(
                        (a, b) =>
                          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
                      )
                      .map((leave) => (
                        <div
                          key={leave.id}
                          className="p-4 rounded-lg border border-border flex flex-col md:flex-row justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">
                                {getLeaveTypeLabel(leave.type)}
                              </h3>
                              <Badge
                                variant="outline"
                                className={
                                  leave.status === "approved"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : leave.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : leave.status === "rejected"
                                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                }
                              >
                                {leave.status === "approved"
                                  ? "Approuvé"
                                  : leave.status === "pending"
                                  ? "En attente"
                                  : leave.status === "rejected"
                                  ? "Rejeté"
                                  : "Annulé"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Du {formatDate(leave.startDate)} au {formatDate(leave.endDate)}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Durée:</span> {leave.duration} jours
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              Demande créée le {formatDate(leave.createdAt)}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => navigate(`/leaves/${leave.id}`)}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Voir le détail
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}



================================================
FILE: src/pages/leaves/[id].tsx
================================================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeaveSlip } from "@/components/leaves/leave-slip";
import DashboardLayout from "@/components/layout/dashboard-layout";
import useLeaveStore, { LeaveRequest } from "@/store/useLeaveStore";
import useEmployeeStore, { Employee } from "@/store/useEmployeeStore";
import { toast } from "sonner";
import { CheckCircle, ChevronLeft, XCircle } from "lucide-react";

export default function LeaveDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLeaveById, updateLeaveStatus } = useLeaveStore();
  const { getEmployeeById } = useEmployeeStore();
  const [leave, setLeave] = useState<LeaveRequest | undefined>(undefined);
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);
  const [replacementEmployee, setReplacementEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const leaveData = getLeaveById(id);
      setLeave(leaveData);
      
      if (leaveData) {
        const emp = getEmployeeById(leaveData.employeeId);
        setEmployee(emp);
        
        if (leaveData.replacementColleagueId) {
          const replacement = getEmployeeById(leaveData.replacementColleagueId);
          setReplacementEmployee(replacement || null);
        }
      }
    }
    setLoading(false);
  }, [id, getLeaveById, getEmployeeById]);
  
  const handleStatusChange = (status: "approved" | "rejected") => {
    if (id) {
      updateLeaveStatus(id, status);
      setLeave((prev) => prev ? { ...prev, status } : undefined);
      
      if (status === "approved") {
        toast.success("Demande de congé approuvée");
      } else {
        toast.error("Demande de congé rejetée");
      }
    }
  };
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Chargement...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!leave || !employee) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <h3 className="text-xl font-semibold mb-2">Demande non trouvée</h3>
          <p className="text-muted-foreground mb-4">
            La demande de congé que vous recherchez n'existe pas.
          </p>
          <button
            onClick={() => navigate("/leaves")}
            className="text-primary hover:underline"
          >
            Retour à la liste des congés
          </button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Button
              variant="ghost"
              className="mb-2 -ml-2 md:mb-0"
              onClick={() => navigate("/leaves")}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">
              Demande de congé
            </h2>
            <p className="text-muted-foreground">
              Détails de la demande de {employee.name} {employee.surname}
            </p>
          </div>
          
          {leave.status === "pending" && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                onClick={() => handleStatusChange("approved")}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approuver
              </Button>
              <Button
                variant="outline"
                className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                onClick={() => handleStatusChange("rejected")}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Rejeter
              </Button>
            </div>
          )}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Bon de congé</CardTitle>
            <CardDescription>
              Document officiel d'autorisation de congé
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeaveSlip
              leave={leave}
              employee={employee}
              replacementEmployee={replacementEmployee}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}



================================================
FILE: src/pages/leaves/index.tsx
================================================

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, FileText, MoreHorizontal, XCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import useLeaveStore, { LeaveRequest, LeaveStatus } from "@/store/useLeaveStore";
import useEmployeeStore from "@/store/useEmployeeStore";
import { formatDate } from "@/utils/date-utils";
import { getLeaveTypeLabel } from "@/utils/leave-utils";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function LeavesPage() {
  const navigate = useNavigate();
  const { leaveRequests, updateLeaveStatus } = useLeaveStore();
  const { employees } = useEmployeeStore();
  const [statusFilter, setStatusFilter] = useState<LeaveStatus | "all">("all");
  
  // Create a lookup map for employees
  const employeesMap = useMemo(() => {
    return employees.reduce((acc, employee) => {
      acc[employee.id] = employee;
      return acc;
    }, {} as Record<string, typeof employees[0]>);
  }, [employees]);
  
  // Filter leaves by status
  const filteredLeaves = useMemo(() => {
    return statusFilter === "all"
      ? leaveRequests
      : leaveRequests.filter((leave) => leave.status === statusFilter);
  }, [leaveRequests, statusFilter]);
  
  // Sort leaves by creation date (newest first)
  const sortedLeaves = useMemo(() => {
    return [...filteredLeaves].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [filteredLeaves]);
  
  const handleStatusChange = (id: string, status: LeaveStatus) => {
    updateLeaveStatus(id, status);
    
    if (status === "approved") {
      toast.success("Demande de congé approuvée");
    } else if (status === "rejected") {
      toast.error("Demande de congé rejetée");
    }
  };
  
  const getStatusBadgeColor = (status: LeaveStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "cancelled":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };
  
  const getStatusLabel = (status: LeaveStatus) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "approved":
        return "Approuvé";
      case "rejected":
        return "Rejeté";
      case "cancelled":
        return "Annulé";
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestion des congés</h2>
            <p className="text-muted-foreground">
              Gérez les demandes de congés des employés
            </p>
          </div>
          
          <Button onClick={() => navigate("/leaves/new")}>Créer un congé</Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Demandes de congés</CardTitle>
                <CardDescription>
                  {statusFilter === "all"
                    ? "Toutes les demandes"
                    : `Demandes ${getStatusLabel(statusFilter).toLowerCase()}`}
                </CardDescription>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  Tous
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("pending")}
                >
                  En attente
                </Button>
                <Button
                  variant={statusFilter === "approved" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("approved")}
                >
                  Approuvés
                </Button>
                <Button
                  variant={statusFilter === "rejected" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("rejected")}
                >
                  Rejetés
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employé</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLeaves.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      Aucune demande de congé trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedLeaves.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell className="font-medium">
                        {employeesMap[leave.employeeId]?.name}{" "}
                        {employeesMap[leave.employeeId]?.surname}
                      </TableCell>
                      <TableCell>{getLeaveTypeLabel(leave.type)}</TableCell>
                      <TableCell>
                        {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                      </TableCell>
                      <TableCell>{leave.duration} jours</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn("font-normal", getStatusBadgeColor(leave.status))}
                        >
                          {getStatusLabel(leave.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => navigate(`/leaves/${leave.id}`)}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Voir les détails
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            {leave.status === "pending" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(leave.id, "approved")
                                  }
                                  className="text-green-600"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approuver
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(leave.id, "rejected")
                                  }
                                  className="text-red-600"
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Rejeter
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}



================================================
FILE: src/pages/leaves/new.tsx
================================================
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { LeaveForm, formSchema } from "@/components/leaves/leave-form"; // Import formSchema
import useEmployeeStore from "@/store/useEmployeeStore";
import useLeaveStore from "@/store/useLeaveStore";
import { toISODateString } from "@/utils/date-utils";
import { z } from "zod"; // Import z

export default function NewLeavePage() {
  const [searchParams] = useSearchParams();
  const employeeId = searchParams.get("employeeId");
  const { employees, getEmployeeById } = useEmployeeStore();
  const { addLeaveRequest } = useLeaveStore();
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(
    employeeId || undefined
  );

  useEffect(() => {
    if (employeeId) {
      const employee = getEmployeeById(employeeId);
      if (employee) {
        setSelectedEmployee(employeeId);
      }
    }
  }, [employeeId, getEmployeeById]);

  const handleSubmit = (
    values: z.infer<typeof formSchema> & { duration: number } // Use the correct type
  ) => {
    // Destructure all expected properties explicitly
    const {
      employeeId,
      type,
      startDate,
      endDate,
      returnDate,
      replacementColleagueId,
      duration,
    } = values;

    // Ensure returnDate is a non-null string for the store
    // calculateReturnDate should always provide a date, so returnDate should exist
    const isoReturnDate = returnDate
      ? toISODateString(returnDate)
      : toISODateString(calculateReturnDate(endDate)); // Fallback just in case

    // Ensure replacementColleagueId is string | null
    const finalReplacementId =
      replacementColleagueId === "_none" || !replacementColleagueId
        ? null
        : replacementColleagueId;

    addLeaveRequest({
      employeeId,
      type,
      startDate: toISODateString(startDate),
      endDate: toISODateString(endDate),
      returnDate: isoReturnDate, // Pass the guaranteed string
      duration,
      replacementColleagueId: finalReplacementId, // Pass string | null
      status: "pending",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Créer un congé</h2>
          <p className="text-muted-foreground">
            Enregistrer une nouvelle demande de congé
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Détails du congé</CardTitle>
            <CardDescription>
              Veuillez remplir le formulaire pour créer une nouvelle demande
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeaveForm
              employees={employees}
              preselectedEmployeeId={selectedEmployee}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// Helper function needed for fallback (copy from date-utils or import if possible)
// Assuming calculateReturnDate is available in scope or imported
import { addDays } from "date-fns";
const calculateReturnDate = (endDate: Date): Date => {
  let returnDate = addDays(endDate, 1);
  const dayOfWeek = returnDate.getDay();
  if (dayOfWeek === 6) {
    // Saturday
    returnDate = addDays(returnDate, 2);
  } else if (dayOfWeek === 0) {
    // Sunday
    returnDate = addDays(returnDate, 1);
  }
  return returnDate;
};



================================================
FILE: src/pages/requests/index.tsx
================================================

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { RequestsTable } from "@/components/requests/requests-table";
import { RequestFilters } from "@/components/requests/request-filters";
import { useState } from "react";
import { useRequestStore } from "@/store/useRequestStore";
import { Request } from "@/types/request";

export default function RequestsPage() {
  const { requests } = useRequestStore();
  const [filteredRequests, setFilteredRequests] = useState<Request[]>(requests);
  
  const handleFilter = (filters: Partial<Request>) => {
    const hasFilters = Object.values(filters).some(value => !!value);
    
    if (!hasFilters) {
      setFilteredRequests(requests);
      return;
    }
    
    const results = requests.filter(request => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return request[key as keyof Request] === value;
      });
    });
    
    setFilteredRequests(results);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Demandes</h2>
          <p className="text-muted-foreground">
            Gérez les demandes des employés
          </p>
        </div>

        <RequestFilters onFilter={handleFilter} />
        
        <Card>
          <CardHeader>
            <CardTitle>Liste des demandes</CardTitle>
            <CardDescription>
              {filteredRequests.length} demande(s) trouvée(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RequestsTable requests={filteredRequests} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}



================================================
FILE: src/store/useAuthStore.ts
================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (username, password) => {
        // Simple authentication for demo purposes
        if (username === 'admin' && password === 'admin') {
          set({ isAuthenticated: true, user: { username } });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'leave-auth-storage',
    }
  )
);

export default useAuthStore;



================================================
FILE: src/store/useEmployeeStore.ts
================================================
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Employee {
  id: string;
  name: string;
  surname: string;
  cin: string;
  ppr: string;
  grade: string;
  ladder: string;
  service: string;
  division: string;
  decisionNumber: string;
  decisionDate: string;
  address: string;
  leaveBalance: number;
}

interface EmployeeState {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, "id">) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  searchEmployees: (query: string) => Employee[];
  filterEmployees: (
    filters: Partial<Record<keyof Employee, string>>
  ) => Employee[];
  getEmployeeById: (id: string) => Employee | undefined;
  getEmployeeByCIN: (cin: string) => Employee | undefined;
  getEmployeeByPPR: (ppr: string) => Employee | undefined;
}

// Sample data
const sampleEmployees: Employee[] = [
  {
    id: "1",
    name: "Mohammed",
    surname: "El Alaoui",
    cin: "A123456",
    ppr: "PPR12345",
    grade: "Administrateur",
    ladder: "Échelle 11",
    service: "Ressources Humaines",
    division: "Administration",
    decisionNumber: "DC-2023-001",
    decisionDate: "2023-01-15",
    address: "123 Rue Hassan II, Rabat",
    leaveBalance: 22,
  },
  {
    id: "2",
    name: "Fatima",
    surname: "Benali",
    cin: "B789012",
    ppr: "PPR67890",
    grade: "Technicien",
    ladder: "Échelle 8",
    service: "Informatique",
    division: "Technique",
    decisionNumber: "DC-2023-042",
    decisionDate: "2023-02-20",
    address: "45 Avenue Mohammed V, Casablanca",
    leaveBalance: 22,
  },
  {
    id: "3",
    name: "Ahmed",
    surname: "Khadiri",
    cin: "C345678",
    ppr: "PPR24680",
    grade: "Ingénieur",
    ladder: "Échelle 10",
    service: "Développement",
    division: "Technique",
    decisionNumber: "DC-2023-078",
    decisionDate: "2023-03-10",
    address: "78 Boulevard Moulay Youssef, Marrakech",
    leaveBalance: 22,
  },
];

const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set, get) => ({
      employees: sampleEmployees,

      addEmployee: (employee) => {
        const newEmployee = {
          ...employee,
          id: crypto.randomUUID(),
          leaveBalance: 22, // Default annual leave balance
        };
        set((state) => ({
          employees: [...state.employees, newEmployee],
        }));
      },

      updateEmployee: (id, updatedEmployee) => {
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === id ? { ...emp, ...updatedEmployee } : emp
          ),
        }));
      },

      deleteEmployee: (id) => {
        set((state) => ({
          employees: state.employees.filter((emp) => emp.id !== id),
        }));
      },

      searchEmployees: (query) => {
        const { employees } = get();
        const searchTerms = query.toLowerCase().split(" ").filter(Boolean);

        return employees.filter((emp) => {
          return searchTerms.every(
            (term) =>
              emp.name.toLowerCase().includes(term) ||
              emp.surname.toLowerCase().includes(term) ||
              emp.cin.toLowerCase().includes(term) ||
              emp.ppr.toLowerCase().includes(term) ||
              emp.grade.toLowerCase().includes(term) ||
              emp.service.toLowerCase().includes(term) ||
              emp.division.toLowerCase().includes(term)
          );
        });
      },

      filterEmployees: (filters) => {
        const { employees } = get();

        // Only process non-empty filter values
        const activeFilters = Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== "")
        );

        // If no active filters, return all employees
        if (Object.keys(activeFilters).length === 0) {
          return employees;
        }

        return employees.filter((emp) => {
          return Object.entries(activeFilters).every(([key, value]) => {
            const employeeValue = emp[key as keyof Employee];

            if (employeeValue !== null && employeeValue !== undefined) {
              return (
                String(employeeValue).toLowerCase() === value.toLowerCase()
              );
            }

            return false;
          });
        });
      },

      getEmployeeById: (id) => {
        return get().employees.find((emp) => emp.id === id);
      },

      getEmployeeByCIN: (cin) => {
        return get().employees.find((emp) => emp.cin === cin);
      },

      getEmployeeByPPR: (ppr) => {
        return get().employees.find((emp) => emp.ppr === ppr);
      },
    }),
    {
      name: "leave-employee-storage",
    }
  )
);

export default useEmployeeStore;



================================================
FILE: src/store/useLeaveStore.ts
================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, differenceInCalendarDays, format } from 'date-fns';

export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type LeaveType = 'annual' | 'special' | 'sick' | 'maternity' | 'hajj' | 'marriage' | 'bereavement';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  returnDate: string;
  duration: number;
  replacementColleagueId: string | null;
  status: LeaveStatus;
  createdAt: string;
  updatedAt: string;
}

interface LeaveState {
  leaveRequests: LeaveRequest[];
  addLeaveRequest: (leave: Omit<LeaveRequest, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateLeaveStatus: (id: string, status: LeaveStatus) => void;
  getLeaveById: (id: string) => LeaveRequest | undefined;
  getLeavesByEmployeeId: (employeeId: string) => LeaveRequest[];
  getLeavesByStatus: (status: LeaveStatus) => LeaveRequest[];
  calculateLeaveDuration: (startDate: Date, endDate: Date) => number;
}

// Helper function to exclude weekends
const calculateLeaveDuration = (startDate: Date, endDate: Date): number => {
  let duration = 0;
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    // Skip Saturday (6) and Sunday (0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      duration++;
    }
    currentDate = addDays(currentDate, 1);
  }
  
  return duration;
};

// Sample data with realistic Moroccan context
const currentDate = new Date();
const sampleLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '1',
    type: 'annual',
    startDate: format(addDays(currentDate, -30), 'yyyy-MM-dd'),
    endDate: format(addDays(currentDate, -20), 'yyyy-MM-dd'),
    returnDate: format(addDays(currentDate, -19), 'yyyy-MM-dd'),
    duration: 7, // Excluding weekends
    replacementColleagueId: '2',
    status: 'approved',
    createdAt: format(addDays(currentDate, -40), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(addDays(currentDate, -35), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: '2',
    employeeId: '2',
    type: 'sick',
    startDate: format(addDays(currentDate, -15), 'yyyy-MM-dd'),
    endDate: format(addDays(currentDate, -10), 'yyyy-MM-dd'),
    returnDate: format(addDays(currentDate, -9), 'yyyy-MM-dd'),
    duration: 4, // Excluding weekends
    replacementColleagueId: '3',
    status: 'approved',
    createdAt: format(addDays(currentDate, -16), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(addDays(currentDate, -16), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: '3',
    employeeId: '3',
    type: 'annual',
    startDate: format(addDays(currentDate, 5), 'yyyy-MM-dd'),
    endDate: format(addDays(currentDate, 12), 'yyyy-MM-dd'),
    returnDate: format(addDays(currentDate, 13), 'yyyy-MM-dd'),
    duration: 6, // Excluding weekends
    replacementColleagueId: '1',
    status: 'pending',
    createdAt: format(addDays(currentDate, -2), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(addDays(currentDate, -2), 'yyyy-MM-dd HH:mm:ss'),
  },
  {
    id: '4',
    employeeId: '1',
    type: 'special',
    startDate: format(addDays(currentDate, -5), 'yyyy-MM-dd'),
    endDate: format(addDays(currentDate, -4), 'yyyy-MM-dd'),
    returnDate: format(addDays(currentDate, -3), 'yyyy-MM-dd'),
    duration: 2,
    replacementColleagueId: '2',
    status: 'approved',
    createdAt: format(addDays(currentDate, -7), 'yyyy-MM-dd HH:mm:ss'),
    updatedAt: format(addDays(currentDate, -6), 'yyyy-MM-dd HH:mm:ss'),
  },
];

const useLeaveStore = create<LeaveState>()(
  persist(
    (set, get) => ({
      leaveRequests: sampleLeaveRequests,
      
      addLeaveRequest: (leave) => {
        const id = crypto.randomUUID();
        const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        const newLeave = {
          ...leave,
          id,
          createdAt: now,
          updatedAt: now,
        };
        
        set((state) => ({
          leaveRequests: [...state.leaveRequests, newLeave],
        }));
        
        return id;
      },
      
      updateLeaveStatus: (id, status) => {
        const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        
        set((state) => ({
          leaveRequests: state.leaveRequests.map((leave) =>
            leave.id === id
              ? { ...leave, status, updatedAt: now }
              : leave
          ),
        }));
      },
      
      getLeaveById: (id) => {
        return get().leaveRequests.find((leave) => leave.id === id);
      },
      
      getLeavesByEmployeeId: (employeeId) => {
        return get().leaveRequests.filter((leave) => leave.employeeId === employeeId);
      },
      
      getLeavesByStatus: (status) => {
        return get().leaveRequests.filter((leave) => leave.status === status);
      },
      
      calculateLeaveDuration,
    }),
    {
      name: 'leave-requests-storage',
    }
  )
);

export default useLeaveStore;



================================================
FILE: src/store/useRequestStore.ts
================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Request, RequestStatus, RequestType } from '@/types/request';

interface RequestState {
  requests: Request[];
  addRequest: (request: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  getRequestById: (id: string) => Request | undefined;
}

// Sample data
const sampleRequests: Request[] = [
  {
    id: '1',
    employeeId: '1',
    type: 'document',
    title: 'Attestation de travail',
    description: 'Demande d\'attestation de travail pour la banque',
    status: 'pending',
    createdAt: '2024-04-15 10:00:00',
    updatedAt: '2024-04-15 10:00:00',
  },
  {
    id: '2',
    employeeId: '2',
    type: 'authorization',
    title: 'Autorisation de sortie',
    description: 'Demande d\'autorisation de sortie pour rendez-vous médical',
    status: 'approved',
    createdAt: '2024-04-14 15:30:00',
    updatedAt: '2024-04-14 16:00:00',
  },
];

export const useRequestStore = create<RequestState>()(
  persist(
    (set, get) => ({
      requests: sampleRequests,
      
      addRequest: (request) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const newRequest = {
          ...request,
          id,
          createdAt: now,
          updatedAt: now,
        };
        
        set((state) => ({
          requests: [...state.requests, newRequest],
        }));
        
        return id;
      },
      
      updateRequestStatus: (id, status) => {
        set((state) => ({
          requests: state.requests.map((request) =>
            request.id === id
              ? { ...request, status, updatedAt: new Date().toISOString() }
              : request
          ),
        }));
      },
      
      getRequestById: (id) => {
        return get().requests.find((request) => request.id === id);
      },
    }),
    {
      name: 'requests-storage',
    }
  )
);

export default useRequestStore;



================================================
FILE: src/store/useSettingsStore.ts
================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
      notificationsEnabled: true,
      toggleNotifications: () =>
        set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
    }),
    {
      name: 'leave-settings-storage',
    }
  )
);

export default useSettingsStore;



================================================
FILE: src/types/request.ts
================================================

export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type RequestType = 'document' | 'authorization' | 'other';

export interface Request {
  id: string;
  employeeId: string;
  type: RequestType;
  title: string;
  description: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}



================================================
FILE: src/utils/date-utils.ts
================================================

import { addDays, format, isWeekend, parse } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'dd/MM/yyyy');
};

export const formatDateLong = (date: string | Date): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'dd MMMM yyyy', { locale: fr });
};

export const parseISODate = (date: string): Date => {
  if (!date) return new Date();
  return parse(date, 'yyyy-MM-dd', new Date());
};

// Calculate leave duration excluding weekends
export const calculateBusinessDays = (startDate: Date, endDate: Date): number => {
  let count = 0;
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    // Skip Saturday (6) and Sunday (0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++;
    }
    currentDate = addDays(currentDate, 1);
  }
  
  return count;
};

// Calculate the return date (end date + 1 business day)
export const calculateReturnDate = (endDate: Date): Date => {
  let returnDate = addDays(endDate, 1);
  
  // If return date is a weekend, move to Monday
  while (isWeekend(returnDate)) {
    returnDate = addDays(returnDate, 1);
  }
  
  return returnDate;
};

// Get the month name in French
export const getMonthName = (month: number): string => {
  const date = new Date();
  date.setMonth(month);
  return format(date, 'MMMM', { locale: fr });
};

// Convert a date to yyyy-MM-dd format
export const toISODateString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};



================================================
FILE: src/utils/export-utils.ts
================================================
import * as XLSX from "xlsx";
import { Employee } from "@/store/useEmployeeStore";

// Define a mapping for keys to user-friendly labels
const employeeKeyLabels: Record<keyof Employee, string> = {
  id: "ID Technique", // Keep internal ID mapping even if not default export
  name: "Prénom",
  surname: "Nom",
  cin: "CIN",
  ppr: "PPR",
  grade: "Grade",
  ladder: "Échelle",
  service: "Service",
  division: "Division",
  decisionNumber: "N° Décision",
  decisionDate: "Date Décision",
  address: "Adresse",
  leaveBalance: "Solde Congé",
};

// Helper function to get ordered keys and labels
const getExportHeadersAndKeys = (
  selectedKeys?: (keyof Employee)[]
): { headers: string[]; keys: (keyof Employee)[] } => {
  const defaultKeys: (keyof Employee)[] = [
    "name",
    "surname",
    "cin",
    "ppr",
    "grade",
    "ladder",
    "service",
    "division",
    "decisionNumber",
    "decisionDate",
    "address",
    "leaveBalance",
  ];

  const keysToUse =
    selectedKeys && selectedKeys.length > 0 ? selectedKeys : defaultKeys;
  const headers = keysToUse.map((key) => employeeKeyLabels[key] || key); // Fallback to key name if label missing

  return { headers, keys: keysToUse };
};

export const exportToExcel = (
  employees: Employee[], // Accept the full Employee array
  filename: string = "employees",
  selectedKeys?: (keyof Employee)[]
) => {
  const { headers, keys } = getExportHeadersAndKeys(selectedKeys);

  // Filter and map data based on selected keys
  const dataForSheet = employees.map((emp) => {
    const row: Record<string, unknown> = {};
    keys.forEach((key) => {
      row[employeeKeyLabels[key] || key] = emp[key]; // Use label as the key in the row object
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(dataForSheet, { header: headers });

  // Optional: Adjust column widths (example)
  // const colWidths = headers.map(header => ({ wch: Math.max(header.length, 15) })); // Adjust width as needed
  // worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Employés");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToCSV = (
  employees: Employee[], // Accept the full Employee array
  filename: string = "employees",
  selectedKeys?: (keyof Employee)[]
) => {
  const { headers, keys } = getExportHeadersAndKeys(selectedKeys);

  const csvContent = [
    headers.join(","), // Header row
    ...employees.map(
      // Map over the original employees array
      (
        emp // Data rows
      ) =>
        keys
          .map((key) => {
            const value = emp[key]; // Get value from the original employee object
            // Handle potential commas in values by enclosing in double quotes
            const formattedValue =
              typeof value === "string" && value.includes(",")
                ? `"${value}"`
                : value;
            return formattedValue ?? ""; // Use empty string for null/undefined
          })
          .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};



================================================
FILE: src/utils/filterEmployees.ts
================================================
import { Employee } from "@/store/useEmployeeStore";

export function filterEmployeesList(
  employees: Employee[],
  filters: Partial<Record<keyof Employee, string>>
): Employee[] {
  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== "")
  );

  if (Object.keys(activeFilters).length === 0) {
    return employees;
  }

  return employees.filter((emp) => {
    return Object.entries(activeFilters).every(([key, value]) => {
      const employeeValue = emp[key as keyof Employee];
      if (employeeValue !== null && employeeValue !== undefined) {
        return String(employeeValue).toLowerCase() === value.toLowerCase();
      }
      return false;
    });
  });
}



================================================
FILE: src/utils/leave-utils.ts
================================================

import { LeaveType } from '../store/useLeaveStore';

// Map for leave type translation
export const leaveTypeMap: Record<LeaveType, string> = {
  annual: 'Congé annuel',
  special: 'Permission Spéciale',
  sick: 'Congé de Maladie',
  maternity: 'Congé de Maternité',
  hajj: 'Congé du pèlerinage',
  marriage: 'Congé de Marriage',
  bereavement: 'Décès d\'un proche',
};

// Get leave type label
export const getLeaveTypeLabel = (type: LeaveType): string => {
  return leaveTypeMap[type] || type;
};

// Get leave types as options for select inputs
export const getLeaveTypeOptions = (): { value: LeaveType; label: string }[] => {
  return Object.entries(leaveTypeMap).map(([value, label]) => ({
    value: value as LeaveType,
    label,
  }));
};

// Calculate how much leave an employee has taken in a year
export const calculateLeaveTaken = (
  leaveHistory: { duration: number; type: LeaveType }[],
  leaveType: LeaveType = 'annual'
): number => {
  return leaveHistory
    .filter((leave) => leave.type === leaveType)
    .reduce((total, leave) => total + leave.duration, 0);
};

// Calculate remaining leave balance
export const calculateRemainingLeave = (
  totalAllowance: number,
  leaveHistory: { duration: number; type: LeaveType }[]
): number => {
  const leaveTaken = calculateLeaveTaken(leaveHistory);
  return Math.max(0, totalAllowance - leaveTaken);
};


