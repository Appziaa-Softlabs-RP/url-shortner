"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ArrowRight, Link, QrCode } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Label } from "../ui/label"
import styles from "./shortner.module.css"

export function ShortnerUI() {
    const [url, setUrl] = useState("")
    const [type, setType] = useState('url');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!url) return

        router.push('/login')
    }

    const isUrl = type === 'url';

    const btnTypes = [
        {
            name: "Short link",
            value: "url",
            icon: Link,
            coming_soon: false
        },
        {
            name: "QR code",
            value: "qr",
            icon: QrCode,
            coming_soon: false
        }
    ]

    return (
        <div>
            <div className="flex gap-2">
                {
                    btnTypes.map((btn, index) => {
                        const isActive = btn.value === type;
                        return <Button
                            key={index}
                            onClick={
                                () => setType(btn.value)
                            }
                            disabled={btn.coming_soon ?? true}
                            variant={'ghost'}
                            className={cn(
                                "text-lg py-6 hover:bg-slate-50 hover:text-primary rounded-b-none",
                                "flex gap-2 bg-white border-b-white text-slate-500 border-b-4",
                                isActive && "border-primary text-primary"
                            )}>
                            <btn.icon />
                            <span className="hidden sm:block">
                                {btn.name}
                                <span className="text-xs"> {btn.coming_soon && "(Coming Soon)"}</span>
                                </span>
                        </Button>
                    })}
            </div>
            <div className="bg-white rounded-3xl rounded-tl-none p-6 md:p-12 mb-8 grid gap-8">
                <div className="grid gap-2">
                    <h2 className="text-[#0B1736] text-xl sm:text-2xl md:text-3xl font-semibold">
                        {
                            isUrl ?
                                "Shorten a long link"
                                : "Generate a QR Code"
                        }
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm">No credit card required.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8 text-black">
                    <div className="grid gap-2">
                        <Label className="text-sm font-bold">
                            {
                                isUrl ?
                                    "Paste your long link here"
                                    : "Enter your QR Code destination"
                            }
                        </Label>
                        <Input
                            type="url"
                            placeholder="Paste long URL here"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-grow h-12 px-4 text-[14px] border-2 border-gray-300 focus:border-[#5D91FA]"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        size={'lg'}

                        className={cn(
                            "flex gap-2 w-fit px-8 py-6 group",
                            styles.responsiveBtnTextLg
                        )}
                    >
                        <span>
                            {
                                isUrl ?
                                    "Get your link"
                                    : "Generate QR Code"
                            }&nbsp;for free
                        </span>
                        <ArrowRight size={25}
                            className="duration-200 transition-transform group-hover:translate-x-2"
                        />
                    </Button>
                </form>
            </div>
        </div>
    )
}

