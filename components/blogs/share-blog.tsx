"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Share2 } from 'lucide-react'
import {
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'next-share'
import { usePathname } from 'next/navigation'
import { Button } from "../ui/button"

export default function Share() {
    const pathname = usePathname()
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`
    const message = `I came across this interesting blog and thought it’s worth sharing with you.🌟`

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="ghost" size="icon" className="ml-auto">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center mb-4">
                        Share this Blog
                    </DialogTitle>
                    <DialogDescription>
                        <div className="flex flex-row space-x-4 items-center justify-center">
                            <WhatsappShareButton
                                url={url}
                                title={message}
                            >
                                <WhatsappIcon size={40} round />
                            </WhatsappShareButton>
                            <TwitterShareButton
                                url={url}
                                title={message}
                            >
                                <TwitterIcon size={40} round />
                            </TwitterShareButton>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

