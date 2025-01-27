"use client"

import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react";

export default function SkewCard1({ data }: any) {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => setIsExpanded(!isExpanded);

    return <div className="relative w-[80%] h-[350px]">
        <div className={cn(
            "relative z-10 w-full h-full rounded-[20px_60px] bg-white",
            "transform skew-[turn(-0.06turn)] -skew-y-[8deg] -skew-x-[8deg_0deg]",
            "flex items-center justify-center"
        )}>
            {/* image */}
            <div
                className="h-[100px] w-[100px] bg-slate-200 absolute top-[-40px] skew-y-[8deg] rounded-full"
            >
                {data.image ? (
                    <Image
                        src={data.image || "/placeholder.svg"}
                        alt={data.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-[100px] h-[100px] border-[1px] rounded-full bg-white flex items-center justify-center text-2xl font-bold text-purple-500">
                        {data.name.charAt(0)}
                    </div>
                )}
            </div>
            {/* text */}
            <div
                className={cn(
                    "h-[180px] grid grid-rows-[30px_160px_1fr] gap-2 w-[100%] text-center p-2",
                    "absolute top-[70px] skew-y-[8deg]"
                )}
            >
                <p className="overflow-y-auto max-h-full text-lg font-semibold">{data.name}</p>
                <p className="overflow-y-auto max-h-full">
                    {data?.quote?.length > 180 ? (
                        <>
                            {isExpanded
                                ? data.quote // Show full text
                                : `${data.quote.slice(0, 180)}...`} {/* Show truncated text */}
                            <button
                                onClick={toggleReadMore}
                                className="text-blue-500 underline ml-2"
                            >
                                {isExpanded ? "Read Less" : "Read More"}
                            </button>
                        </>
                    ) : (
                        data.quote
                    )}
                </p>
                <div className="flex gap-1 justify-center">
                    {
                        Array.from({ length: 5 }).map((item, index) => (
                            <div key={index}>
                                <Star
                                    fill="#facc15"
                                    className="text-yellow-400"
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

        {/* background */}
        <div className={cn(
            "absolute z-[1] bg-[#2E2662] top-[-5px] right-[40px] bottom-0 w-[100%] h-[90%] rounded-[20px_60px] transform skew-[turn(-0.05turn)] skew-x-[-10deg] translate-x-[40px]"
        )} />
    </div>
}