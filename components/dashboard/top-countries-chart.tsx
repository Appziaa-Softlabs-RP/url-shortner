"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface CountryData {
    country: string
    count: number
}

interface TopCountriesChartProps {
    data: CountryData[]
}

export function TopCountriesChart({ data }: TopCountriesChartProps) {
    return (
        <ChartContainer
            config={{
                count: {
                    label: "Count",
                    color: "hsl(var(--chart-1))",
                },
            }}
            className="h-[300px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="country_code" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}