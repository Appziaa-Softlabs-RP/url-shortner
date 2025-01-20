"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface DailyVisit {
    date: string
    visits: number
}

interface DailyVisitsChartProps {
    data: DailyVisit[]
}

export function DailyVisitsChart({ data }: DailyVisitsChartProps) {
    return (
        <ChartContainer
            config={{
                visits: {
                    label: "Visits",
                    color: "hsl(var(--chart-1))",
                },
            }}
            className="h-[300px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="visits" stroke="var(--color-visits)" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}

