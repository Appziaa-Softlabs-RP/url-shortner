"use client";
import { socials } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./call-actions";
import Image from "next/image";


export const columns: ColumnDef<socials>[] = [
    {
        accessorKey: "icon",
        header: "ICON",
        cell: ({ row }) => <Image
            src={row.getValue("icon")}
            alt="icon"
            className="w-8 h-8"
            width={32}
            height={32}
            unoptimized
        />,
    },
    {
        accessorKey: "name",
        header: "NAME",
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