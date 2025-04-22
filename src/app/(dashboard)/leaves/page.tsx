import React from "react";
import Link from "next/link";
import { Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/date-utils";
import { getLeaveTypeLabel } from "@/utils/leave-form-utils";
import { LeaveRequest, LeaveStatus, LeaveType } from "@/app/generated/prisma";
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

// Define a type for our enhanced leave request with employeeName
interface EnhancedLeaveRequest extends LeaveRequest {
  employeeName: string;
  returnDate: Date;
}

// Define a type for the database leave request with employee information
interface DatabaseLeaveRequest extends LeaveRequest {
  employee: {
    firstName: string;
    lastName: string;
  };
}

// Fetch leave requests from the database using LeaveService
async function getLeaveRequests(): Promise<EnhancedLeaveRequest[]> {
  try {
    // Fetch all leave requests with employee information
    const leaveRequests = await LeaveService.getAllLeaveRequests();
    
    // Transform the data to include employeeName for easier display
    return leaveRequests.map((leave: DatabaseLeaveRequest) => ({
      ...leave,
      employeeName: `${leave.employee.firstName} ${leave.employee.lastName}`,
      // Calculate returnDate (day after endDate)
      returnDate: new Date(new Date(leave.endDate).setDate(new Date(leave.endDate).getDate() + 1))
    }));
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    return [];
  }
}

export default async function LeavesPage() {
  // Fetch leave requests
  const leaveRequests = await getLeaveRequests();
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des congés</h1>
          <p className="text-muted-foreground">
            Consultez et gérez les demandes de congés du personnel.
          </p>
        </div>
        <Link href="/leaves/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau congé
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">En attente</CardTitle>
            <CardDescription>
              Demandes nécessitant une validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {leaveRequests.filter((l: EnhancedLeaveRequest) => l.status === "PENDING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Approuvées</CardTitle>
            <CardDescription>Demandes validées ce mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {leaveRequests.filter((l: EnhancedLeaveRequest) => l.status === "APPROVED").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Congés en cours
            </CardTitle>
            <CardDescription>Employés actuellement en congé</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {
                leaveRequests.filter(
                  (l: EnhancedLeaveRequest) =>
                    l.status === "APPROVED" &&
                    l.startDate <= new Date() &&
                    l.endDate >= new Date()
                ).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Demandes de congés</CardTitle>
          <CardDescription>
            Liste de toutes les demandes de congés
          </CardDescription>
        </CardHeader>
        <CardContent>
          {leaveRequests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employé</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date de début</TableHead>
                  <TableHead>Date de fin</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((leave: EnhancedLeaveRequest) => (
                  <TableRow key={leave.id}>
                    <TableCell className="font-medium">
                      {leave.employeeName}
                    </TableCell>
                    <TableCell>
                      {getLeaveTypeLabel(leave.leaveType.toLowerCase() as any)}
                    </TableCell>
                    <TableCell>{formatDate(leave.startDate)}</TableCell>
                    <TableCell>{formatDate(leave.endDate)}</TableCell>
                    <TableCell>{leave.duration} jours</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(leave.status)}>
                        {leave.status === "PENDING"
                          ? "En attente"
                          : leave.status === "APPROVED"
                          ? "Approuvé"
                          : leave.status === "REJECTED"
                          ? "Rejeté"
                          : "Annulé"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {/* View Details Button */}
                        <Link href={`/leaves/${leave.id}`}>
                          <Button size="icon" variant="ghost" title="Voir les détails">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Détails</span>
                          </Button>
                        </Link>
                        
                        {/* Only show approve/reject buttons for pending leave requests */}
                        {leave.status === "PENDING" && (
                          <>
                            <ApproveLeaveButton 
                              leaveId={leave.id} 
                              employeeName={leave.employeeName} 
                            />
                            
                            <RejectLeaveButton 
                              leaveId={leave.id} 
                              employeeName={leave.employeeName} 
                            />
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">
                Aucune demande de congé trouvée.
              </p>
              <Link href="/leaves/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Créer une demande
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
