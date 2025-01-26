"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ArrowRight, Link } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Label } from "../ui/label"

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
            icon: Link
        },
        // {
        //     name: "QR Code",
        //     value: "qr",
        //     icon: QrCode
        // }
    ]

    return (
        <>
            <div className="p-4 flex gap-4 justify-center items-center">
                {
                    btnTypes.map((btn, index) => {
                        const isActive = btn.value === type;
                        return <Button
                            key={index}
                            onClick={
                                () => setType(btn.value)
                            }
                            variant={'ghost'}
                            className={cn(
                                "text-lg py-6 hover:bg-white/10 hover:text-white",
                                "flex gap-2",
                                isActive && "bg-white text-black hover:bg-slate-100 hover:text-black"
                            )}>
                            <btn.icon />
                            <span className="hidden sm:block">{btn.name}</span>
                        </Button>
                    })}
            </div>
            <div className="bg-white rounded-3xl p-6 md:p-12 mb-8 grid gap-8">
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
                        <Label className="text-md font-bold">
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
                            className="flex-grow h-12 text-lg px-4 fs-[14px] border-2 border-gray-300 focus:border-[#5D91FA]"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        size={'lg'}
                        className="text-md flex gap-2 w-fit px-8 py-6 group"
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
        </>
    )
}

