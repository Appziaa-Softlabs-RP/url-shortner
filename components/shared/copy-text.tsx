"use client"
import { Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function CopyText({ text }: {
    text: string
}) {

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {

        navigator.clipboard.writeText(text)
            .then(() => {
                // On success, show feedback that the text was copied
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset feedback after 2 seconds
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    };

    return <Button variant={'ghost'}
        onClick={handleCopy}
        className="sbg-slate-200 hover:bg-slate-100 flex gap-2 items-center rounded-md" size={'sm'}>
        <Copy size={16} />
        {
            copied ?
                <span>Copied</span> :
                <span>Copy</span>
        }
    </Button>
}