"use client";
import React, { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from "lucide-react";
import { useEmployeeStore } from "@/stores/employee.store";
import { Employee } from "@prisma/client";

const Employees = () => {
  const {
    employees,
    isLoading,
    error,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
    filterEmployees,
  } = useEmployeeStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const [newEmployee, setNewEmployee] = useState<
    Omit<Employee, "id" | "createdAt" | "updatedAt">
  >({
    firstName: "",
    lastName: "",
    cin: "",
    ppr: "",
    grade: "",
    ladder: "",
    division: "",
    service: "",
    decisionNumber: null,
    decisionDate: null,
    address: null,
  });

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    searchEmployees(term);
  };

  const handleAddEmployee = async () => {
    try {
      await addEmployee(newEmployee);
      setNewEmployee({
        firstName: "",
        lastName: "",
        cin: "",
        ppr: "",
        grade: "",
        ladder: "",
        division: "",
        service: "",
        decisionNumber: null,
        decisionDate: null,
        address: null,
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  const handleUpdateEmployee = async () => {
    if (selectedEmployee) {
      try {
        await updateEmployee(selectedEmployee.id, {
          firstName: selectedEmployee.firstName,
          lastName: selectedEmployee.lastName,
          cin: selectedEmployee.cin,
          ppr: selectedEmployee.ppr,
          grade: selectedEmployee.grade,
          ladder: selectedEmployee.ladder,
          division: selectedEmployee.division,
          service: selectedEmployee.service,
          decisionNumber: selectedEmployee.decisionNumber,
          decisionDate: selectedEmployee.decisionDate,
          address: selectedEmployee.address,
        });
        setIsEditDialogOpen(false);
      } catch (error) {
        console.error("Failed to update employee:", error);
      }
    }
  };

  const handleDeleteEmployee = async () => {
    if (selectedEmployee) {
      try {
        await deleteEmployee(selectedEmployee.id);
        setIsDeleteDialogOpen(false);
      } catch (error) {
        console.error("Failed to delete employee:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Employees</h1>
        <p className="text-muted-foreground mt-1">Manage employee records</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Employee List</CardTitle>
            <CardDescription>View and manage all employees</CardDescription>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Enter the details of the new employee
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={newEmployee.firstName}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={newEmployee.lastName}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cin">CIN</Label>
                  <Input
                    id="cin"
                    value={newEmployee.cin}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, cin: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ppr">PPR</Label>
                  <Input
                    id="ppr"
                    value={newEmployee.ppr}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, ppr: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Input
                    id="grade"
                    value={newEmployee.grade}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, grade: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ladder">Ladder</Label>
                  <Input
                    id="ladder"
                    value={newEmployee.ladder}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, ladder: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="division">Division</Label>
                  <Input
                    id="division"
                    value={newEmployee.division}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        division: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service</Label>
                  <Input
                    id="service"
                    value={newEmployee.service}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        service: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="decisionNumber">Decision Number</Label>
                  <Input
                    id="decisionNumber"
                    value={newEmployee.decisionNumber || ""}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        decisionNumber: e.target.value || null,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="decisionDate">Decision Date</Label>
                  <Input
                    id="decisionDate"
                    type="date"
                    value={
                      newEmployee.decisionDate?.toISOString().split("T")[0] ||
                      ""
                    }
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        decisionDate: e.target.value
                          ? new Date(e.target.value)
                          : null,
                      })
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newEmployee.address || ""}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        address: e.target.value || null,
                      })
                    }
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddEmployee} disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Employee"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, CIN or PPR..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Select
              onValueChange={(value) =>
                filterEmployees({
                  division: value === "all" ? undefined : value,
                })
              }
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Division" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Divisions</SelectItem>
                <SelectItem value="IT">IT Division</SelectItem>
                <SelectItem value="HR">HR Division</SelectItem>
                <SelectItem value="Finance">Finance Division</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <div className="mb-4 text-red-500">{error}</div>}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>CIN</TableHead>
                  <TableHead>PPR</TableHead>
                  <TableHead>Division</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : employees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No employees found
                    </TableCell>
                  </TableRow>
                ) : (
                  employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        {employee.firstName} {employee.lastName}
                      </TableCell>
                      <TableCell>{employee.cin}</TableCell>
                      <TableCell>{employee.ppr}</TableCell>
                      <TableCell>{employee.division}</TableCell>
                      <TableCell>{employee.grade}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Update employee details</DialogDescription>
          </DialogHeader>

          {selectedEmployee && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-firstName">First Name</Label>
                <Input
                  id="edit-firstName"
                  value={selectedEmployee.firstName}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-lastName">Last Name</Label>
                <Input
                  id="edit-lastName"
                  value={selectedEmployee.lastName}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-cin">CIN</Label>
                <Input
                  id="edit-cin"
                  value={selectedEmployee.cin}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      cin: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-ppr">PPR</Label>
                <Input
                  id="edit-ppr"
                  value={selectedEmployee.ppr}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      ppr: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-grade">Grade</Label>
                <Input
                  id="edit-grade"
                  value={selectedEmployee.grade}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      grade: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-ladder">Ladder</Label>
                <Input
                  id="edit-ladder"
                  value={selectedEmployee.ladder}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      ladder: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-division">Division</Label>
                <Input
                  id="edit-division"
                  value={selectedEmployee.division}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      division: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-service">Service</Label>
                <Input
                  id="edit-service"
                  value={selectedEmployee.service}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      service: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-decisionNumber">Decision Number</Label>
                <Input
                  id="edit-decisionNumber"
                  value={selectedEmployee.decisionNumber || ""}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      decisionNumber: e.target.value || null,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-decisionDate">Decision Date</Label>
                <Input
                  id="edit-decisionDate"
                  type="date"
                  value={
                    selectedEmployee.decisionDate
                      ?.toISOString()
                      .split("T")[0] || ""
                  }
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      decisionDate: e.target.value
                        ? new Date(e.target.value)
                        : null,
                    })
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={selectedEmployee.address || ""}
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      address: e.target.value || null,
                    })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateEmployee} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedEmployee?.firstName}{" "}
              {selectedEmployee?.lastName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteEmployee}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
