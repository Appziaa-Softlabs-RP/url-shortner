'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select, SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { blogCategory } from "@/constants/data"
import { ArrowBigLeft } from "lucide-react"
import dynamic from 'next/dynamic'
import Image from "next/image"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function BlogForm({ data = null, token, categories }: { data?: any, token: string, categories: blogCategory[] }) {
    const [title, setTitle] = useState(data?.title ?? '')
    const [url, setUrl] = useState(data?.url ?? '')
    const [description, setDescription] = useState(data?.description ?? '')
    const [content, setContent] = useState(data?.content ?? '')
    const [status, setStatus] = useState(data?.status == 1)
    const [image, setImage] = useState<File | null>(null)
    const [category, setCategory] = useState<string | undefined>(data?.category_id.toString() ?? undefined)
    const [featuredImage, setFeaturedImage] = useState<File | null>(null)
    const router = useRouter()

    const toolbarOptions = [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
    ];

    useEffect(() => {
        // Generate url from title
        const generatedUrl = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        setUrl(generatedUrl)
    }, [title])

    const handleCategorySelectChange = (value: string) => {
        setCategory(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('slug', url)
            formData.append('description', description)
            formData.append('content', content)
            formData.append('status', status ? '1' : '0')
            formData.append('category_id', category ?? '');
            if (image) formData.append('image', image as Blob);
            if (featuredImage) formData.append('featured_image', featuredImage)

            if (data) formData.append('_method', 'PUT')

            const apiUrl = data
                ? `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/blogs/${data.id}`
                : `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/blogs`

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
                    setUrl('')
                    setDescription('')
                    setContent('')
                    setStatus(false)
                    setFeaturedImage(null)
                    setCategory(undefined)
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
            <Link href="/admin/dashboard/blogs">
                <Button className="flex gap-2 items-center">
                    <ArrowBigLeft />
                    <span>Back</span>
                </Button>
            </Link>
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>{data ? 'Edit Blog Post' : 'Add New Blog Post'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                            <Label htmlFor="Blog">Upload Blog Image</Label>
                            <Input type="file" id="Blog"
                                onChange={(e) => setImage(e?.target?.files ? e?.target?.files[0] : null)}
                                accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                                required={!data}
                            />
                            {data?.image ?
                                <Image
                                    src={data?.image}
                                    width={50}
                                    height={50}
                                    alt="Blog"
                                    unoptimized={true}
                                />
                                : null
                            }
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Cateogry</Label>
                            <Select
                                onValueChange={handleCategorySelectChange}
                                value={category}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Select Category</SelectItem>
                                    {
                                        categories.map((category) => (
                                            <SelectItem key={category.id} value={(category.id).toString()}>{category.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Excerpt</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                className=" mb-12"
                                modules={{
                                    toolbar: toolbarOptions
                                }}
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