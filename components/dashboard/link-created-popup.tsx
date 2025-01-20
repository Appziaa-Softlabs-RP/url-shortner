'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, Copy, Link as LinkNew } from 'lucide-react'
import { useState } from "react"

// Import Swiper styles
import { cn } from "@/lib/utils"
import { DialogDescription } from "@radix-ui/react-dialog"
import { SharableSocials } from "../shared/sharable-socials"
import Link from "next/link"

interface ShareDialogProps {
    url: string
    shortCode: string
    isOpen: boolean
    onClose: () => void
}

export function LinkCreatedDialog({ url, shortCode, isOpen, onClose }: ShareDialogProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto px-2 sm:px-4  sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-start text-2xl text-primary my-4">Your link is ready🎉</DialogTitle>
                    <DialogDescription className="text-start text-slate-600 text-sm">
                        Copy the link below to share it or choose a platform to share it to.
                    </DialogDescription>
                </DialogHeader>
                <div className="relative max-w-full overflow-hidden flex flex-col gap-8">
                    <div className={cn(
                        "flex items-center flex-col gap-6 rounded p-4",
                        copied ? "bg-green-600/10" : "bg-primary/10"
                    )}>
                        <p className={cn(
                            "font-bold",
                            copied ? "text-green-700" : "text-primary"
                        )}>
                            <Link
                                href={url}
                                target="_blank"
                            >
                                {url}
                            </Link>
                        </p>
                        <div className="flex gap-2 items-center justify-between">
                            <a href={`/dashboard/urls/view/${shortCode}`}>
                                <Button
                                    variant={'outline'}
                                    size={'lg'}
                                    className="flex gap-2 px-4 rounded border-primary border-2 text-primary items-center hover:bg-primary/10">
                                    <LinkNew size={20} />
                                    <span>View link details</span>
                                </Button>
                            </a>
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
                    <SharableSocials
                        url={url}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

