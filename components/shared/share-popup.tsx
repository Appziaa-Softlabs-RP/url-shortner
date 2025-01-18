'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Check, Copy } from 'lucide-react'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from 'next-share'
import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

interface ShareDialogProps {
    url: string
    isOpen: boolean
    onClose: () => void
}

export function ShareDialog({ url, isOpen, onClose }: ShareDialogProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const shareButtons = [
        {
            Component: WhatsappShareButton,
            icon: "/icons/whatsapp.svg",
            label: "WhatsApp"
        },
        {
            Component: FacebookShareButton,
            icon: "/icons/facebook.svg",
            label: "Facebook"
        },
        {
            Component: TwitterShareButton,
            icon: "/icons/twitter.svg",
            label: "X"
        },
        {
            Component: LinkedinShareButton,
            icon: "/icons/threads.svg",
            label: "Threads"
        },
        {
            Component: EmailShareButton,
            icon: "/icons/gmail.svg",
            label: "Email"
        },
        {
            Component: TelegramShareButton,
            icon: "/icons/telegram.svg",
            label: "Telegram"
        },
        {
            Component: RedditShareButton,
            icon: "/icons/reddit.svg",
            label: "Reddit"
        },
    ]

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-start text-2xl">Share your RWPS Link</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 sm:max-w-md">
                    <div className="relative">
                        <Swiper
                            spaceBetween={8}
                            slidesPerView="auto"
                            className="w-full"
                        >
                            {shareButtons.map(({ Component, icon, label }) => (
                                <SwiperSlide key={label} className="!w-auto">
                                    <Component url={url} title="Check this out!">
                                        <Button
                                            variant="outline"
                                            className="h-auto p-2 flex flex-col items-center gap-1"
                                        >
                                            <img src={icon || "/placeholder.svg"} alt={label} className="w-8 h-8" />
                                            <span className="text-xs">{label}</span>
                                        </Button>
                                    </Component>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input
                            value={url}
                            readOnly
                            className="flex-1"
                        />
                        <Button
                            type="submit"
                            size="sm"
                            className="px-3"
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                            <span className="sr-only">Copy</span>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

