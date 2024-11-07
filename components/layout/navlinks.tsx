'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { UserNav } from './user-nav'

interface ItemsProps {
    name: string
    href: string
    icon?: keyof typeof Icons
    subItems?: ItemsProps[]
    isComingSoon?: boolean
}

const NavItem = ({ item, isMobile }: { item: ItemsProps; isMobile: boolean }) => {
    const [isOpen, setIsOpen] = useState(false)
    const Icon = item.icon ? Icons[item.icon] : null

    const handleClick = () => {
        if (isMobile && item.subItems) {
            setIsOpen(!isOpen)
        }
    }

    if (!isMobile && item.subItems) {
        return (
            <NavigationMenuItem>
                <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.subItems.map((subItem, index) => (
                            <li key={index}>
                                <NavigationMenuLink asChild>
                                    <a
                                        href={subItem.href}
                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                        {Icon && <Icon className="h-6 w-6" />}
                                        <div className="text-sm font-medium leading-none">{subItem.name}</div>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                        ))}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        )
    }

    return (
        <div
            className={`relative group ${isMobile ? 'w-full' : 'hover:cursor-pointer'}`}
            onMouseEnter={() => !isMobile && setIsOpen(true)}
            onMouseLeave={() => !isMobile && setIsOpen(false)}
        >
            <Link
                href={item?.subItems ? '#' : item.href}
                className={`space-x-1 text-sm text-gray-700 ${isOpen && 'text-secondary'} hover:text-secondary hover:bg-secondary/10 p-2 rounded transition-colors duration-200 w-full flex items-center justify-between ${isMobile ? 'py-2' : ''
                    }`}
                onClick={handleClick}
            >
                <span className={`font-medium grid ${Icon && "grid-cols-[20px_1fr]"} items-center gap-2`}>
                    {Icon && <Icon className="w-5 h-5" />}
                    <span>{item.name}</span>
                </span>
                {item.subItems && (
                    <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="text-gray-400" size={16} />
                    </motion.span>
                )}
            </Link>
            <AnimatePresence>
                {isOpen && item.subItems && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`${isMobile
                            ? 'md:mt-2 md:bg-gray-50 rounded-md md:p-2'
                            : 'absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10'
                            }`}
                    >
                        {item.subItems.map((subItem, index) => {
                            if (subItem?.isComingSoon) {
                                return null;
                            }
                            return (
                                <div key={index} className={`bg-white md:w-64 p-1 m-0 ${index === 0 ? 'rounded-t-md' : ''} ${(index - 1) === (item?.subItems?.length) ? 'rounded-b-md' : ''}`}>
                                    <NavItem key={index} item={subItem} isMobile={isMobile} />
                                </div>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function NavLinks({ session }: { session: any }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems: ItemsProps[] = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "What we do",
            href: "/what-we-do",
            subItems: [
                { name: "Services", href: "/services" },
                { name: "Solutions", href: "/solutions" },
                { name: "Industries", href: "/industries" },
            ],
        },
        {
            name: "Blogs",
            href: "/blogs/latest",
        },
        {
            name: "Insights",
            href: "/insights",
            subItems: [
                { name: "Case Studies", href: "/case-studies" },
                { name: "White Papers", href: "/white-papers" },
                { name: "Webinars", href: "/webinars" },
            ],
        },
        {
            name: "Career",
            href: "/career",
        },
    ]

    return (
        <header className="sticky top-0 z-50 w-full bg-white backdrop-blur-sm border-b border-gray-200 md:px-[20px]">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className='flex items-center gap-8'>
                    <Link className="flex items-center space-x-2" href="/">
                        <Image src="/img/logo.svg"
                            alt="DigitalJanet"
                            height={32}
                            width={180}
                        />
                    </Link>
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            {navItems.map((item, index) => (
                                <NavItem key={index} item={item} isMobile={false} />
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                {
                    session ?
                        <UserNav session={session} />
                        :
                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/login">
                                <Button variant="outline" size="sm" className="font-medium">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm" className="font-medium">
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                }
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="sm" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="pr-6">
                        <nav className="flex flex-col space-y-4 mt-4 ">
                            {navItems.map((item, index) => (
                                <NavItem key={index} item={item} isMobile={true} />
                            ))}
                            {
                                session ?
                                    <UserNav session={session} />
                                    :
                                    <div className="flex flex-wrap gap-3 mt-4 ">
                                        <Link href="/login" className="w-fit">
                                            <Button variant="outline" className="w-full px-6 justify-start">Log in</Button>
                                        </Link>
                                        <Link href="/signup" className="w-fit">
                                            <Button className="w-full px-6 justify-start">Sign up</Button>
                                        </Link>
                                    </div>
                            }
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}