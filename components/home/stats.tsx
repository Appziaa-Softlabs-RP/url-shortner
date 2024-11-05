'use client'

import { motion } from 'framer-motion'

const stats = [
    { number: '24/7', label: 'Support Available' },
    { number: '200,000+', label: 'Candidates Processed' },
    { number: '8,000+', label: 'Success Stories' },
    { number: '95%', label: 'Client Satisfaction' },
]

export default function Stats() {
    return (
        <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                            <div className="text-gray-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}