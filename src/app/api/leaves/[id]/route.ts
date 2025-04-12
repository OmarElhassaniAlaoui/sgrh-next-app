import { NextResponse } from "next/server";
import { LeaveService } from "@/services/leave";
import { LeaveStatus } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const leave = await LeaveService.getLeaveRequestById(params.id);
    return NextResponse.json(leave);
  } catch (error: any) {
    console.error("Error fetching leave:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: error.message.includes("not found") ? 404 : 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    // Validate status if provided
    if (data.status && !Object.values(LeaveStatus).includes(data.status)) {
      return NextResponse.json(
        { message: "Invalid leave status" },
        { status: 400 }
      );
    }

    const updatedLeave = await LeaveService.updateLeaveRequest(params.id, data);
    return NextResponse.json(updatedLeave);
  } catch (error: any) {
    console.error("Error updating leave:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await LeaveService.deleteLeaveRequest(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting leave:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: error.message.includes("not found") ? 404 : 500 }
    );
  }
}
