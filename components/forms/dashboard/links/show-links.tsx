'use client'

import ShowUrlCard from "@/components/cards/url/show-url-card"
import { Button } from "@/components/ui/button"
import { UrlItem } from '@/types/links'
import Link from 'next/link'

export default function ShowLinks({ links, token }: {
    links: UrlItem[],
    token: string
}) {
    return (
        <div className="container p-0 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">RWPS Url</h1>
                <Link href="/dashboard/urls/new">
                    <Button className="bg-[#0047FF]">Create Url</Button>
                </Link>
            </div>

            {/* <div className="flex gap-4 mb-6">
                <Button variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Filter by created date
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                    <span className="font-medium">Add filters</span>
                </Button>
            </div> */}

            <div className="grid gap-4">
                {links?.map((link) => (
                    <ShowUrlCard key={link.id} data={link}
                        token={token}
                    />
                ))}
            </div>
        </div>
    )
}

