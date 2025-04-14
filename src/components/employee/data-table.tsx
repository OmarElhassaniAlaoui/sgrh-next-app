"use client";

import * as React from "react";
import { Employee } from "@prisma/client";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from "@tanstack/react-table";

import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table-sort-list"; // Keep for UI consistency if desired
import { DataTableViewOptions } from "@/components/data-table-view-options";
import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns"; // Import columns from the separate file

interface EmployeeDataTableProps {
  data: Employee[];
}

export function EmployeeDataTable({ data }: EmployeeDataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "firstName", desc: false }, // Default sort
  ]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // For faceted filters if used
    getFacetedUniqueValues: getFacetedUniqueValues(), // For faceted filters if used
    getRowId: (row) => row.id, // Use employee ID for row identification
    // Ensure manual operations are false (default for useReactTable)
    // manualPagination: false,
    // manualSorting: false,
    // manualFiltering: false,
  });

  return (
    <div className="w-full space-y-4">
      <DataTable table={table}>
        <DataTableToolbar table={table}>
          {/* Filter for CIN */}
          <input
            placeholder="Filter CINs..."
            value={(table.getColumn("cin")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("cin")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px] border p-2 rounded"
          />
          {/* You can still use DataTableSortList if its props are compatible */}
          {/* <DataTableSortList table={table} /> */}
          <DataTableViewOptions table={table} />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
