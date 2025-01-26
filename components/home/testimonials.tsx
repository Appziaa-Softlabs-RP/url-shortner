"use client"

import { useRef } from 'react'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SkewCard1 from '../cards/testimonials/skew-card-1'
import SkewCard2 from '../cards/testimonials/skew-card-2'
import SkewCard3 from '../cards/testimonials/skew-card-3'

const testimonials = [
    {
        id: 1,
        name: "Harsha",
        image: "/placeholder.svg",
        quote: "RWPS has transformed our link management completely. The analytics provide deep insights into our customer behavior, making it an invaluable tool for our marketing strategy.",
        rating: 5
    },
    {
        id: 2,
        name: "Gautam Kumar",
        image: "/placeholder.svg",
        quote: "The ease of use and comprehensive analytics make RWPS stand out. We've seen a significant improvement in our campaign tracking since switching to this platform.",
        rating: 4
    },
    {
        id: 3,
        name: "Deepa",
        image: "/placeholder.svg",
        quote: "As a content creator, RWPS has simplified my workflow immensely. The custom branding options and detailed click analytics help me optimize my content strategy effectively.",
        rating: 4
    },
    {
        id: 4,
        name: "Deepa",
        image: "/placeholder.svg",
        quote: "As a content creator, RWPS has simplified my workflow immensely. The custom branding options and detailed click analytics help me optimize my content strategy effectively.",
        rating: 4
    },
    {
        id: 6,
        name: "Deepa",
        image: "/placeholder.svg",
        quote: "As a content creator, RWPS has simplified my workflow immensely. The custom branding options and detailed click analytics help me optimize my content strategy effectively.",
        rating: 4
    }
]

const CardPattern = ({ type }: { type: 'left' | 'center' | 'right' }) => {
    const patterns = {
        left: "M0,100 C150,100 150,50 300,50 L300,300 L0,300 Z",
        center: "M0,50 C150,50 150,100 300,100 L300,300 L0,300 Z",
        right: "M0,50 C150,50 150,100 300,100 L300,300 L0,300 Z"
    }

    return (
        <div className="absolute inset-0 overflow-hidden">
            <svg
                viewBox="0 0 300 300"
                className="w-full h-full absolute"
                style={{
                    transform: type === 'right' ? 'scaleX(1.05)' : 'scaleX(0.95)'
                }}
            >
                <path
                    d={patterns[type]}
                    fill="#8B4513"
                    opacity="0.1"
                />
            </svg>
        </div>
    )
}

export function Testimonials() {
    const swiperRef = useRef(null)

    return (
        <section className="py-20 sm:px-4 bg-gradient-to-b from-blue-100 to-white">
            <div className="container p-2 mx-auto max-w-7xl">
                <div className='relative grid sm:grid-cols-[1fr_500px_1fr] gap-4 justify-center items-center'>
                    <div className='w-full hidden sm:flex justify-end'>
                        <button className="custom-prev z-10 w-12 h-12 flex items-center justify-center">
                            <ChevronLeft size={50} />
                        </button>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-700 text-center">
                        What Our Customers Say
                    </h2>
                    <div className='grid grid-cols-2 gap-8'>
                        <div className='w-full flex md:hidden flex-sm-hidden justify-end'>
                            <button className="custom-prev z-10 w-12 h-12 flex items-center justify-center">
                                <ChevronLeft size={50} />
                            </button>
                        </div>
                        <div className='w-full flex justify-start'>
                            <button className="custom-next  z-10 w-12 h-12 flex items-center justify-center">
                                <ChevronRight size={50} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={30}
                        slidesPerView={3}
                        centeredSlides={true}
                        loop={true}
                        navigation={{
                            prevEl: '.custom-prev',
                            nextEl: '.custom-next',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.custom-pagination',
                            bulletClass: 'inline-block w-2.5 h-2.5 mx-1 rounded-full bg-gray-300 cursor-pointer transition-colors',
                            bulletActiveClass: '!bg-pink-500'
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            }
                        }}
                        onSwiper={(swiper) => {
                            // @ts-ignore
                            swiperRef.current = swiper
                        }}
                        className="py-16"
                    >
                        {testimonials.map((testimonial, index) => {
                            const activeCard = (testimonial.id) % 3;
                            return <SwiperSlide key={index} className='my-24 w-full'>
                                {({ isActive }) => (
                                    <div key={index}
                                        className={cn(
                                            "max-w-[450px]",
                                            "transition-all duration-150 ease-in-out flex items-center justify-center",
                                            isActive && "sm:scale-110"
                                        )}
                                    >
                                        {
                                            activeCard === 1 ? <SkewCard1 data={testimonial} /> :
                                                activeCard === 0 ? <SkewCard2 data={testimonial} /> :
                                                    <SkewCard3 data={testimonial} />
                                        }
                                    </div>
                                )}
                            </SwiperSlide>
                        })}
                    </Swiper>

                    {/* Custom Pagination */}
                    <div className="custom-pagination flex justify-center gap-2"></div>
                </div>
            </div>
        </section>
    )
}