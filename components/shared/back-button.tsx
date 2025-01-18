import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton({ href, text = 'Back' }: {
    href: string,
    text: string
}) {
    return <Link href={href} className="w-fit">
        <p className="flex gap-2 items-center text-sm text-gray-700 border-b-[1px] border-transparent hover:border-slate-500 w-fit transition-all duration-200 ease-in-out">
            <ChevronLeft size={16} />
            <span>{text}</span>
        </p>
    </Link>
}