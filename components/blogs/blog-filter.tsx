"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export default function BlogsFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const order = searchParams.get("order") || "desc"

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("order", value)
        router.push(`?${params.toString()}`)
    }

    return (
        <Select onValueChange={handleSortChange} defaultValue={order}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="desc">Newest first</SelectItem>
                <SelectItem value="asc">Oldest first</SelectItem>
            </SelectContent>
        </Select>
    )


}