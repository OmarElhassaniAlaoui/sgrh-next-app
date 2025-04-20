import * as XLSX from "xlsx";
import { Employee } from "@/app/generated/prisma"; // Correct import path

// Define a mapping for keys to user-friendly labels
const employeeKeyLabels: Partial<Record<keyof Employee, string>> = {
  id: "ID Technique",
  firstName: "Prénom",
  lastName: "Nom",
  cin: "CIN",
  ppr: "PPR",
  grade: "Grade",
  ladder: "Échelle",
  service: "Service",
  division: "Division",
  decisionNumber: "N° Décision",
  decisionDate: "Date Décision",
  address: "Adresse",
};

// Helper function to get ordered keys and labels
const getExportHeadersAndKeys = (
  selectedKeys?: (keyof Employee)[]
): { headers: string[]; keys: (keyof Employee)[] } => {
  const defaultKeys: (keyof Employee)[] = [
    "firstName",
    "lastName",
    "cin",
    "ppr",
    "grade",
    "ladder",
    "service",
    "division",
    "decisionNumber",
    "decisionDate",
    "address",
  ];

  const keysToUse =
    selectedKeys && selectedKeys.length > 0 ? selectedKeys : defaultKeys;
  const headers = keysToUse.map((key) => employeeKeyLabels[key] || key); // Fallback to key name if label missing

  return { headers, keys: keysToUse };
};

export const exportToExcel = (
  employees: Employee[], // Accept the full Employee array
  filename: string = "employees",
  selectedKeys?: (keyof Employee)[]
) => {
  const { headers, keys } = getExportHeadersAndKeys(selectedKeys);

  // Filter and map data based on selected keys
  const dataForSheet = employees.map((emp) => {
    const row: Record<string, unknown> = {};
    keys.forEach((key) => {
      row[employeeKeyLabels[key] || key] = emp[key]; // Use label as the key in the row object
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(dataForSheet, { header: headers });

  // Optional: Adjust column widths (example)
  // const colWidths = headers.map(header => ({ wch: Math.max(header.length, 15) })); // Adjust width as needed
  // worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Employés");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToCSV = (
  employees: Employee[], // Accept the full Employee array
  filename: string = "employees",
  selectedKeys?: (keyof Employee)[]
) => {
  const { headers, keys } = getExportHeadersAndKeys(selectedKeys);

  const csvContent = [
    headers.join(","), // Header row
    ...employees.map(
      // Map over the original employees array
      (
        emp // Data rows
      ) =>
        keys
          .map((key) => {
            const value = emp[key]; // Get value from the original employee object
            // Handle potential commas in values by enclosing in double quotes
            const formattedValue =
              typeof value === "string" && value.includes(",")
                ? `"${value}"`
                : value;
            return formattedValue ?? ""; // Use empty string for null/undefined
          })
          .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};
