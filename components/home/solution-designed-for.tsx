"use client"
import { motion } from "framer-motion"
import { ArrowRight, BarChart, CheckCircle, Zap } from "lucide-react"
import Image from "next/image"

export default function SolutionDesignedFor({
    stagger,
    fadeIn
}: {
    stagger: any,
    fadeIn: any
}) {

    const solutions = [
        {
            img: '/img/solutions/s1.png',
        },
        {
            img: '/img/solutions/s2.png',
        },
        {
            img: '/img/solutions/s3.png',
        },
        {
            img: '/img/solutions/s4.png',
        },
        {
            img: '/img/solutions/s5.png',
        },
        {
            img: '/img/solutions/s6.png',
        }
    ]

    return <>
        <motion.section
            id="why-choose-us"
            className="w-full py-12 md:py-24 lg:py-32 bg-white text-black"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
        >
            <div className="container px-4 md:px-6 mx-auto">
                <motion.h2
                    className="text-2xl font-bold tracking-tighter text-center mb-8"
                    variants={fadeIn}
                >
                    Solution Designed for
                </motion.h2>
                <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3">
                    {
                        solutions.map((solution, index) => (
                            <motion.div
                                key={index}
                                className="flex relative group flex-col flex-1 h-full w-full items-center text-center"
                                variants={fadeIn}
                            >
                                <Image
                                    src={solution.img}
                                    alt="Solution"
                                    className="object-cover w-full h-full rounded-md group-hover:scale-105  transition-transform duration-300 cursor-pointer"
                                    width={500}
                                    height={500}
                                />
                                <div className="absolute bottom-6 group-hover:scale-105 transition-transform duration-300 cursor-pointer right-6 p-2 bg-white/70 rounded-full">
                                    <ArrowRight />
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </motion.section>̊
    </>
}