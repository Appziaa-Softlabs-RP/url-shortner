'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ArrowBigLeft } from "lucide-react"
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function BlogForm({ data = null, token, categories }: { data?: any, token: string, categories: any[] }) {
    const [title, setTitle] = useState(data?.title ?? '')
    const [slug, setSlug] = useState(data?.slug ?? '')
    const [description, setDescription] = useState(data?.description ?? '')
    const [content, setContent] = useState(data?.content ?? '')
    const [status, setStatus] = useState(data?.status === '1')
    const [featuredImage, setFeaturedImage] = useState<File | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<string[]>(data?.category_ids?.map(String) ?? [])
    const router = useRouter()

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'image', 'video']
    ]

    useEffect(() => {
        // Generate slug from title
        const generatedSlug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        setSlug(generatedSlug)
    }, [title])

    const handleCategorySelectChange = (value: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(value)) {
                return prev.filter(cat => cat !== value)
            } else {
                return [...prev, value]
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('slug', slug)
            formData.append('description', description)
            formData.append('content', content)
            formData.append('status', status ? '1' : '0')
            if (featuredImage) formData.append('featured_image', featuredImage)
            formData.append('category_ids', JSON.stringify(selectedCategories))

            if (data) formData.append('_method', 'PUT')

            const url = data
                ? `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/blogs/${data.id}`
                : `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/blogs`

            const res = await fetch(url, {
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
                    description: data ? 'Blog Updated Successfully' : 'Blog Added Successfully',
                })
                if (!data) {
                    setTitle('')
                    setSlug('')
                    setDescription('')
                    setContent('')
                    setStatus(false)
                    setFeaturedImage(null)
                    setSelectedCategories([])
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
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                URL Preview: {process.env.NEXT_PUBLIC_FRONTEND_URL}/{slug}
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
                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={{
                                    toolbar: toolbarOptions
                                }}
                                className="h-64 mb-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="featuredImage">Featured Image</Label>
                            <Input
                                type="file"
                                id="featuredImage"
                                onChange={(e) => setFeaturedImage(e.target.files ? e.target.files[0] : null)}
                                accept="image/*"
                            />
                            {data?.featured_image && (
                                <Image
                                    src={data.featured_image}
                                    width={100}
                                    height={100}
                                    alt="Featured Image"
                                    className="mt-2"
                                />
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="categories">Categories</Label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <Button
                                        key={category.id}
                                        type="button"
                                        variant={selectedCategories.includes(category.id.toString()) ? "secondary" : "outline"}
                                        onClick={() => handleCategorySelectChange(category.id.toString())}
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
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