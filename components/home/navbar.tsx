"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ArrowRight, Menu } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import styles from "./nav.module.css"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const links = [
        {
            name: "Pricing",
            href: "/pricing",
        },
        {
            name: "Blogs",
            href: "/blogs/latest",
        },
        {
            name: "Resources",
            href: "https://docs.rwps.in",
        },
    ]

    return (
        <nav className="sticky w-full top-0 z-50 bg-white backdrop-blur-md border-b">
            <div className={cn(`mx-auto h-16 flex items-center justify-between`, styles.responsiveContainer)}>
                <Link href="/">
                    <Image src="/img/logo.svg" alt="RewardsPlus" width={300} height={200} />
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    {links.map((item, index) => (
                        <Link
                            href={item.href}
                            key={index}
                            className="text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-primary duration-300 transition-all ease-in-out"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/login">
                        <Button className="group flex gap-1">
                            <span>Get Started</span>
                            <ArrowRight
                                size={18}
                                className="duration-200 transition-transform ease-in-out group-hover:translate-x-2"
                            />
                        </Button>
                    </Link>
                </div>
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu size={24} />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <nav className="flex flex-col h-full">
                                <ul className="flex-1 px-2 py-4 space-y-2">
                                    {links.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                    <li className="flex flex-col px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                                        <span>One link to all</span>
                                        <span
                                            className="italic text-green-600 text-sm"
                                        >(Coming Soon)</span>
                                    </li>
                                </ul>
                                <div className="px-4 py-6 border-t">
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full justify-center group flex gap-1">
                                            <span>Get Started</span>
                                            <ArrowRight
                                                size={18}
                                                className="duration-200 transition-transform ease-in-out group-hover:translate-x-2"
                                            />
                                        </Button>
                                    </Link>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}
