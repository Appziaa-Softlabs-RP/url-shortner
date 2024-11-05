'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { Button } from '../ui/button';

export default function Sponsers() {
    const sponsors = [
        { name: 'Digital Janet', logo: '/img/sponsers/s1.svg' },
        { name: 'Rewards Plus', logo: '/img/sponsers/s2.svg' },
        { name: 'EazyOps', logo: '/img/sponsers/s3.svg' },
    ]

    return (
        <section className="py-16 bg-muted grid gap-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 flex items-center justify-center flex-col gap-8"
            >
                <h1 className='text-4xl font-extrabold'>Trusted by Industry Pioneers</h1>
                <Button className='px-12'>
                    Get Started
                </Button>
            </motion.div>
            <div className="container mx-auto px-4 flex items-center max-w-screen overflow-hidden">
                <Marquee
                    fade={true}
                    direction="left"
                    reverse={false}
                    pauseOnHover={false}
                    className="[--duration:10s] w-fit max-w-[1000px] mx-auto"
                    innerClassName="gap-8"
                >
                    {sponsors.map((sponsor, index) => (
                        <motion.div
                            key={sponsor.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center justify-center max-w-[120px] sm:max-w-[200px] h-[70px] sm:h-[90px]"
                        >
                            <Image
                                src={sponsor.logo}
                                alt={`${sponsor.name} logo`}
                                width={100}
                                height={150}
                                className="max-w-full max-h-[60px] sm:max-h-[80px] w-auto h-auto"
                                unoptimized={true}
                            />
                        </motion.div>
                    ))}
                </Marquee>
            </div>
        </section>
    )
}