"use client";

import { useState, useEffect } from "react";
import { useLeaveStore, useEmployeeStore } from "@/stores";
import { LeaveRequest, LeaveStatus } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { LeaveForm } from "@/components/forms/LeaveForm";
import { LeaveStatusBadge } from "@/components/leave/LeaveStatusBadge";
import { formatDate } from "@/utils/date-utils";
import { toast } from "sonner";
import router from "next/router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LeavesPage() {
  const {
    leaveRequests,
    fetchLeaveRequests,
    createLeaveRequest,
    updateLeaveStatus,
    deleteLeaveRequest,
    isLoading,
    error,
  } = useLeaveStore();
  const { employees, fetchEmployees } = useEmployeeStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLeaveRequests();
    fetchEmployees();
  }, [fetchLeaveRequests, fetchEmployees]);

  const filteredRequests = leaveRequests.filter((request) => {
    if (filterStatus !== "all" && request.status !== filterStatus) {
      return false;
    }

    if (searchTerm) {
      const employee = employees.find((e) => e.id === request.employeeId);
      const employeeName = employee
        ? `${employee.firstName} ${employee.lastName}`.toLowerCase()
        : "";
      const searchLower = searchTerm.toLowerCase();
      return (
        employeeName.includes(searchLower) ||
        request.leaveType.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const handleCreate = async (data: {
    employeeId: string;
    leaveType: LeaveRequest["leaveType"];
    startDate: string;
    endDate: string;
    reason?: string;
    notes?: string;
    replacementId?: string;
  }) => {
    try {
      await createLeaveRequest({
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      });
    } catch (error) {
      throw error; // Handled by LeaveForm
    }
  };

  const handleStatusChange = async (
    id: string,
    status: LeaveStatus,
    approvedBy = "Admin"
  ) => {
    try {
      await updateLeaveStatus(
        id,
        status,
        status === "APPROVED" ? approvedBy : undefined
      );
      toast("Success", {
        description: "Leave request " + status.toLowerCase(),
        action: {
          label: "View",
          onClick: () => {
            router.push(`/leaves/${id}`);
          },
        },
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to update leave status",
        action: {
          label: "View",
          onClick: () => {
            router.push(`/leaves/${id}`);
          },
        },
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLeaveRequest(id);
      toast("Success", {
        description: "Leave request deleted",
        action: {
          label: "View",
          onClick: () => {
            router.push("/leaves");
          },
        },
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to delete leave request",
        action: {
          label: "View",
          onClick: () => {
            router.push("/leaves");
          },
        },
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leave Requests</h1>
        <p className="text-muted-foreground mt-1">
          Manage employee leave requests
        </p>
      </div>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Create and manage leave requests</CardDescription>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Leave
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by employee or type..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading && <p>Loading...</p>}
          {error && <p className="text-destructive">{error}</p>}
          {!isLoading && !error && (
            <div className="overflow-x-auto rounded-md border">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px] sm:w-[200px]">
                      Employee
                    </TableHead>
                    <TableHead className="w-[120px] sm:w-[150px]">
                      Type
                    </TableHead>
                    <TableHead className="w-[150px] sm:w-[200px]">
                      Dates
                    </TableHead>
                    <TableHead className="w-[80px] sm:w-[100px]">
                      Duration
                    </TableHead>
                    <TableHead className="w-[100px] sm:w-[120px]">
                      Status
                    </TableHead>
                    <TableHead className="w-[120px] sm:w-[150px] hidden md:table-cell">
                      Reason
                    </TableHead>
                    <TableHead className="w-[150px] sm:w-[200px] hidden lg:table-cell">
                      Replacement
                    </TableHead>
                    <TableHead className="w-[100px] sm:w-[120px]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No leave requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => {
                      const employee = employees.find(
                        (e) => e.id === request.employeeId
                      );
                      const replacement = employees.find(
                        (e) => e.id === request.replacementId
                      );
                      return (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium truncate">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  {employee
                                    ? `${employee.firstName} ${employee.lastName}`
                                    : "Unknown"}
                                </TooltipTrigger>
                                <TooltipContent>
                                  {employee
                                    ? `${employee.firstName} ${employee.lastName}`
                                    : "Unknown"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell className="truncate">
                            {request.leaveType.replace("_", " ")}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>From: {formatDate(request.startDate)}</span>
                              <span>To: {formatDate(request.endDate)}</span>
                            </div>
                          </TableCell>
                          <TableCell>{request.duration} days</TableCell>
                          <TableCell>
                            <LeaveStatusBadge status={request.status} />
                          </TableCell>
                          <TableCell className="truncate hidden md:table-cell">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  {request.reason || "-"}
                                </TooltipTrigger>
                                <TooltipContent>
                                  {request.reason || "-"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell className="truncate hidden lg:table-cell">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  {replacement
                                    ? `${replacement.firstName} ${replacement.lastName}`
                                    : "-"}
                                </TooltipTrigger>
                                <TooltipContent>
                                  {replacement
                                    ? `${replacement.firstName} ${replacement.lastName}`
                                    : "-"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                {request.status === "PENDING" && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleStatusChange(
                                          request.id,
                                          "APPROVED"
                                        )
                                      }
                                    >
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleStatusChange(
                                          request.id,
                                          "REJECTED"
                                        )
                                      }
                                    >
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(request.id, "CANCELLED")
                                  }
                                >
                                  Cancel
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(request.id)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <LeaveForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
      />
    </div>
  );
}
