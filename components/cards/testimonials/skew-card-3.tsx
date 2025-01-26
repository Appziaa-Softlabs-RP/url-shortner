import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import Image from "next/image"

export default function SkewCard3({ data }: any) {
    return <div className="relative w-[80%] h-[350px]">
        <div className={cn(
            "relative z-10 w-full h-full rounded-[30px_60px] bg-white",
            "transform skew-[turn(0.06turn)] -skew-y-[15deg]",
            "flex items-center justify-center"
        )}>
            {/* image */}
            <div
                className="h-[100px] w-[100px] bg-slate-200 absolute top-[-40px] skew-y-[15deg] rounded-full"
            >
                <Image
                    src={data.image}
                    alt={data.name}
                    width={100}
                    height={100}
                    className="rounded-full w-full h-full object-cover"
                />
            </div>
            {/* text */}
            <div
                className={cn(
                    "h-[180px] grid grid-rows-[30px_160px_1fr] gap-2 w-[100%] text-center p-2",
                    "absolute top-[70px] skew-y-[15deg]"
                )}
            >
                <p className="overflow-y-auto max-h-full text-lg font-semibold">{data.name}</p>
                <p className="overflow-y-auto max-h-full">{data.quote}</p>
                <div className="flex gap-1 justify-center">
                    {
                        Array.from({ length: data.rating }).map((item, index) => (
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
            "absolute z-[1] bg-[#2E2662] top-[-5px] right-[40px] bottom-0 w-[100%] h-[80%] rounded-[20px_60px]",
            "transform skew-x-[-10deg] translate-x-[40px] translate-y-[20px]"
        )} />
    </div>
}