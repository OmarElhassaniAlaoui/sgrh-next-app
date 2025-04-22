import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Define all possible leave status values
export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
const VALID_STATUSES: LeaveStatus[] = ["PENDING", "APPROVED", "REJECTED", "CANCELLED"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { status } = await request.json();
    
    // Validation
    if (!id) {
      return NextResponse.json(
        { error: "Missing leave request ID" },
        { status: 400 }
      );
    }
    
    if (!status || !VALID_STATUSES.includes(status as LeaveStatus)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }
    
    // Update leave request in database
    const updatedLeave = await prisma.leaveRequest.update({
      where: { id },
      data: { 
        status: status,
        // If approved, set approvalDate and approver info
        ...(status === "APPROVED" && {
          approvedAt: new Date(),
          // In a real app, you'd get this from the session
          // approvedById: session.user.id,
          // approvedBy: "Admin User", // This would come from session
        }),
      },
    });
    
    return NextResponse.json(updatedLeave);
  } catch (error) {
    console.error("Error updating leave status:", error);
    
    // Handle specific errors
    if ((error as any).code === "P2025") {
      return NextResponse.json(
        { error: "Leave request not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update leave status" },
      { status: 500 }
    );
  }
} 