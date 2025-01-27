import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function PricingHero() {
    return (
        <section className="bg-gradient-to-r from-white via-blue-50 to-blue-300 py-16 lg:py-24">
            <div className="container mx-auto px-8">
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
                                <Button size="lg" className="rounded-full text-md py-6 px-8 bg-gradient-to-r from-purple-700/80 via-primary/80 to-primary/80 hover:from-purple-700 hover:via-blue-500 hover:to-blue-500 transition-all duration-300 ease-in-out">
                                    Get Started
                                </Button>
                            </Link>
                            {/* <Button size="lg" variant={'outline'} className="rounded-full text-md py-6 px-8">
                                See live demo
                            </Button> */}
                        </div>
                    </div>
                    <Image
                        src={'/img/money.png'}
                        alt="savings"
                        height={500}
                        width={500}
                    />
                </div>
            </div>
        </section >
    )
}

