import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
    const footerLinks = {
        "About Us": [
            {
                name: "About Us",
                href: '#'
            }
        ],
        "Resources": [
            {
                name: "Documentation",
                href: 'https://docs.rwps.in'
            },
            {
                name: "Blogs",
                href: "/blogs/latest"
            }
        ],
        "Policies": [
            {
                name: "Privacy",
                href: 'https://rewardsplus.in/privacy'
            },
            {
                name: "Terms",
                href: 'https://rewardsplus.in/terms'
            },
        ],
    }

    const socials = [
        {
            image: "/icons/twitter-white.svg",
            name: "X",
            href: "https://x.com/appziaa"
        },
        {
            icon: Linkedin,
            name: "Linkdin",
            href: "https://www.linkedin.com/company/rewardsplus/"
        },
        {
            icon: Facebook,
            name: "Facebook",
            href: "https://www.facebook.com/myrewardsplus"
        },
        {
            icon: Instagram,
            name: "Instagram",
            href: "https://www.instagram.com/rewardsplus/"
        },
        {
            icon: Youtube,
            name: "Youtube",
            href: "https://www.youtube.com/channel/UC9Or6Co4TpAALls1gz3X5cQ"
        },
    ]

    return (
        <div className="relative mt-[100px]">
            {" "}
            {/* Increased top margin for mobile */}
            <div className="wave-container">
                <div className="wave"></div>
                <div className="wave wave2"></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#3F8EF5] z-10"></div>
            </div>
            <footer className="bg-[#3F8EF5] text-white pt-16 pb-8">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            More than just a link shortener
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Tracking your clicks and scans should be as simple as creating them. That’s why we’ve streamlined all your connections into one convenient platform.
                        </p>
                        <Link href='/login'>
                            <Button size="lg" className="p-8 rounded-full text-lg bg-white text-primary hover:bg-gray-100 transition-colors duration-300">
                                Get started for free
                            </Button>
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-[1fr_250px]">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
                            {Object.entries(footerLinks).map(([category, links]) => (
                                <div key={category}>
                                    <h3 className="font-semibold mb-4">{category}</h3>
                                    <ul className="space-y-2">
                                        {links.map((link, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={link.href}
                                                    target="_blank"
                                                    className="text-gray-200 hover:text-white text-sm transition-colors duration-300"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="flex text-center-sm-center flex-col w-fit mx-auto sm:w-full gap-4">
                            <p>Get social with us</p>
                            <div className="flex w-full gap-5 items-center">
                                {
                                    socials?.map((item, index) => (
                                        <Link key={index} href={item.href}
                                            target="_blank"
                                            className="text-gray-200 border-b-2 border-transparent hover:border-white transition-all ease-in-out pb-1 hover:text-white duration-300">
                                            <span className="sr-only">{item.name}</span>
                                            {
                                                item?.icon ? <item.icon size={25} /> : <Image src={item?.image} alt="icon" width={25} height={25} />
                                            }
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-400 pt-8 mt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-gray-200">
                                © {(new Date()).getFullYear()} <Link href="https://rewardsplus.in" target="_blank">RewardsPlus</Link>. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
