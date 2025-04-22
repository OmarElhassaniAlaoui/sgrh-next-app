'use client';

import React, { useState } from 'react';
import { X } from "lucide-react";
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

// Function to handle leave rejection
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

interface RejectLeaveButtonProps {
  leaveId: string;
  employeeName: string;
}

export default function RejectLeaveButton({ leaveId, employeeName }: RejectLeaveButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleReject = async () => {
    setIsLoading(true);
    try {
      // Call API to update leave status
      const success = await updateLeaveStatus(leaveId, "REJECTED" as LeaveStatus);
      
      if (success) {
        // Refresh the page to show updated data
        window.location.reload();
      } else {
        console.error("Failed to reject leave");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error rejecting leave:", error);
      setIsLoading(false);
    }
  };
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost" className="text-red-600" title="Rejeter">
          <X className="h-4 w-4" />
          <span className="sr-only">Rejeter</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rejeter la demande de congé</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir rejeter la demande de congé de{" "}
            <span className="font-medium">{employeeName}</span> ?
            Cette action ne peut pas être annulée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleReject();
            }}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Spinner size="sm" className="mr-2" />
                <span>Traitement...</span>
              </div>
            ) : (
              "Rejeter"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 