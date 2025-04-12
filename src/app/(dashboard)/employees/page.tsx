"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEmployeeStore } from "@/stores/employee.store";
import { Employee } from "@/types/employee-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/ui/confirm-delete-dialog";

// Zod schema for employee form validation
const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  cin: z.string().min(1, "CIN is required"),
  ppr: z.string().min(1, "PPR is required"),
  grade: z.string().optional(),
  ladder: z.string().optional(),
  service: z.string().optional(),
  division: z.string().optional(),
  address: z.string().optional(),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

export default function EmployeesPage() {
  const {
    employees,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
    filterEmployees,
    isLoading,
    error,
  } = useEmployeeStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Search handler
  useEffect(() => {
    if (searchTerm) {
      searchEmployees(searchTerm);
    } else {
      fetchEmployees();
    }
  }, [searchTerm, searchEmployees, fetchEmployees]);

  // Form setup
  const addForm = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      cin: "",
      ppr: "",
      grade: "",
      ladder: "",
      service: "",
      division: "",
      address: "",
    },
  });

  const editForm = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      cin: "",
      ppr: "",
      grade: "",
      ladder: "",
      service: "",
      division: "",
      address: "",
    },
  });

  // Add employee handler
  const onAddSubmit = async (data: EmployeeFormData) => {
    try {
      // await addEmployee(data);
      toast.success("Employee added successfully");
      setIsAddOpen(false);
      addForm.reset();
      fetchEmployees();
    } catch (err) {
      toast.error("Failed to add employee");
    }
  };

  // Edit employee handler
  const onEditSubmit = async (data: EmployeeFormData) => {
    if (!selectedEmployee) return;
    try {
      await updateEmployee(selectedEmployee.id, data);
      toast.success("Employee updated successfully");
      setIsEditOpen(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (err) {
      toast.error("Failed to update employee");
    }
  };

  // Delete employee handler
  const handleDelete = async () => {
    if (!employeeToDelete) return;
    try {
      await deleteEmployee(employeeToDelete);
      toast.success("Employee deleted successfully");
      fetchEmployees();
      setEmployeeToDelete(null);
    } catch (err) {
      toast.error("Failed to delete employee");
    }
  };

  // Open delete confirmation
  const openDeleteDialog = (id: string) => {
    setEmployeeToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Open edit dialog with pre-filled data
  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    editForm.reset({
      firstName: employee.firstName,
      lastName: employee.lastName,
      cin: employee.cin,
      ppr: employee.ppr,
      grade: employee.grade || "",
      ladder: employee.ladder || "",
      service: employee.service || "",
      division: employee.division || "",
      address: employee.address || "",
    });
    setIsEditOpen(true);
  };

  if (isLoading) return <div>Loading employees...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>Add Employee</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <Form {...addForm}>
              <form
                onSubmit={addForm.handleSubmit(onAddSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={addForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="cin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CIN</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="ppr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PPR</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Add Employee</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>CIN</TableHead>
            <TableHead>PPR</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Division</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
              <TableCell>{employee.cin}</TableCell>
              <TableCell>{employee.ppr}</TableCell>
              <TableCell>{employee.grade || "-"}</TableCell>
              <TableCell>{employee.division || "-"}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditDialog(employee)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openDeleteDialog(employee.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(onEditSubmit)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="cin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CIN</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="ppr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PPR</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update Employee</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this employee? This action cannot be undone."
      />
    </div>
  );
}
