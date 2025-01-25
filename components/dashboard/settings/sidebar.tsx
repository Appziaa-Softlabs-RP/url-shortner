"use client"

import { Icons } from "@/components/icons";
import { SettingSidebarItems } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SettingSidebarItem } from "@/types";
import { cn } from "@/lib/utils";

export function SettingsSidebar({ sidebarItems }: { sidebarItems: SettingSidebarItems[] }) {
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
                                        "flex gap-2 items-center justify-start font-light w-full",
                                        pathname.includes(item.href) ? "bg-primary/10 text-primary" : ""
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

    return (
        <aside className="sidebar sticky top-[20px] px-3 hidden md:block border-e-[1px] max-h-[100vh] overflow-y-auto">
            <div className="sidebar-header">
                <h2 className="text-2xl font-bold mt-6 mb-4">Settings</h2>
            </div>
            <nav className="grid gap-2">
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
            </nav>
        </aside>
    );
}