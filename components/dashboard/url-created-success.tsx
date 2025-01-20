"use client"
import { UrlItem } from "@/types/links";
import { LinkCreatedDialog } from "./link-created-popup";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UrlCreatedSuccess({ data, shortCode, isNew = false }: {
    data: UrlItem,
    shortCode: string,
    isNew?: boolean
}) {
    const [isOpen, setIsOpen] = useState(isNew)

    const searchParams = useSearchParams();
    const router = useRouter()

    useEffect(() => {
        if (isNew) {
            // Create a new URLSearchParams object from the current search parameters
            const params = new URLSearchParams(searchParams.toString());

            // Delete the 'new' parameter
            params.delete("new");

            // Construct the new URL without the 'new' query parameter
            const newUrl = `${window.location.pathname}?${params.toString()}`;

            // Use the native history.replaceState method to update the URL without reloading the page
            router.replace(newUrl);
        }
    }, [isNew, searchParams]);

    return <>
        <LinkCreatedDialog
            url={data.short_url}
            isOpen={isOpen}
            shortCode={shortCode}
            onClose={() => { setIsOpen(false) }}
        />
    </>
}