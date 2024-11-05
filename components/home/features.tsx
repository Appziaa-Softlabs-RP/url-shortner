'use client'

import { motion } from 'framer-motion'

const features = [
    {
        title: 'Precision in Talent Matching',
        description: 'Using our AI-powered platform, we connect clients with top talent that aligns both professionally and culturally, ensuring seamless integration and long-term success.',
    },
    {
        title: 'Dedicated to Diversity and Inclusion',
        description: 'We believe that a diverse workforce drives innovation. By actively sourcing candidates from varied backgrounds, we foster a culture of inclusivity that enhances team dynamics and performance. ',
    },
    {
        title: 'Speed and Efficiency for Today’s Market',
        description: 'With one of the best turnaround times in the industry, our streamlined processes deliver high-quality placements quickly, reducing hiring timelines without compromising on quality. ',
    },
]

export default function Features() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className='text-2xl font-bold text-center mb-10'>
                    We define our work commitment through
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white p-6 rounded-lg shadow-lg text-center"
                        >
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}