'use client';

import React, { useState } from 'react';
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { LeaveStatus } from "@/app/generated/prisma";

// Function to handle leave approval
async function updateLeaveStatus(id: string, status: LeaveStatus): Promise<boolean> {
  try {
    // Make API call to update leave status
    const response = await fetch(`/api/leaves/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    
    return response.ok;
  } catch (error) {
    console.error("Error updating leave status:", error);
    return false;
  }
}

interface ApproveLeaveButtonProps {
  leaveId: string;
  employeeName: string;
}

export default function ApproveLeaveButton({ leaveId, employeeName }: ApproveLeaveButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleApprove = async () => {
    setIsLoading(true);
    try {
      // Call API to update leave status
      const success = await updateLeaveStatus(leaveId, "APPROVED" as LeaveStatus);
      
      if (success) {
        // Refresh the page to show updated data
        window.location.reload();
      } else {
        console.error("Failed to approve leave");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error approving leave:", error);
      setIsLoading(false);
    }
  };
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost" className="text-green-600" title="Approuver">
          <Check className="h-4 w-4" />
          <span className="sr-only">Approuver</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approuver la demande de congé</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir approuver la demande de congé de{" "}
            <span className="font-medium">{employeeName}</span> ?
            Cette action ne peut pas être annulée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleApprove();
            }}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Spinner size="sm" className="mr-2" />
                <span>Traitement...</span>
              </div>
            ) : (
              "Approuver"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 