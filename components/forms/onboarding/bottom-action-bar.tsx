import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BottomActionBar({ handleSkip, backLink = null, last = false }:
    {
        handleSkip: () => void,
        backLink?: string | null,
        last?: boolean | null
    }
) {
    return <>   <div className="flex gap-2 items-center justify-between fixed bottom-0 w-screen bg-white left-0 right-0 py-4 px-4 border-t-[1px]">
        <Button className="rounded sm:w-fit" type={
            last ? "submit" : "button"
        }
            variant="outline" onClick={handleSkip}>
            Skip
        </Button>
        <div className="flex gap-2 justify-end">
            {
                backLink ?
                    <Link href={backLink}>
                        <Button className="rounded group flex gap-1" type="button"
                            variant="outline">
                            <ChevronLeft size={18} className="transition-all duration-300 ease-in-out group-hover:-translate-x-1" />
                            <span>Back</span>
                        </Button>
                    </Link>
                    : null}
            <Button className="rounded group flex gap-1"
                type="submit">
                <span>
                    {
                        last ? "Finish" : "Continue"
                    }
                </span>
                <ChevronRight size={18} className="transition-all duration-300 ease-in-out group-hover:translate-x-1" />
            </Button>
        </div>
    </div>
    </>
}