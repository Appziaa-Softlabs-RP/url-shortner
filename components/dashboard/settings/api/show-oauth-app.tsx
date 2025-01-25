
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Eye, EyeOff, Copy, Check } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DeleteAppButton } from "./delete-oauth-app"

interface AuthApp {
    id: string
    name: string
    app_url: string
    token: string
}

interface ShowAuthAppsProps {
    token: string
    data: AuthApp[]
    isLoading?: boolean
    error?: string
}

export default function ShowAuthApps({ token, data, isLoading, error }: ShowAuthAppsProps) {
    const [visibleTokens, setVisibleTokens] = useState<Record<string, boolean>>({})
    const [copiedTokens, setCopiedTokens] = useState<Record<string, boolean>>({})

    const toggleTokenVisibility = (id: string) => {
        setVisibleTokens((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const copyToken = async (token: string, id: string) => {
        await navigator.clipboard.writeText(token)
        setCopiedTokens((prev) => ({ ...prev, [id]: true }))
        setTimeout(() => setCopiedTokens((prev) => ({ ...prev, [id]: false })), 2000)
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="p-0 my-4">
                <CardTitle className="text-xl font-bold">Registered OAuth Applications</CardTitle>
                <CardDescription>
                    Manage your registered OAuth applications.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">App Name</TableHead>
                                <TableHead>App URL</TableHead>
                                <TableHead className="w-[300px]">Token</TableHead>
                                <TableHead className="w-[100px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((item: AuthApp) => (
                                <TableRow key={item.id} className="whitespace-nowrap">
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.app_url}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-mono max-w-[300px] w-[200px] overflow-auto">{visibleTokens[item.id] ? item.token : "••••••••••••••••••••••"}</span>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="icon" onClick={() => toggleTokenVisibility(item.id)}>
                                                            {visibleTokens[item.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>{visibleTokens[item.id] ? "Hide token" : "Show token"}</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="icon" onClick={() => copyToken(item.token, item.id)}>
                                                            {copiedTokens[item.id] ? <Check size={16} /> : <Copy size={16} />}
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>{copiedTokens[item.id] ? "Copied!" : "Copy token"}</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DeleteAppButton appId={item.id} appName={item.name} token={token} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="mt-6">
                    <Link href="/dashboard/settings/api/new">
                        <Button variant="outline"
                            className="text-primary border-primary hover:text-primary/90"
                        >Register new app</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

