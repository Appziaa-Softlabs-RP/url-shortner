import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {

    const links = [
        {
            name: "Features",
            href: "#features"
        },
        {
            name: "Pricing",
            href: "#pricing"
        },
        {
            name: "Resources",
            href: "#resources"
        }
    ]

    return (
        <nav className="sticky w-full top-0 z-50 bg-white backdrop-blur-md border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/">
                    <Image
                        src="/img/logo.svg"
                        alt="RewardsPlus"
                        width={300}
                        height={200}
                    />
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    {
                        links?.map((item, index) => {
                            return <Link href={item?.href}
                                key={index}
                                className="text-gray-600 hover:text-primary border-b-2 border-transparent hover:border-primary duration-300 transition-all ease-in-out">
                                {item?.name}
                            </Link>
                        })
                    }
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/login">
                        <Button className="group flex gap-1">
                            <span>Get Started</span>
                            <ArrowRight size={18} className="duration-200 transition-transform ease-in-out group-hover:translate-x-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </nav >
    )
}

