'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'

const slides = [
    {
        title: 'Bridging Talent and Opportunity with Precision, Diversity, and Speed.',
        subtitle: '',
    }
    // {
    //     title: 'Streamline your hiring process',
    //     subtitle: 'Leverage AI to find the best candidates faster',
    // },
    // {
    //     title: 'Data-driven HR decisions',
    //     subtitle: 'Optimize your workforce with advanced analytics',
    // },
]

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)

    // const nextSlide = () => setCurrentSlide((prev: any) => (prev + 1) % slides.length)
    // const prevSlide = () => setCurrentSlide((prev: any) => (prev - 1 + slides.length) % slides.length)

    return (
        <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="container mx-auto px-4 py-40">
                <div className="relative max-w-3xl mx-auto text-center">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{slides[currentSlide]?.title}</h1>
                        <p className="text-xl md:text-2xl mb-8">{slides[currentSlide]?.subtitle}</p>
                    </motion.div>
                    <div className="flex justify-center gap-4">
                        <Button className="bg-primary text-white hover:bg-primary">Learn More</Button>
                        <Link href="/#contact">
                            <Button variant="outline">Contact Us</Button>
                        </Link>
                    </div>
                    {/* <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full"
                        onClick={prevSlide}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full"
                        onClick={nextSlide}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button> */}
                </div>
            </div>
        </section>
    )
}