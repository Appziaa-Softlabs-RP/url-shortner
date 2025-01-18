"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavItem = ({ item, path }: any) => {
    return <SidebarMenuButton asChild
        isActive={path === item.url}
    >
        <Link href={item.url}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
        </Link>
    </SidebarMenuButton>
}

const DropDownNavItem = ({ item, path }: any) => {
    return <>
        <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                {
                    item.items && (
                        <ChevronRight className={cn(
                            "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        )} />
                    )
                }
            </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
            <SidebarMenuSub>
                {item.items?.map((subItem: any) => (
                    <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={path === subItem.url}>
                            <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                            </Link>
                        </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                ))}
            </SidebarMenuSub>
        </CollapsibleContent>
    </>
}

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {

    const path = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Explore</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={path === item.url || (item?.items && item.items?.some(subItem => path === subItem.url))}
                        className="group/collapsible"

                    >
                        <SidebarMenuItem>
                            {
                                item.items ? (
                                    <DropDownNavItem item={item} path={path} />
                                ) : (
                                    <NavItem item={item} path={path} />
                                )
                            }
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}