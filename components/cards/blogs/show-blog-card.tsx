"use client"

import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/types/blogs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ShowBlogCard({blog}:{blog: BlogPost}) {

    const limitWords = (text: any, limit: any) => {
        const words = text.split(" ");
        return words.length > limit ? `${words.slice(0, limit).join(" ")}...` : text;
    };

    const titleWordLimit = 30;
    const descriptionWordLimit = 30;

    return <>
        <Card className="border-0 bg-gray-100 h-full">
            <CardContent className="p-0 grii88d h-full">
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
                    <h3 className="text-xl font-semibold">
                        {blog.title.split(" ").length > titleWordLimit
                            ? limitWords(blog.title, titleWordLimit)
                            : `${blog.title}${blog.description.split(" ").length > descriptionWordLimit
                                ? ""
                                : `: ${limitWords(blog.description, descriptionWordLimit)}`
                            }`}
                    </h3>
                    <Link href={`/blog/${blog?.slug}`} className="flex gap-2 w-fit group cursor-pointer">
                        <span className="border-b-[1px] border-black group-hover:border-primary  transition-all duration-400 ease-in-out">Read</span>
                        <ArrowRight className="text-primary -rotate-45 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:opacity-0 transition-all duration-400 ease-in-out" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    </>
}