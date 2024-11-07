'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ArrowBigLeft, File } from "lucide-react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LegalPolicyForm({ data = null, token }: { data?: any, token: string }) {
    const [title, setTitle] = useState(data?.title ?? '')
    const [description, setDescription] = useState(data?.description ?? '')
    const [file, setFile] = useState<File | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            if (file) formData.append('file', file)

            if (data) formData.append('_method', 'PUT')

            const apiUrl = data
                ? `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/legal-policies/${data.id}`
                : `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/legal-policies`

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
                cache: 'no-cache'
            })

            const json = await res.json()

            if (res.ok) {
                toast({
                    variant: 'default',
                    title: 'Success',
                    description: json?.message
                })
                if (!data) {
                    setTitle('')
                    setDescription('')
                } else {
                    router.push('/admin/dashboard/legal-policies')
                }
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: json.message
                })
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error?.message
            })
        }
    }

    return (
        <div className="grid gap-4">
            <Link href="/admin/dashboard/legal-policies">
                <Button className="flex gap-2 items-center">
                    <ArrowBigLeft />
                    <span>Back</span>
                </Button>
            </Link>
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>{data ? 'Edit Legal Policy' : 'Add New Legal Policy'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="file">Upload File</Label>
                            <Input
                                id="file"
                                type="file"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                accept=".pdf"
                            />
                        </div>
                        {/* show pdf file */}
                        {
                            data?.file &&
                            <a href={data?.file} target="_blank" className="text-blue-500 underline h-fit w-fit flex gap-2 items-center">
                                <File />
                                <p>{data?.title}.pdf</p>
                            </a>
                        }
                        <Button type="submit" className="w-full">
                            {data ? 'Update Legal Policy' : 'Add Legal Policy'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}