'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function CTA() {
    return (
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-4">Ready to revolutionize your HR?</h2>
                    <p className="mb-8 text-gray-300">Connect with our experts to explore the possibilities</p>
                    <Button>Request Demo</Button>
                </motion.div>
            </div>
        </section >
    )
}