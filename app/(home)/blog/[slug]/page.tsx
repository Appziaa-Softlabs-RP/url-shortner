import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const getBlog = async ({ slug }: { slug: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/blogs/${slug}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    }).then(res => res.json());
    return res?.data;
}

export default async function Page({ params }: { params: { slug: string } }) {

    const data = await getBlog({
        slug: params.slug
    });

    const blog = data?.blog;
    const categories = data?.categories;


    return (
        <div className="min-h-screen bg-background">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar */}
                    <aside className="space-y-6">
                        <div className="sticky top-[80px] max-w-[calc(100vh-80px)] overflow-y-auto">
                            <h2 className="text-lg font-semibold mb-4">Categories</h2>
                            <nav className="space-y-2">
                                {categories?.map((category: any) => (
                                    <Link
                                        key={category.name}
                                        href={`/blogs/${category?.slug}`}
                                        className="block text-blue-500 hover:text-primary"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </nav>
                            <Link
                                href="/blogs/latest"
                            >
                                <Button variant="link" className="mt-2 p-0">
                                    See all categories
                                </Button>
                            </Link>
                        </div>
                    </aside>

                    {/* Article Content */}
                    <article className="space-y-8">
                        <div>
                            {
                                blog?.categories?.map((category: any) => (
                                    <Link
                                        key={category.name}
                                        href={`/blogs/${category?.slug}`}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        {category.name}
                                    </Link>
                                ))
                            }
                            <h1 className="text-3xl font-bold mt-2 mb-4">
                                {blog?.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{new Date(blog?.created_at).toLocaleDateString()}</span>
                                {/* <Button variant="ghost" size="icon" className="ml-auto">
                                    <Share2 className="h-4 w-4" />
                                    <span className="sr-only">Share</span>
                                </Button> */}
                            </div>
                        </div>

                        <Card className="p-6">
                            <h2 className="font-semibold mb-4">
                                Excerpt
                            </h2>
                            <p className="text-muted-foreground">
                                {blog?.description}
                            </p>
                        </Card>

                        <Image
                            src={blog?.image}
                            alt="Blog Image"
                            width={800}
                            height={400}
                            className="rounded-lg w-full"
                        />

                        <p className="leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
                        </p>
                    </article>
                </div>
            </div>
        </div>
    )
}