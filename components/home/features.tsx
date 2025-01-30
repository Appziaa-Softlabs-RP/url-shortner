import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowRight, ArrowUp, CheckCircle, Link2, Network, QrCode } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

export function Features() {
    const features = [
        {
            title: "URL Shortener",
            description: "Transform long URLs into concise, shareable links that drive more clicks",
            icon: Link2,
            features: ["URL shortening at scale", "Complete link analytics", "Customizable short links", "URL redirects"],
        },
        {
            title: "QR Codes",
            description: "Create custom QR codes to connect the physical and digital worlds",
            icon: QrCode,
            features: [
                "Fully customizable QR Codes",
                "Dynamic QR Codes",
                "QR Code types & destination options",
                "Advanced analytics & tracking",
            ],
        },
        {
            title: "One link to all",
            description:
                "Get a single short link or QR code for your app, no matter the platform—Apple App Store, Google Play, Microsoft Store, and more.",
            icon: Network,
            features: [
                "Smart routing based on user device and operating system",
                "Support for multiple platforms (iOS, Android, web, etc.)",
                "Custom fallback options for unsupported platforms",
                "Seamless integration with marketing campaigns",
            ],
        },
    ]

    return (
        <section className="py-8 sm:py-16 px-4" id="features">
            <div className="mx-auto max-w-6xl space-y-8 sm:space-y-12">
                <div className="space-y-4 sm:space-y-6">
                    <p className="text-sm sm:text-md font-extralight text-center text-gray-600">
                        GREAT CONNECTIONS START WITH A CLICK OR SCAN
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">The Platform You Need</h2>
                    <p className="text-base sm:text-lg text-center text-gray-600 px-4 sm:px-12">
                        All the products you need to build brand connections, manage links and QR Codes, and connect with audiences
                        everywhere, in a single unified platform.
                    </p>
                    <div className="flex justify-center">
                        <Link href="/login">
                            <Button className="text-base sm:text-xl group flex items-center gap-1">
                                <span>Get Started</span>
                                <ArrowRight
                                    size={20}
                                    className="duration-200 transition-transform ease-in-out group-hover:translate-x-2"
                                />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="relative bg-gray-50 w-full mx-auto group border hover:border-primary overflow-hidden transition-colors"
                        >
                            <CardHeader>
                                <div className="min-h-[350px] lg:min-h-[370px]">
                                    <feature.icon className="w-8 h-8 sm:w-12 sm:h-12 text-primary mb-4" />
                                    <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent
                                className={cn(
                                    "absolute bottom-[-100%] translate-y-[-110px] md:translate-y-[-110px] lg:translate-y-[-150px] w-full group-hover:translate-y-[0] top-full group-hover:top-0 group-hover:bottom-0 transition-all duration-500 ease-in-out",
                                    "bg-white border rounded-xl py-4",
                                    "flex flex-col justify-between gap-4",
                                )}
                            >
                                <ArrowUp
                                    size={20}
                                    className={cn(
                                        "absolute right-3 top-3",
                                        "transition-all duration-500 ease-in-out",
                                        "group-hover:rotate-180",
                                    )}
                                />
                                <div className="flex gap-2 flex-col">
                                    <p className="text-gray-600 flex gap-2 items-center text-md font-semibold">
                                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                        <span>{feature.title}</span>
                                    </p>
                                    <p className="text-gray-600 min-h-[60px] md:min-h-[90px] text-xs sm:text-sm">{feature.description}</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-xs sm:text-sm font-bold">Popular {feature.title} Features</p>
                                        <ul className="text-xs sm:text-sm flex flex-col gap-1">
                                            {feature.features.map((item, index) => (
                                                <li key={index} className="grid grid-cols-[12px_1fr] items-center gap-1">
                                                    <CheckCircle className="text-primary" size={12} />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-2 mt-2">
                                        <Link href="/login" className="w-full block">
                                            <Button
                                                size={"sm"}
                                                className="rounded w-full text-xs sm:text-sm group flex items-center justify-center gap-1"
                                            >
                                                <span>Get Started for free</span>
                                                <ArrowRight
                                                    size={16}
                                                    className="duration-200 transition-transform ease-in-out group-hover:translate-x-2"
                                                />
                                            </Button>
                                        </Link>
                                        <Link href="https://docs.rwps.in" target="_blank" className="w-full block">
                                            <Button
                                                size={"sm"}
                                                variant={"outline"}
                                                className="rounded w-full text-xs sm:text-sm group flex items-center justify-center gap-1"
                                            >
                                                <span>Learn more</span>
                                                <ArrowRight
                                                    size={16}
                                                    className="duration-200 transition-transform ease-in-out group-hover:translate-x-2"
                                                />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

