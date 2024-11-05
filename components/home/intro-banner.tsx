"use client"
import { motion } from "framer-motion"

export default function IntroBanner({
    stagger,
    fadeIn
}: {
    stagger: any,
    fadeIn: any
}) {
    return <>
        <motion.section
            className="w-full py-12 md:py-24 bg-primary text-slate-100 items-center"
            initial="initial"
            animate="animate"
            variants={stagger}
        >
            <div className="max-w-[1400px] px-8 grid mx-auto md:grid-cols-2 gap-6 items-center">
                <motion.div className="flex flex-col space-y-4" variants={fadeIn}>
                    <motion.h1
                        className="text-5xl w-full font-bold tracking-tighter flex flex-col text-white"
                        variants={fadeIn}
                    >
                        Digital Business Card
                    </motion.h1>
                    <motion.p
                        className="w-full text-2xl pt-4"
                        variants={fadeIn}
                    >
                        for Young & Bold Businesses:
                        Stand Out From the Bunch!
                    </motion.p>
                    <motion.div className="grid pt-8 gap-4 whitespace-nowrap max-w-[400px]" variants={fadeIn}>
                        <p className="flex flex-row gap-2 font-semibold text-xl sm:text-2xl w-full">
                            <span className="p-2">Tap into</span> <span className="p-2 bg-black w-fit text-white">future of networking</span>
                        </p>
                    </motion.div>
                </motion.div>
                <div className="flex justify-center">
                    <motion.img
                        className="text-4xl font-bold tracking-tighter text-white max-h-[400px]"
                        variants={fadeIn}
                        src="/img/hero.svg"
                    />
                </div>
            </div>
        </motion.section>
    </>
}