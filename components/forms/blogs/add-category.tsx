'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ArrowBigLeft } from "lucide-react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BlogCategoryForm({ data = null, token }: { data?: any, token: string }) {
    const [name, setName] = useState(data?.name ?? '')
    const [url, setUrl] = useState(data?.url ?? '')
    const [description, setDescription] = useState(data?.description ?? '')
    const [content, setContent] = useState(data?.content ?? '')
    const [status, setStatus] = useState(data?.status == '1')
    const [featuredImage, setFeaturedImage] = useState<File | null>(null)
    const router = useRouter()

    useEffect(() => {
        // Generate url from name
        const generatedUrl = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        setUrl(generatedUrl)
    }, [name])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('slug', url)
            formData.append('description', description)
            formData.append('content', content)
            formData.append('status', status ? '1' : '0')
            if (featuredImage) formData.append('featured_image', featuredImage)

            if (data) formData.append('_method', 'PUT')

            const apiUrl = data
                ? `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/blog-categories/${data.id}`
                : `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/blog-categories`

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
                    setName('')
                    setUrl('')
                    setDescription('')
                    setContent('')
                    setStatus(false)
                    setFeaturedImage(null)
                } else {
                    router.push('/admin/dashboard/blogs')
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
            <Link href="/admin/dashboard/blog-categories">
                <Button className="flex gap-2 items-center">
                    <ArrowBigLeft />
                    <span>Back</span>
                </Button>
            </Link>
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>{data ? 'Edit Blog Category' : 'Add New Blog Category'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="url">Url</Label>
                            <Input
                                id="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                            <p className="text-sm text-muted-foreground flex flex-wrap gap-2">
                                <span>URL Preview:</span><span>{process.env.NEXT_PUBLIC_BASE_URL}/blog/{url}</span>
                            </p>
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
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="status"
                                checked={status}
                                onCheckedChange={setStatus}
                            />
                            <Label htmlFor="status">Active</Label>
                        </div>
                        <Button type="submit" className="w-full">
                            {data ? 'Update Blog Post' : 'Add Blog Post'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}