"use client"

import { Button } from "@/components/ui/button"
import { BlogPost } from "@/types/blogs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ShowBlogCard from "../cards/blogs/show-blog-card"

interface BlogsProps {
    data: BlogPost[]
}

export function ShowBlogs({ data }: BlogsProps) {
    const swiperRef = useRef<SwiperType | null>(null)

    return (
        <section className="py-4 sm:py-16 px-4">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-4 md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => swiperRef.current?.slidePrev()}>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => swiperRef.current?.slideNext()}>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={32}
                    slidesPerView={1}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="overflow-hidden"
                >
                    {data.map((blog, index) => (
                        <SwiperSlide key={blog.id}>
                            <ShowBlogCard blog={blog} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

