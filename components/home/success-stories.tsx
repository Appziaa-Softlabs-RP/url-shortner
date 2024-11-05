'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const successStories = [
    {
        title: 'Global Tech Giant Streamlines Hiring',
        description: 'How we helped a Fortune 500 company reduce time-to-hire by 40%',
        image: '/placeholder.svg?height=200&width=300',
    },
    {
        title: 'Startup Scales Recruitment Efficiently',
        description: 'Enabling a fast-growing startup to hire 100+ employees in 3 months',
        image: '/placeholder.svg?height=200&width=300',
    },
    {
        title: 'Healthcare Provider Improves Talent Retention',
        description: 'Reducing turnover by 25% through data-driven engagement strategies',
        image: '/placeholder.svg?height=200&width=300',
    },
    {
        title: 'Retail Chain Optimizes Workforce Planning',
        description: 'Saving millions annually with AI-powered scheduling and forecasting',
        image: '/placeholder.svg?height=200&width=300',
    },
]

export default function SuccessStories() {
    const [selectedStory, setSelectedStory] = useState(null)

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Client Success Stories</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {successStories.map((story, index) => (
                        <Card key={index} className="overflow-hidden">
                            <CardContent className="p-0">
                                <Image
                                    src={story.image}
                                    alt={story.title}
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">{story.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{story.description}</p>
                                    <Button variant="link" className="p-0" onClick={() => setSelectedStory(story)}>
                                        Read More
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>

                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <AnimatePresence>
                {selectedStory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                        onClick={() => setSelectedStory(null)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="bg-white p-6 rounded-lg max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold mb-4">{selectedStory.title}</h3>
                            <p className="mb-4">{selectedStory.description}</p>
                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                ex ea commodo consequat.
                            </p>
                            <Button onClick={() => setSelectedStory(null)}>Close</Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}