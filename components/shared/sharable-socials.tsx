"use client"

import { Button } from "@/components/ui/button"
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "next-share"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import "swiper/css"
import Image from "next/image"

interface ShareSocialsProps {
    url: string
}

export function SharableSocials({ url }: ShareSocialsProps) {
    const swiperRef = useRef<any>(null)

    const shareButtons = [
        {
            Component: WhatsappShareButton,
            icon: "/icons/whatsapp.svg",
            label: "WhatsApp",
        },
        {
            Component: FacebookShareButton,
            icon: "/icons/facebook.svg",
            label: "Facebook",
        },
        {
            Component: TwitterShareButton,
            icon: "/icons/twitter.svg",
            label: "X",
        },
        {
            Component: LinkedinShareButton,
            icon: "/icons/threads.svg",
            label: "Threads",
        },
        {
            Component: EmailShareButton,
            icon: "/icons/gmail.svg",
            label: "Email",
        },
        {
            Component: TelegramShareButton,
            icon: "/icons/telegram.svg",
            label: "Telegram",
        },
        {
            Component: RedditShareButton,
            icon: "/icons/reddit.svg",
            label: "Reddit",
        },
    ]

    return (
        <div className="relative px-6">
            <Swiper
                spaceBetween={8}
                slidesPerView="auto"
                className="w-full"
                modules={[Navigation]}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
            >
                {shareButtons.map(({ Component, icon, label }) => (
                    <SwiperSlide key={label} className="!w-auto">
                        <Component url={url} title="Check this out!">
                            <Button variant="outline" className="h-auto p-2 flex flex-col items-center gap-1">
                                <Image
                                    src={icon || "/placeholder.svg"}
                                    alt={label}
                                    className="w-8 h-8"
                                    height={32}
                                    width={32}
                                    unoptimized
                                />
                                <span className="text-xs">{label}</span>
                            </Button>
                        </Component>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Button
                variant="outline"
                size="icon"
                className="flex absolute left-0 top-1/2 -translate-y-1/2 bg-white z-10 rounded-full items-center justify-center"
                onClick={() => swiperRef.current?.slidePrev()}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="flex absolute right-0 top-1/2 -translate-y-1/2 bg-white z-10 rounded-full items-center justify-center"
                onClick={() => swiperRef.current?.slideNext()}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}

