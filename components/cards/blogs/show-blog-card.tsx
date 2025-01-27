"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/types/blogs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ShowBlogCard({ blog }: { blog: BlogPost }) {
    return (
        <Link href={`/blog/${blog?.slug}`}>
            <Card className="border-0 group bg-gray-100 h-full">
                <CardContent className="p-0 grid h-full">
                    <div className="aspect-video relative">
                        <Image
                            src={blog.cover_image || "/placeholder.svg"}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            unoptimized={true}
                        />
                    </div>
                    <div className="p-4 grid gap-4">
                        <p>{new Date(blog.created_at).toLocaleDateString()}</p>
                        <h3 className="text-md font-semibold line-clamp-2">
                            {blog.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {blog.description}
                        </p>
                        <div className="py-3">
                            <div
                                className="flex gap-2 w-fit cursor-pointer"
                            >
                                <span className="border-b-[1px] group-hover:text-primary border-black group-hover:border-primary transition-all duration-400 ease-in-out">
                                    Read
                                </span>
                                <ArrowRight className="text-primary -rotate-45 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:opacity-0 transition-all duration-400 ease-in-out" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}