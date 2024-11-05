'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const presenceItems = [
    { icon: '/placeholder.svg?height=40&width=40', label: 'Global Offices' },
    { icon: '/placeholder.svg?height=40&width=40', label: 'Partner Network' },
    { icon: '/placeholder.svg?height=40&width=40', label: 'Local Support' },
    { icon: '/placeholder.svg?height=40&width=40', label: '24/7 Availability' },
]

export default function GlobalPresence() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Our Global Presence</h2>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-[400px] mb-8"
                >
                    <Image src="/placeholder.svg?height=400&width=800" alt="World Map" fill className="object-contain" />
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {presenceItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center"
                        >
                            <Image src={item.icon} alt="" width={40} height={40} className="mb-4" />
                            <div className="font-medium">{item.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}