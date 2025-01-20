'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, Copy } from 'lucide-react'
import { useState } from "react"

// Import Swiper styles
import { cn } from "@/lib/utils"
import { SharableSocials } from "./sharable-socials"

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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto px-2 sm:px-4  sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-start text-2xl text-primary my-4">Share your RWPS Link</DialogTitle>
                </DialogHeader>
                <div className="relative max-w-full overflow-hidden flex flex-col gap-8">
                    <SharableSocials
                        url={url}
                    />
                    <div className={cn(
                        "flex items-center flex-col gap-6 rounded p-4",
                        copied ? "bg-green-600/10" : "bg-primary/10"
                    )}>
                        <p className={cn(
                            "font-bold",
                            copied ? "text-green-700" : "text-primary"
                        )}>
                            {url}
                        </p>
                        <Button
                            type="submit"
                            size="lg"
                            className={cn(
                                "px-3 flex gap-2 items-center shadow-none rounded",
                                copied && "bg-green-600/20 text-green-700 hover:text-green-700 hover:bg-green-600/20"
                            )}
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                            <span>
                                {
                                    copied ?
                                        <span>Copied</span> :
                                        <span>Copy</span>
                                }
                            </span>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

