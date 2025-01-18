import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function UseCases() {
    const cases = [
        {
            title: "Attract customers and keep loyal shoppers coming back",
            description: "Whether you're a brick-and-mortar shop or a major department store, create mobile-optimized experiences that keep customers engaged and drive more foot traffic.",
            image: "/placeholder.svg?height=300&width=400",
            cta: "Read More"
        },
        {
            title: "Thriving brands start with raving fans and powerful connections",
            description: "Give customers the power to share about your products and services on social media, creating authentic connections for your brand.",
            image: "/placeholder.svg?height=300&width=400",
            cta: "Read More"
        },
        {
            title: "Delight your guests and meet their every need with easy digital solutions",
            description: "Help your guests find what they need quickly and easily with digital menus, virtual concierge services, and more.",
            image: "/placeholder.svg?height=300&width=400",
            cta: "Read More"
        }
    ]

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold">See how other businesses use URLShort</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {cases.map((case_, index) => (
                        <Card key={index} className="border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="aspect-video relative mb-6">
                                    <Image
                                        src={case_.image}
                                        alt={case_.title}
                                        fill
                                        className="object-cover rounded-lg"
                                        unoptimized={true}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-4">{case_.title}</h3>
                                <p className="text-gray-600 mb-6">{case_.description}</p>
                                <Button variant="link" className="text-[#5D91FA] p-0">
                                    {case_.cta} →
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

