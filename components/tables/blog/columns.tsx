"use client";
import { blogCategory } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./call-actions";


export const columns: ColumnDef<blogCategory>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <span className={`px-2 py-1 text-xs font-semibold text-${row.getValue("status") == "1" ? "blue" : "red"}-600 bg-${row.getValue("status") === "active" ? "green" : "red"}-200 rounded-full`}>
                {row.getValue("status") == "1" ? "Active" : "Inactive"}
            </span>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];