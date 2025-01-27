import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import Share from "./share-blog"
import { getBlog } from "@/api/blogsApi"

const getBlogData = async ({ slug }: { slug: string }) => {
    try {
        return await getBlog({
            slug: slug
        });
    } catch (e) {
        return null
    }
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;

    const data = await getBlogData({ slug: params.slug })
    const blog = data?.blog

    return {
        title: `${blog?.meta_title || blog?.title} | ${process.env.NEXT_PUBLIC_APP_NAME}`,
        description: blog?.meta_description || blog?.description,
        openGraph: {
            title: blog?.meta_title || blog?.title,
            description: blog?.meta_description || blog?.description,
            images: [{ url: blog?.cover_image }],
            type: 'article',
            publishedTime: blog?.created_at,
            tags: blog?.categories?.map((category: any) => category.name),
        },
        twitter: {
            card: 'summary_large_image',
            title: blog?.meta_title || blog?.title,
            description: blog?.meta_description || blog?.description,
            images: [blog?.cover_image],
        },
    }
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const data = await getBlogData({ slug: params.slug })

    const { blog, categories } = data

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative my-8">
                <div className="text-center text-black">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto">
                        {blog?.title}
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar */}
                    <aside className="order-2 lg:order-1 space-y-6 lg:sticky lg:top-[80px] lg:self-start">
                        <div className="overflow-y-auto">
                            <h2 className="text-lg font-semibold mb-4">Categories</h2>
                            <nav className="space-y-2">
                                {categories?.map((category: any) => (
                                    <Link
                                        key={category.name}
                                        href={`/blogs/${category?.slug}`}
                                        className="block text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </nav>
                            <Link href="/blogs/latest">
                                <Button variant="link" className="mt-4 p-0">
                                    See all categories
                                </Button>
                            </Link>
                        </div>
                    </aside>

                    {/* Article Content */}
                    <article className="order-1 lg:order-2 space-y-8 max-w-3xl">
                        <div className="grid grid-cols-[1fr_80px] my-4 items-center gap-4">
                            <div className="flex flex-wrap gap-2 w-full">
                                {blog?.categories?.map((category: any) => (
                                    <Link
                                        key={category.name}
                                        href={`/blogs/${category?.slug}`}
                                        className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="flex items-center justify-between">
                                <Share />
                            </div>
                        </div>
                        <Image
                            src={blog?.cover_image}
                            alt="Blog Image"
                            width={800}
                            height={400}
                            className="rounded-lg w-full mb-5"
                            unoptimized={true}
                        />

                        <Card className="p-6 bg-muted">
                            <h2 className="font-semibold mb-4">
                                Excerpt
                            </h2>
                            <p className="text-muted-foreground">
                                {blog?.description}
                            </p>
                        </Card>

                        <div className="prose lg:prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

