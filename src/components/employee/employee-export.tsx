import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DownloadCloud,
  FileSpreadsheet,
  FileText,
  Search,
  UserPlus,
  X,
} from "lucide-react";
// import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToExcel, exportToCSV } from "@/utils/export-utils";
import { Employee } from "@/app/generated/prisma";
import { toast } from "sonner";

// Define the keys available for export, potentially mapping to user-friendly names
const employeeKeys: { key: keyof Employee; label: string }[] = [
  { key: "firstName", label: "Prénom" },
  { key: "lastName", label: "Nom" },
  { key: "cin", label: "CIN" },
  { key: "ppr", label: "PPR" },
  { key: "grade", label: "Grade" },
  { key: "ladder", label: "Échelle" },
  { key: "service", label: "Service" },
  { key: "division", label: "Division" },
  { key: "decisionNumber", label: "N° Décision" },
  { key: "decisionDate", label: "Date Décision" },
  { key: "address", label: "Adresse" },
  // { key: "id", label: "ID Technique" }, // Usually not needed for user export
];

interface EmployeeExportProps {
  employees: Employee[];
}

export function EmployeeExport({ employees }: EmployeeExportProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<keyof Employee>>(
    new Set(employeeKeys.map((k) => k.key)) // Default to all selected
  );
  const [exportType, setExportType] = useState<"excel" | "csv" | null>(null);
  // const navigate = useNavigate();

  const handleExportClick = (type: "excel" | "csv") => {
    if (employees.length === 0) {
      toast.error("Aucun employé à exporter.");
      return;
    }
    setExportType(type);
    setIsDialogOpen(true);
  };

  const handleSelectKey = (key: keyof Employee, checked: boolean) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(key);
      } else {
        next.delete(key);
      }
      return next;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedKeys(new Set(employeeKeys.map((k) => k.key)));
    } else {
      setSelectedKeys(new Set());
    }
  };

  const performActualExport = () => {
    if (!exportType || selectedKeys.size === 0) {
      toast.error("Veuillez sélectionner au moins une colonne à exporter.");
      return;
    }

    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `employees-${timestamp}`;
    const keysToExport = Array.from(selectedKeys);

    // Pass the original employees array and the selected keys to the export functions
    try {
      if (exportType === "excel") {
        exportToExcel(employees, filename, keysToExport);
        toast.success("Export Excel réussi");
      } else {
        exportToCSV(employees, filename, keysToExport);
        toast.success("Export CSV réussi");
      }
      setIsDialogOpen(false); // Close dialog on success
    } catch (error) {
      toast.error("Erreur lors de l'export");
      console.error("Export error:", error);
      // Optionally keep dialog open on error: setIsDialogOpen(false);
    }
  };

  const areAllSelected = useMemo(
    () => selectedKeys.size === employeeKeys.length,
    [selectedKeys]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <DownloadCloud className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExportClick("excel")}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExportClick("csv")}>
          <FileText className="mr-2 h-4 w-4" />
          Export CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choisir les colonnes à exporter</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center space-x-2 mb-2 border-b pb-2">
              <Checkbox
                id="select-all"
                checked={areAllSelected}
                onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
              />
              <Label htmlFor="select-all" className="font-medium">
                Tout sélectionner / désélectionner
              </Label>
            </div>
            {employeeKeys.map(({ key, label }) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`checkbox-${key}`}
                  checked={selectedKeys.has(key)}
                  onCheckedChange={(checked) =>
                    handleSelectKey(key, Boolean(checked))
                  }
                />
                <Label htmlFor={`checkbox-${key}`}>{label}</Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button onClick={performActualExport}>Confirmer l'export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
}
