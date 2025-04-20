"use client";

import * as React from "react";
// Import Employee type directly from the generated location
import { Employee } from "@/app/generated/prisma";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback"; // Assuming you have this hook

import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { DataTableViewOptions } from "@/components/data-table-view-options";
import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns"; // Import columns from the separate file
import { Input } from "@/components/ui/input"; // Import Input for search

interface EmployeeDataTableProps {
  data: Employee[];
  pageCount: number; // Add pageCount prop
}

export function EmployeeDataTable({ data, pageCount }: EmployeeDataTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Server-side state
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const sort = searchParams.get("sort") ?? "createdAt:desc";
  const search = searchParams.get("search") ?? "";
  // Filters are handled by EmployeeFilters component

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (
          value === null ||
          value === undefined ||
          String(value).length === 0
        ) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: page - 1,
      pageSize: limit,
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  React.useEffect(() => {
    setPagination({ pageIndex: page - 1, pageSize: limit });
  }, [page, limit]);

  React.useEffect(() => {
    // Update URL when pagination changes locally
    // Check if the new state differs from URL params to avoid loops
    if (pageIndex + 1 !== page || pageSize !== limit) {
      router.push(
        `${pathname}?${createQueryString({
          page: pageIndex + 1,
          limit: pageSize,
        })}`,
        { scroll: false }
      );
    }
  }, [pageIndex, pageSize, router, pathname, createQueryString, page, limit]);

  // Handle server-side sorting
  const [sorting, setSorting] = React.useState<SortingState>(() => {
    const [sortField, sortOrder] = sort.split(":");
    return sortField && sortOrder
      ? [{ id: sortField, desc: sortOrder === "desc" }]
      : [];
  });

  React.useEffect(() => {
    const currentSortString = sorting[0]
      ? `${sorting[0].id}:${sorting[0].desc ? "desc" : "asc"}`
      : null;
    // Only push if the sort state differs from the URL param
    if (currentSortString !== sort) {
      router.push(
        `${pathname}?${createQueryString({ sort: currentSortString })}`,
        { scroll: false }
      );
    }
  }, [sorting, router, pathname, createQueryString, sort]);

  // Handle server-side search
  const [searchValue, setSearchValue] = React.useState(search);
  const debouncedSearch = useDebouncedCallback((value: string) => {
    router.push(
      `${pathname}?${createQueryString({ search: value, page: 1 })}`, // Reset to page 1 on search
      { scroll: false }
    );
  }, 500); // Debounce search input

  React.useEffect(() => {
    setSearchValue(search); // Sync local state if URL changes externally
  }, [search]);

  // Other table states (client-side)
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1, // Pass pageCount
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination, // Use controlled pagination state
      // columnFilters are handled externally by EmployeeFilters
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting, // Updates local sorting state -> triggers useEffect to update URL
    onPaginationChange: setPagination, // Updates local pagination state -> triggers useEffect to update URL
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(), // Not needed for manual filtering
    // getPaginationRowModel: getPaginationRowModel(), // Not needed for manual pagination
    // getSortedRowModel: getSortedRowModel(), // Not needed for manual sorting
    // getFacetedRowModel: getFacetedRowModel(), // Not needed for manual filtering
    // getFacetedUniqueValues: getFacetedUniqueValues(), // Not needed for manual filtering
    getRowId: (row) => row.id,
    manualPagination: true, // Enable manual pagination
    manualSorting: true, // Enable manual sorting
    manualFiltering: true, // Enable manual filtering
  });

  return (
    <div className="w-full space-y-4">
      {/* Use the generic DataTable component */}
      <DataTable table={table}>
        {/* Use the generic DataTableToolbar */}
        <DataTableToolbar table={table}>
          {/* Add Server-side Search Input */}
          <Input
            placeholder="Rechercher (nom, CIN, PPR...)"
            value={searchValue}
            onChange={(event) => {
              const newValue = event.target.value;
              setSearchValue(newValue);
              debouncedSearch(newValue);
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {/* View options remain client-side */}
          {/* <DataTableViewOptions table={table} /> */}
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
