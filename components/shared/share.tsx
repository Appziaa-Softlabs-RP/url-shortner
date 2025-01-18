"use client"

import { Share2 } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { ShareDialog } from "./share-popup"

export default function Share({
    url
}: {
    url: string
}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="">
            <Button variant={'outline'}
                onClick={() => setIsOpen(true)}
                className="flex gap-2 items-center rounded-md" size={'sm'}>
                <Share2 size={16} />
                <span>Share</span>
            </Button>
            <ShareDialog
                url={url}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    )
}