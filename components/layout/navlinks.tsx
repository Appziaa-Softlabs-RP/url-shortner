'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight, ChevronUp, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { UserNav } from './user-nav'

interface ItemsProps {
    name: string
    href: string
    icon?: keyof typeof Icons
    subItems?: ItemsProps[]
    isComingSoon?: boolean
    heading?: string
    description?: string
    btnDetails?: {
        name: string
        href: string
    }
    links?: {
        name: string
        href: string
    }[]
}

const NavItem = ({ item, isMobile }: { item: ItemsProps; isMobile: boolean }) => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const Icon = item.icon ? Icons[item.icon] : null
    const [itemIsOpen, setItemIsOpen] = useState(false);
    const [activeSubItem, setActiveSubItem] = useState<ItemsProps | null>(null);
    const submenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
                setItemIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = () => {
        if (isMobile && item.subItems) {
            setIsOpen(!isOpen)
        }
    }

    if (!isMobile && item.subItems) {
        return (
            <div
                ref={submenuRef}
                className="relative group"
            >
                <p className={cn(
                    'flex items-center gap-1 cursor-pointer p-2 rounded',
                    itemIsOpen && "text-secondary bg-secondary/10"
                )}
                    onClick={() => setItemIsOpen(!itemIsOpen)}
                >
                    <span>{item.name}</span>
                    {
                        !itemIsOpen ?
                            <ChevronDown size={15} className="h-6 w-6" />
                            : <ChevronUp size={15} className="h-6 w-6" />
                    }
                </p>
                {itemIsOpen && (
                    <div className={cn(
                        'fixed min-w-[100vw] top-[65px] left-0 bg-white',
                    )}>
                        <div className={cn(
                            "w-full bg-secondary/10",
                            "px-4 md:px-12 py-4"
                        )}>
                            <div className='w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-3'>
                                <ul className={cn(
                                    'grid gap-2'
                                )}>
                                    {item.subItems.map((subItem, index) => (
                                        <li key={index}>
                                            <p
                                                onMouseEnter={() => setActiveSubItem(subItem)}
                                            >
                                                <a
                                                    href={subItem.href}
                                                    className={cn(
                                                        "block select-none space-y-1 rounded-t-md border-b-[1px] border-secondary/40 p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                                        "flex w-full justify-between items-center"
                                                    )}
                                                >
                                                    <div className="text-sm font-medium leading-none">{subItem.name}</div>
                                                    <ChevronRight size={15} className="h-6 w-6" />
                                                </a>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                                <div>
                                    {
                                        activeSubItem && (
                                            <div className='w-full h-full px-4 md:px-10 grid gap-1'>
                                                {activeSubItem?.heading &&
                                                    <div className='flex flex-col gap-2'>
                                                        {
                                                            activeSubItem?.heading && (
                                                                <h3 className='text-xl md:text-3xl text-secondary font-light md:max-w-full lg:max-w-[80%]'>{activeSubItem.heading}</h3>
                                                            )
                                                        }
                                                        {
                                                            activeSubItem?.description && (
                                                                <p className='text-gray-500 text-base md:text-md md:max-w-full lg:max-w-[80%] xl:max-w-[60%]'>{activeSubItem.description}</p>
                                                            )
                                                        }
                                                    </div>
                                                }
                                                {
                                                    activeSubItem?.btnDetails && (
                                                        <Link href={activeSubItem.btnDetails.href}>
                                                            <Button size="lg" className='mt-4 rounded-full border-secondary/60'
                                                                variant={'outline'}
                                                            >
                                                                {activeSubItem.btnDetails.name}
                                                            </Button>
                                                        </Link>
                                                    )
                                                }
                                                {
                                                    activeSubItem?.links && (
                                                        <ul className='w-full h-fit grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
                                                            {
                                                                activeSubItem.links.map((link, index) => (
                                                                    <li key={index}>
                                                                        <Link href={link.href} className='text-gray-500 hover:text-secondary hover:underline'>
                                                                            {link.name}
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
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
                className={`space-x-1 text-sm text-gray-700 ${isOpen && 'text-secondary'} ${pathname === item.href && 'text-secondary bg-secondary/10'} hover:text-secondary hover:bg-secondary/10 p-2 rounded transition-colors duration-200 w-full flex items-center justify-between ${isMobile ? 'py-2' : ''
                    }`}
                onClick={handleClick}
            >
                <span className={`font-medium grid ${Icon && "grid-cols-[20px_1fr]"} items-center gap-2`}>
                    {Icon && <Icon className="w-5 h-5" />}
                    <span className='text-[15px]'>{item.name}</span>
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
                            ? 'md:mt-2 md:bg-gray-50 rounded-md md:p-2 w-full'
                            : 'absolute left-0 mt-2 w-64 bg-white border border-gray-200  rounded-md shadow-lg z-10'
                            }`}
                    >
                        {item.subItems.map((subItem, index) => {
                            if (subItem?.isComingSoon) {
                                return null;
                            }
                            return (
                                <div key={index} className={`md:w-64 p-1 m-0 ${index === 0 ? 'rounded-t-md' : ''} ${(index - 1) === (item?.subItems?.length) ? 'rounded-b-md' : ''}`}>
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
                {
                    name: "Overview",
                    href: "/what-we-do",
                    heading: "Empowering Organizations Through Talent and Technology",
                    description: "With our extensive capabilities, strategic ecosystem partnerships, and unparalleled industry expertise, we empower your business to reach its next level. Whether it's sourcing top talent or driving digital transformation, we're here to support your success.",
                    btnDetails: {
                        name: "Learn More",
                        href: "/what-we-do"
                    }
                },
                {
                    name: "Services",
                    href: "/what-we-do#services",
                    links: [
                        { name: "Staffing and Consulting", href: "/what-we-do#staff-and-consulting" },
                        { name: "Recruitment Process Outsourcing (RPO)", href: "/what-we-do#retail" },
                        { name: "Digital Engineering", href: "/what-we-do#finance" },
                        { name: "Cyber Security", href: "/what-we-do#education" },
                        { name: "Cloud Migration", href: "/what-we-do#manufacturing" },
                    ]
                },
                {
                    name: "Industries",
                    href: "/what-we-do#industries",
                    links: [
                        { name: "Information Technology", href: "/what-we-do#ai-ml" },
                        { name: "BFSI (Banking, Financial Services, and Insurance)", href: "/what-we-do#data-analytics" },
                        { name: "Consumer & Retail", href: "/what-we-do#cloud-computing" },
                        { name: "E-Commerce", href: "/what-we-do#cyber-security" },
                        { name: "Life Sciences & Healthcare", href: "/what-we-do#blockchain" },
                        { name: "Automobile", href: "/what-we-do#blockchain" },
                        { name: "Telecom", href: "/what-we-do#blockchain" },
                        { name: "Manufacturing & Logistics", href: "/what-we-do#blockchain" },
                    ]
                },
                {
                    name: "Product And Platforms",
                    href: "/what-we-do#products",
                    links: [
                        { name: "RewardsPlus URL Shortener", href: "/what-we-do#digitaljanet" },
                        { name: "RewardsPlus URL Shortener Pro", href: "/what-we-do#digitaljanet-pro" },
                        { name: "RewardsPlus URL Shortener Enterprise", href: "/what-we-do#digitaljanet-enterprise" },
                        { name: "RewardsPlus URL Shortener HR", href: "/what-we-do#digitaljanet-hr" },
                        { name: "RewardsPlus URL Shortener Payroll", href: "/what-we-do#digitaljanet-payroll" },
                    ]
                },
                {
                    name: "Research & Innovation",
                    href: "/what-we-do#research",
                    links: [
                        { name: "Research", href: "/what-we-do#research" },
                        { name: "Innovation", href: "/what-we-do#innovation" },
                    ]
                }
            ],
        },
        {
            name: "Who we are",
            href: "/who-we-are",
        },
        {
            name: "Blogs",
            href: "/blogs/latest",
        },
        {
            name: "Insights",
            href: "/insights",
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
                            alt="RewardsPlus URL Shortener"
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
                    <SheetContent side="right" className="pr-6 max-h-full overflow-y-auto">
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