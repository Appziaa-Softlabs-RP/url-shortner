'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const partners = [
    { name: 'Partner 1', logo: '/placeholder.svg?height=60&width=120' },
    { name: 'Partner 2', logo: '/placeholder.svg?height=60&width=120' },
    { name: 'Partner 3', logo: '/placeholder.svg?height=60&width=120' },
    { name: 'Partner 4', logo: '/placeholder.svg?height=60&width=120' },
    { name: 'Partner 5', logo: '/placeholder.svg?height=60&width=120' },
    { name: 'Partner 6', logo: '/placeholder.svg?height=60&width=120' },
]

export default function Recognition() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Industry Recognition</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center justify-center"
                        >
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                width={120}
                                height={60}
                                className="opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}