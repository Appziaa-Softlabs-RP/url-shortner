import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function PricingHero() {
    return (
        <section className="bg-gradient-to-r from-white via-blue-50 to-blue-300">
            <div className="container mx-auto p-8 lg:py-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Always Free, No Exceptions</h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Access all RWPS features without any cost, forever. Enjoy unlimited usage and never worry about
                                upgrading to a paid plan.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500" />
                                <span>Loved by 100k+ users worldwide</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500" />
                                <span>Completely free</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500" />
                                <span>Built for privacy and security compliance</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
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
                    </div>
                    <div className="flex max-w-[400px] mx-auto justify-center">
                        <Image
                            src={'/img/save-money.svg'}
                            alt="savings"
                            height={500}
                            width={500}
                        />
                    </div>
                </div>
            </div>
        </section >
    )
}

