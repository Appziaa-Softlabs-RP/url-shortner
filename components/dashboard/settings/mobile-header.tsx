"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { SettingSidebarItem, SettingSidebarItems, SidebarNavItem } from "@/types"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { usePathname } from "next/navigation"

export function SettingsMobileHeader({ sidebarItems }: { sidebarItems: SettingSidebarItems[] }) {
    const [selectedItem, setSelectedItem] = useState<SettingSidebarItems | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname();

    const SidebarItem = ({ sidebarItems }: { sidebarItems: SettingSidebarItem[] }) => {

        return (
            <div className="w-full grid gap-1">
                {
                    sidebarItems?.map((item, index) => {
                        const Icon = Icons[item.icon];
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`sidebar-link w-full`}
                            >
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "flex gap-2 items-center justify-start w-full",
                                        pathname.includes(item.href) ? "bg-primary/10" : ""
                                    )}
                                >
                                    {Icon && <Icon className="sidebar-icon" size={20} />}
                                    <span>{item.title}</span>
                                </Button>
                            </Link>
                        )
                    })
                }
            </div>
        );
    }

    const findAndSetSelectedItem = () => {
        sidebarItems?.forEach((item: SettingSidebarItems) => {
            item.items?.forEach((subItem: SettingSidebarItem) => {
                if (subItem.href === pathname) {
                    setSelectedItem(item)
                    setIsOpen(false)
                }
            })
        })
    }

    useEffect(() => {
        findAndSetSelectedItem()
    }, [pathname]);

    return (
        <div className="fixed top-[0px] h-[115px] pt-[60px] bg-slate-50 z-40 w-screen px-6 left-0 md:hidden">
            <header className="flex flex-col h-full top-0 z-50 items-center w-full justify-between border-b p-4">
                <div className="flex gap-2 w-full items-center justify-between"
                    onClick={
                        () => setIsOpen(!isOpen)
                    }
                >
                    <h2 className="text-xl text-primary font-semibold">
                        {
                            selectedItem &&
                            selectedItem?.items[0]?.title
                        }
                    </h2>
                    <ChevronDown
                        className={cn(
                            "transition-all duration-200 ease-in-out",
                            isOpen && 'rotate-180'
                        )}
                    />
                </div>
                <div className={cn(
                    "flex flex-col gap-2 py-4 fixed bg-slate-50 ps-5 pe-3 z-40 left-0 top-[115px]",
                    "w-screen h-[calc(100vh-115px)] overflow-y-auto",
                    "transition-all duration-200 ease-in-out",
                    isOpen ? 'translate-y-0' : 'translate-y-full',
                )}>
                    {sidebarItems?.map((item, index) => {
                        return (
                            <div key={index} className="flex flex-col gap-2 min-w-[200px] justify-start w-full">
                                <p
                                    key={index}
                                    className="font-semibold"
                                >
                                    {item.heading}
                                </p>
                                <SidebarItem sidebarItems={item.items} />
                            </div>
                        );
                    })}
                </div>
            </header>
        </div>
    )
}

