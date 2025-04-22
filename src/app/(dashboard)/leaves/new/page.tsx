"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveForm } from "@/components/leaves/leave-form";
import { toast } from "sonner";
import { FormLeaveType } from "@/utils/leave-form-utils";
import { z } from "zod";
import { formSchema } from "@/components/leaves/leave-form";
import { Spinner } from "@/components/ui/spinner";

// Interface for Employee data
interface Employee {
  id: string;
  name: string;
  surname: string;
  cin: string;
}

export default function NewLeavePage() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch employees data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        
        // Fetch data from API route
        const response = await fetch('/api/employees');
        
        if (!response.ok) {
          throw new Error(`Error fetching employees: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the data to match the expected format
        const formattedEmployees = data.map((employee: any) => ({
          id: employee.id,
          name: employee.firstName || employee.name, // Handle different field names
          surname: employee.lastName || employee.surname,
          cin: employee.cin,
        }));
        
        setEmployees(formattedEmployees);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Impossible de charger la liste des employés");
        
        // Fallback to empty array
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // This function submits the data to your API
  const handleSubmit = async (values: z.infer<typeof formSchema> & { duration: number }) => {
    try {
      // Show loading toast
      const loadingToast = toast.loading("Création de la demande de congé...");
      
      // Convert dates to ISO strings for API
      const payload = {
        ...values,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
        returnDate: values.returnDate ? values.returnDate.toISOString() : null,
      };
      
      // Make API call to save the data
      const response = await fetch('/api/leaves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la création");
      }
      
      // Show success toast
      toast.success("Demande de congé créée avec succès");
      
      // Redirect back to leaves list
      router.push("/leaves");
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de la création de la demande de congé");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold">Nouvelle demande de congé</h1>
        </div>
        
        <Card>
          <CardContent className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Spinner size="lg" />
              <p>Chargement des données...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold">Nouvelle demande de congé</h1>
        </div>
        
        <Card>
          <CardContent className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-destructive font-medium">{error}</p>
              <Button onClick={() => window.location.reload()}>Réessayer</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-3xl font-bold">Nouvelle demande de congé</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulaire de demande de congé</CardTitle>
        </CardHeader>
        <CardContent>
          {employees.length > 0 ? (
            <LeaveForm
              employees={employees}
              onSubmit={handleSubmit}
            />
          ) : (
            <div className="py-4 text-center">
              <p className="text-muted-foreground">Aucun employé disponible. Veuillez d'abord ajouter des employés.</p>
              <Button 
                className="mt-4"
                onClick={() => router.push("/employees/new")}
              >
                Ajouter un employé
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 