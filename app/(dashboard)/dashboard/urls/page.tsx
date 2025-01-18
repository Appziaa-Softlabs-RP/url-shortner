'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { LinkItem } from '@/types/links'
import { Calendar, Copy, Edit, Lock, MoreHorizontal, Share2, Tag } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'


export const demoLinks: LinkItem[] = [
    {
        id: '1',
        title: 'Manav Verma',
        short_url: 'bit.ly/manaver',
        short_code: 'manaver',
        long_url: 'https://manavverma.in/',
        clickData: true,
        createdAt: 'Jan 18, 2025',
        tags: []
    },
    {
        id: '2',
        title: 'Vinit Verma',
        short_url: 'bit.ly/vinit',
        short_code: 'vinit',
        long_url: 'https://vinit.in/',
        clickData: true,
        createdAt: 'Jan 18, 2025',
        tags: []
    }
]



export default function LinksPage() {
    const [selectedLinks, setSelectedLinks] = useState<string[]>([])

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">RWPS Url</h1>
                <Link href="/dashboard/urls/new">
                    <Button className="bg-[#0047FF]">Create Url</Button>
                </Link>
            </div>

            <div className="flex gap-4 mb-6">
                <Button variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Filter by created date
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                    <span className="font-medium">Add filters</span>
                </Button>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={selectedLinks.length > 0}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    setSelectedLinks(demoLinks.map(link => link.id))
                                } else {
                                    setSelectedLinks([])
                                }
                            }}
                        />
                        <span className="text-sm text-gray-600">{selectedLinks.length} selected</span>
                    </div>
                    <Button variant="ghost" className="flex items-center gap-2" disabled={selectedLinks.length === 0}>
                        <Lock className="h-4 w-4" />
                        Export
                    </Button>
                    <Button variant="ghost" className="text-gray-600" disabled={selectedLinks.length === 0}>
                        Hide
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2" disabled={selectedLinks.length === 0}>
                        <Tag className="h-4 w-4" />
                        Tag
                    </Button>
                </div>
                <Select defaultValue="active">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Show: Active" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Show: Active</SelectItem>
                        <SelectItem value="inactive">Show: Inactive</SelectItem>
                        <SelectItem value="all">Show: All</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-4">
                {demoLinks.map((link) => (
                    <div key={link.id} className="bg-white rounded-lg border p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <Checkbox
                                    checked={selectedLinks.includes(link.id)}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setSelectedLinks([...selectedLinks, link.id])
                                        } else {
                                            setSelectedLinks(selectedLinks.filter(id => id !== link.id))
                                        }
                                    }}
                                />
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>MV</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{link.title}</span>
                                    </div>
                                    <a href={`https://${link.short_url}`} className="text-blue-600 hover:underline block mb-1">
                                        {link.short_url}
                                    </a>
                                    <a href={link.long_url} className="text-gray-600 hover:underline block">
                                        {link.long_url}
                                    </a>
                                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                                        {link.clickData && (
                                            <Button variant="ghost" size="sm" className="h-auto p-0">
                                                Click data
                                            </Button>
                                        )}
                                        <span>{link.createdAt}</span>
                                        {link.tags.length > 0 && (
                                            <div className="flex items-center gap-1">
                                                <Tag className="h-4 w-4" />
                                                {link.tags.join(', ')}
                                            </div>
                                        )}
                                        {link.tags.length === 0 && <span>No tags</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

