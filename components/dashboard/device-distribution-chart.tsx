"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"

interface DeviceData {
    device: string
    count: number
}

interface DeviceDistributionChartProps {
    data: DeviceData[]
}

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]

export function DeviceDistributionChart({ data }: DeviceDistributionChartProps) {
    const total = data.reduce((sum, entry) => sum + entry.count, 0)

    return (
        <ChartContainer
            config={{
                count: {
                    label: "Count",
                },
            }}
            className="h-[300px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ device, percent }) => `${device} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent nameKey="device" />} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}

