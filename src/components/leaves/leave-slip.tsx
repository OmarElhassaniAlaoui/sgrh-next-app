"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Printer } from "lucide-react";
import { formatDate, formatDateLong } from "@/utils/date-utils";
import { getLeaveTypeLabel } from "@/utils/leave-form-utils";
import { FormLeaveType } from "@/utils/leave-form-utils";

// Interfaces for the component props
interface Employee {
  id: string;
  name: string;
  surname: string;
  cin: string;
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  type: FormLeaveType;
  startDate: string | Date;
  endDate: string | Date;
  returnDate: string | Date;
  duration: number;
  replacementColleagueId: string | null;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface LeaveSlipProps {
  leave: LeaveRequest;
  employee: Employee;
  replacementEmployee: Employee | null;
}

export function LeaveSlip({
  leave,
  employee,
  replacementEmployee,
}: LeaveSlipProps) {
  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handlePrint} className="print:hidden">
          <Printer className="mr-2 h-4 w-4" />
          Imprimer
        </Button>
      </div>
      
      <Card>
        <CardContent ref={printRef} className="p-6">
          <div className="mb-8 text-center">
            <div className="text-xl font-bold">ROYAUME DU MAROC</div>
            <div className="font-semibold">Ministère de [Département]</div>
            <div>Direction de [Division]</div>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-2 inline-block">
              AUTORISATION DE CONGÉ
            </h1>
            <p className="text-sm text-muted-foreground">
              N° {leave.id.substring(0, 8).toUpperCase()}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Informations de l'employé :</h3>
                <p>
                  <span className="font-medium">Nom et prénom :</span> {employee.name}{" "}
                  {employee.surname}
                </p>
                <p>
                  <span className="font-medium">CIN :</span> {employee.cin}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold">Informations du congé :</h3>
                <p>
                  <span className="font-medium">Type de congé :</span>{" "}
                  {getLeaveTypeLabel(leave.type)}
                </p>
                <p>
                  <span className="font-medium">Date de début :</span>{" "}
                  {formatDate(leave.startDate)}
                </p>
                <p>
                  <span className="font-medium">Date de fin :</span>{" "}
                  {formatDate(leave.endDate)}
                </p>
                <p>
                  <span className="font-medium">Date de retour :</span>{" "}
                  {formatDate(leave.returnDate)}
                </p>
                <p>
                  <span className="font-medium">Durée :</span> {leave.duration} jours
                </p>
              </div>
            </div>
            
            {replacementEmployee && (
              <div>
                <h3 className="font-semibold">Remplaçant :</h3>
                <p>
                  {replacementEmployee.name} {replacementEmployee.surname}
                </p>
              </div>
            )}
            
            <div className="mt-10">
              <p>
                L'agent sus-mentionné est autorisé à prendre un congé de{" "}
                <span className="font-semibold">{getLeaveTypeLabel(leave.type)}</span> de{" "}
                <span className="font-semibold">{leave.duration} jours</span>, du{" "}
                <span className="font-semibold">{formatDateLong(leave.startDate)}</span> au{" "}
                <span className="font-semibold">{formatDateLong(leave.endDate)}</span>.
              </p>
              <p className="mt-2">
                La reprise de service est prévue le{" "}
                <span className="font-semibold">{formatDateLong(leave.returnDate)}</span>.
              </p>
            </div>
            
            <div className="mt-10 flex justify-end">
              <div className="text-center">
                <p>Fait à ______________, le {formatDateLong(new Date())}</p>
                <p className="mt-6">Signature de l'autorité compétente</p>
                <div className="mt-6 border-t-2 border-gray-300 pt-2 w-40 mx-auto"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 