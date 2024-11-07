"use client";
import { legalPolicies } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./call-actions";


export const columns: ColumnDef<legalPolicies>[] = [
    {
        accessorKey: "title",
        header: "TITLE",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];