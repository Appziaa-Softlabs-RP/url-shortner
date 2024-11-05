"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Features({
    stagger,
    fadeIn
}: {
    stagger: any,
    fadeIn: any
}) {

    const features = [
        {
            title: "Easy to Share",
            description: "Lorem ipsum dolor sit amet consectetur. Vulputate sed nunc commodo eu mattis nibh nunc ipsum.",
            icon: "/icons/share.svg"
        },
        {
            title: "Smart Analytics",
            description: "Lorem ipsum dolor sit amet consectetur. Vulputate sed nunc commodo eu mattis nibh nunc ipsum.",
            icon: "/icons/analytics.svg"
        },
        {
            title: "NFC Enabled",
            description: "Lorem ipsum dolor sit amet consectetur. Vulputate sed nunc commodo eu mattis nibh nunc ipsum.",
            icon: "/icons/nfc.svg"
        },
        {
            title: "Highly Affordable",
            description: "Lorem ipsum dolor sit amet consectetur. Vulputate sed nunc commodo eu mattis nibh nunc ipsum.",
            icon: "/icons/affordable.svg"
        },
        {
            title: "Easy to Customise",
            description: "Lorem ipsum dolor sit amet consectetur. Vulputate sed nunc commodo eu mattis nibh nunc ipsum.",
            icon: "/icons/customizable.svg"
        },
        {
            title: "Eco Friendly",
            description: "Lorem ipsum dolor sit amet consectetur. Vulputate sed nunc commodo eu mattis nibh nunc ipsum.",
            icon: "/icons/eco.svg"
        },
    ]

    return <>
        <motion.section
            id="how-it-works"
            className="w-full py-12 bg-white"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
        >
            <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-2">
            <div>
                <Image
                    src="/img/info.svg"
                    alt="AI Illustration"
                    width={400}
                    height={400}
                    className="mx-auto"
                    />
            </div>
            <div className="grid grid-cols-2 gap-6">
                {
                    features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col gap-2 h-full justify-between"
                            variants={fadeIn}
                        >
                            <Image
                                src={feature.icon}
                                alt={feature.title}
                                width={50}
                                height={50}
                            />
                            <h3 className="text-md font-semibold">{feature.title}</h3>
                            <p className="text-xs">{feature.description}</p>
                        </motion.div>
                    ))
                }
            </div>
            </div>
        </motion.section>
    </>
}