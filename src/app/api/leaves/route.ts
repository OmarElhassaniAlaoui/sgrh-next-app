import { NextResponse } from "next/server";
import { LeaveService } from "@/services/leave";
import { LeaveType, LeaveStatus } from "@prisma/client";

export async function GET() {
  try {
    const leaves = await LeaveService.getAllLeaveRequests();
    return NextResponse.json(leaves);
  } catch (error) {
    console.error("Error fetching leaves:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const {
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
      notes,
      replacementId,
    } = await request.json();

    // Validate required fields
    if (!employeeId || !leaveType || !startDate || !endDate) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate leaveType
    if (!Object.values(LeaveType).includes(leaveType)) {
      return NextResponse.json(
        { message: "Invalid leave type" },
        { status: 400 }
      );
    }

    const leave = await LeaveService.createLeaveRequest({
      employeeId,
      leaveType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason,
      notes,
      replacementId,
    });

    return NextResponse.json(leave, { status: 201 });
  } catch (error: any) {
    console.error("Error creating leave:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 400 }
    );
  }
}
