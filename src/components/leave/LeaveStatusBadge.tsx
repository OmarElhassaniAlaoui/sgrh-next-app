import { cn } from "@/lib/utils";
import { LeaveStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

interface LeaveStatusBadgeProps {
  status: LeaveStatus;
}

export function LeaveStatusBadge({ status }: LeaveStatusBadgeProps) {
  const statusStyles: Record<LeaveStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
    APPROVED: "bg-green-100 text-green-800 border-green-300",
    REJECTED: "bg-red-100 text-red-800 border-red-300",
    CANCELLED: "bg-gray-100 text-gray-800 border-gray-300",
  };

  return (
    <Badge className={cn("font-medium", statusStyles[status])}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
}
