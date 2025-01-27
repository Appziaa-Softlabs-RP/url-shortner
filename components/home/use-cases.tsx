"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

export function UseCases() {
    const swiperRef = useRef(null)

    const cases = [
        {
            title: "Attract customers and keep loyal shoppers coming back",
            description:
                "Whether you're a brick-and-mortar shop or a major department store, create mobile-optimized experiences that keep customers engaged and drive more foot traffic.",
            image: "/placeholder.svg?height=300&width=400",
            cta: "Read More",
        },
        {
            title: "Thriving brands start with raving fans and powerful connections",
            description:
                "Give customers the power to share about your products and services on social media, creating authentic connections for your brand.",
            image: "/placeholder.svg?height=300&width=400",
            cta: "Read More",
        },
        {
            title: "Delight your guests and meet their every need with easy digital solutions",
            description:
                "Help your guests find what they need quickly and easily with digital menus, virtual concierge services, and more.",
            image: "/placeholder.svg?height=300&width=400",
            cta: "Read More",
        },
    ]

    return (
        <section className="py-4 sm:py-16 px-4">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-4 md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">See how other businesses use URLShort</h2>
                    <div className="flex gap-2">
                        {/* @ts-ignore */}
                        <Button variant="outline" size="icon" onClick={() => swiperRef.current?.slidePrev()}>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        {/* @ts-ignore */}
                        <Button variant="outline" size="icon" onClick={() => swiperRef.current?.slideNext()}>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={32}
                    slidesPerView={1}
                    onBeforeInit={(swiper) => {
                        {/* @ts-ignore */}
                        swiperRef.current = swiper
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="overflow-hidden"
                >
                    {cases.map((case_, index) => (
                        <SwiperSlide key={index}>
                            <Card className="border-0 shadow-lg h-full">
                                <CardContent className="p-6 flex flex-col h-full">
                                    <div className="aspect-video relative mb-6">
                                        <Image
                                            src={case_.image || "/placeholder.svg"}
                                            alt={case_.title}
                                            fill
                                            className="object-cover rounded-lg"
                                            unoptimized={true}
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{case_.title}</h3>
                                    <p className="text-gray-600 mb-6 flex-grow">{case_.description}</p>
                                    <Button variant="link" className="text-[#5D91FA] p-0 self-start">
                                        {case_.cta} →
                                    </Button>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

