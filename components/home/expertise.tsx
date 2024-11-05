'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const expertiseAreas = [
    {
        title: 'Talent Acquisition and Hiring',
        content:
            'We provide end-to-end recruitment solutions, from sourcing and screening to onboarding, ensuring you hire the right talent that fits both the role and your company culture.',
    },
    {
        title: 'Payroll Management',
        content:
            'Simplify your payroll process with our secure, compliant, and seamless payroll services, designed to save time and reduce administrative burdens for your HR team.',
    },
    {
        title: 'Consulting',
        content:
            'Our experienced consultants offer strategic guidance in workforce planning, compliance, and talent management to help you build a resilient and effective team structure.',
    },
    {
        title: 'Offshore Implementation',
        content:
            'Expand your capabilities with our offshore implementation services, providing skilled offshore teams that work efficiently with your onshore operations for cost-effective, high-quality solutions.',
    },
]

export default function Expertise() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Empowering your workforce with tailored services
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="space-y-2">
                        {expertiseAreas.map((area, index) => (
                            <Button
                                key={index}
                                variant={activeTab === index ? 'default' : 'ghost'}
                                className="w-full justify-start"
                                onClick={() => setActiveTab(index)}
                            >
                                {area.title}
                            </Button>
                        ))}
                    </div>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-3"
                    >
                        <h3 className="text-2xl font-semibold mb-4">{expertiseAreas[activeTab].title}</h3>
                        <p className="text-gray-600 mb-6">{expertiseAreas[activeTab].content}</p>
                        {/* <Button>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button> */}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}