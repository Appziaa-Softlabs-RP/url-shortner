"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {
    BarChart3,
    LayoutDashboard,
    Link as LinkNew,
    Settings
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Urls",
            url: "/dashboard/urls",
            icon: LinkNew,
        },
        // {
        //     title: "QR Codes",
        //     url: "/dashboard/qr-codes",
        //     icon: QrCode,
        // },
        {
            title: "Analytics",
            url: "/dashboard/analytics",
            icon: BarChart3,
        },
        // {
        //     title: "Settings",
        //     url: "/dashboard/settings",
        //     icon: Settings,
        // },
    ],
}

export function AppSidebar({ user, ...props }: any) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="p-0 ">
                <div className="p-4 flex items-center justify-center w-full">
                    <Link href="/">
                        <Image src="/img/logo.svg" alt="RP"
                            width={200} height={120}
                            className="group-data-[collapsible=icon]:hidden"
                        />
                        <Image src="/img/logo-sm.svg" alt="RP"
                            width={120} height={120}
                            className="hidden max-h-[20px] group-data-[collapsible=icon]:block"
                        />
                    </Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}