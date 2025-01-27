import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { Blog } from "@/types/blogs"
import Image from "next/image"
import Link from "next/link"

interface BlogListProps {
    blogs: Blog[]
}

export function BlogList({ blogs }: BlogListProps) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden">
                    <Link href={`/blog/${blog.slug}`}>
                        <div className="aspect-video overflow-hidden">
                            <Image
                                src={blog.cover_image}
                                alt={blog.title}
                                width={400}
                                height={225}
                                className="h-full w-full object-cover transition-transform hover:scale-105"
                                unoptimized
                            />
                        </div>
                        <CardHeader>
                            <h3 className="line-clamp-2 text-xl font-semibold">{blog.title}</h3>
                            <p className="text-sm text-muted-foreground">
                                {formatDate(blog.created_at)}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <p className="line-clamp-3 text-muted-foreground">
                                {blog.description}
                            </p>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </div>
    )
}

