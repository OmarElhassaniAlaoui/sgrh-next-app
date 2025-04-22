import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Edit, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LeaveStatus, LeaveType } from "@/app/generated/prisma";
import { formatDate } from "@/utils/date-utils";
import { getLeaveTypeLabel } from "@/utils/leave-form-utils";
import { FormLeaveType } from "@/utils/leave-form-utils";
import { LeaveSlip } from "@/components/leaves/leave-slip";
import ApproveLeaveButton from "@/components/leaves/approve-leave-button";
import RejectLeaveButton from "@/components/leaves/reject-leave-button";
import { LeaveService } from "@/services/leave";

// Function to get badge variant based on leave status
function getStatusBadgeVariant(status: string): "default" | "destructive" | "outline" | "secondary" {
  switch (status) {
    case "APPROVED":
      return "default"; // Using default for success since it's not in the type
    case "REJECTED":
      return "destructive";
    case "CANCELLED":
      return "outline";
    default:
      return "secondary";
  }
}

// Define detailed types for our data
interface EmployeeData {
  id: string;
  firstName: string;
  lastName: string;
  cin: string;
  [key: string]: any;
}

interface DetailedLeaveRequest {
  id: string;
  employeeId: string;
  employee: EmployeeData;
  replacementEmployee: EmployeeData | null;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  duration: number;
  status: LeaveStatus;
  replacementId: string | null;
  reason?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  approvedById?: string | null;
  approvedBy?: string | null;
  approvedAt?: Date | null;
}

// Data fetching function from database
async function getLeaveRequest(id: string): Promise<DetailedLeaveRequest | null> {
  try {
    return await LeaveService.getLeaveRequestById(id) as DetailedLeaveRequest;
  } catch (error) {
    console.error(`Error fetching leave request with ID ${id}:`, error);
    return null;
  }
}

export default async function LeaveDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const leave = await getLeaveRequest(params.id);
  
  if (!leave) {
    notFound();
  }
  
  const { employee, replacementEmployee } = leave;
  
  // Convert database model to component props format
  const leaveForSlip = {
    id: leave.id,
    employeeId: leave.employeeId,
    type: leave.leaveType.toLowerCase() as FormLeaveType,
    startDate: leave.startDate,
    endDate: leave.endDate,
    returnDate: new Date(new Date(leave.endDate).setDate(new Date(leave.endDate).getDate() + 1)),
    duration: leave.duration,
    replacementColleagueId: leave.replacementId,
    status: leave.status,
    createdAt: leave.createdAt,
    updatedAt: leave.updatedAt,
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/leaves">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Détail du congé</h1>
        </div>
        
        <div className="flex gap-2">
          {leave.status === "PENDING" && (
            <>
              <ApproveLeaveButton
                leaveId={leave.id}
                employeeName={`${employee.firstName} ${employee.lastName}`}
              />
              <RejectLeaveButton
                leaveId={leave.id}
                employeeName={`${employee.firstName} ${employee.lastName}`}
              />
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Informations du congé</CardTitle>
                <Badge variant={getStatusBadgeVariant(leave.status)}>
                  {leave.status === "PENDING"
                    ? "En attente"
                    : leave.status === "APPROVED"
                    ? "Approuvé"
                    : leave.status === "REJECTED"
                    ? "Rejeté"
                    : "Annulé"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Employé</p>
                  <p className="text-muted-foreground">
                    {employee.firstName} {employee.lastName}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Type de congé</p>
                  <p className="text-muted-foreground">
                    {getLeaveTypeLabel(leave.leaveType.toLowerCase() as FormLeaveType)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Période</p>
                  <p className="text-muted-foreground">
                    Du {formatDate(leave.startDate)} au {formatDate(leave.endDate)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Retour prévu le {formatDate(leaveForSlip.returnDate)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Durée</p>
                  <p className="text-muted-foreground">{leave.duration} jours</p>
                </div>
              </div>
              
              {replacementEmployee && (
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Remplaçant</p>
                    <p className="text-muted-foreground">
                      {replacementEmployee.firstName} {replacementEmployee.lastName}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Historique</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Demande créée</p>
                  <p className="text-muted-foreground">
                    {formatDate(leave.createdAt, true)}
                  </p>
                </div>
              </div>
              
              {leave.status === "APPROVED" && (
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Demande approuvée</p>
                    <p className="text-muted-foreground">
                      {formatDate(leave.approvedAt || leave.updatedAt, true)}
                      {leave.approvedBy && <span className="block text-sm">par {leave.approvedBy}</span>}
                    </p>
                  </div>
                </div>
              )}
              
              {leave.status === "REJECTED" && (
                <div className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Demande rejetée</p>
                    <p className="text-muted-foreground">
                      {formatDate(leave.updatedAt, true)}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <LeaveSlip
            leave={leaveForSlip}
            employee={{
              id: employee.id,
              name: employee.firstName,
              surname: employee.lastName,
              cin: employee.cin
            }}
            replacementEmployee={replacementEmployee ? {
              id: replacementEmployee.id,
              name: replacementEmployee.firstName,
              surname: replacementEmployee.lastName,
              cin: replacementEmployee.cin
            } : null}
          />
        </div>
      </div>
    </div>
  );
} 