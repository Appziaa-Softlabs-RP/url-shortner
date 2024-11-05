"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function WhoWeHelp() {

    const [selectedItem, setSelectedItem] = useState(0);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
    }

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const impower = [
        {
            title: "Recruitment Agencies",
            description: "The platform allows them to leverage data-driven insights, reducing the time spent on manual screening while increasing the quality of hires. Additionally, Recruitplus.ai helps staffing firms scale their operations efficiently, improving client satisfaction and overall profitability.",
            image: "/img/h1.svg"
        },
        {
            title: "HR Professionals",
            description: "Recruitplus.ai empowers businesses by streamlining recruitment with AI-driven tools designed to find the best candidates efficiently. By leveraging internal data and industry insights, we ensure a perfect match between employers and potential hires. With Recruitplus, companies can enhance their talent acquisition process, saving time and improving hiring outcomes.",
            image: "/img/h2.svg"
        },
        {
            title: "Businesses",
            description: "Quickly and efficiently build high-performing teams tailored to your company needs.",
            image: "/img/h3.svg"
        }
    ]


    return (
        <motion.section
            id="who-we-help"
            className="w-full py-12 md:py-24 lg:py-32 bg-white"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
        >
            <div className="container px-4 md:px-6 mx-auto">
                <motion.h2
                    className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-secondary"
                    variants={fadeIn}
                >
                    Who We Empower
                </motion.h2>
                <div className="grid gap-6">
                    <div className="relative flex flex-row flex-wrap gap-4 justify-center">
                        {impower.map((item, index) => (
                            <motion.div
                                key={index}
                                onClick={() => setSelectedItem(index)}
                                className={`relative flex border-[1px] font-semibold border-gray hover:bg-gradient-to-r hover:from-[#af14af] hover:to-[#1e40af] hover:text-primary hover:text-black flex-col items-center text-center cursor-pointer py-2 px-6 rounded-full transition-all ${selectedItem === index
                                        ? "bg-gradient-to-r from-[#af14af] to-[#1e40af] font-bold text-white border-transparent"
                                        : ""
                                    }`}
                                // variants={fadeIn}
                            >
                                <h3 className="text-sm whitespace-nowrap sm:text-base">
                                    {item.title}
                                </h3>

                                {/* Highlight for selected item */}
                                {selectedItem === index && (
                                    <motion.div
                                        layoutId="activeItem" // Shared layout ID for smooth transitions
                                        className="absolute inset-0 z-[-1] bg-blue-200 rounded-full"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                    <motion.div className="grid md:grid-cols-2 max-w-4xl mx-auto rounded-lg gap-12 items-center p-4">
                        <motion.div className="flex py-8 flex-col justify-end " variants={fadeIn}>
                            <h3 className="text-2xl sm:text-4xl font-bold mb-2">{impower[selectedItem].title}</h3>
                            <p className="text-lg">
                                {impower[selectedItem].description}
                            </p>
                        </motion.div>
                        <motion.div className="flex justify-start items-center" variants={fadeIn}>
                            <Image src={impower[selectedItem].image}
                                alt=""
                                width={400}
                                className="rounded-md"
                                height={400}
                                unoptimized={true}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}