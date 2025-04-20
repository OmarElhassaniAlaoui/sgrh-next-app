"use client";

import type { ColumnDef } from "@tanstack/react-table";
// Import Employee type directly from the generated location
import { Employee } from "@/app/generated/prisma";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Text } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Employee>[] = [
  // {
  //   accessorKey: "firstName",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="First Name" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
  //   meta: {
  //     label: "First Name",
  //     placeholder: "Search first names...",
  //     variant: "text",
  //     icon: Text,
  //   },
  //   // enableColumnFilter: true, // Disable filter for firstName
  //   enableSorting: true,
  // },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
    // meta: {
    //   label: "Last Name",
    //   placeholder: "Search last names...",
    //   variant: "text",
    //   icon: Text,
    // },
    // enableColumnFilter: true, // Disable filter for lastName
    enableSorting: true,
  },
  {
    accessorKey: "cin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CIN" />
    ),
    cell: ({ row }) => <div>{row.getValue("cin")}</div>,
    // meta: {
    //   label: "CIN",
    //   placeholder: "Search CINs...",
    //   variant: "text",
    //   icon: Text, // Consider a more specific icon if available
    // },
    enableColumnFilter: true, // Keep filter enabled for CIN
    enableSorting: true,
  },
  {
    accessorKey: "ppr",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PPR" />
    ),
    cell: ({ row }) => <div>{row.getValue("ppr")}</div>,
    // meta: {
    //   label: "PPR",
    //   placeholder: "Search PPRs...",
    //   variant: "text",
    //   icon: Text, // Consider a more specific icon if available
    // },
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    accessorKey: "grade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grade" />
    ),
    cell: ({ row }) => <div>{row.getValue("grade")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "service",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
    cell: ({ row }) => <div>{row.getValue("service")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "division",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Division" />
    ),
    cell: ({ row }) => <div>{row.getValue("division")}</div>,
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(employee.id)}
            >
              Copy Employee ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
