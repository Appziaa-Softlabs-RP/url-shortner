"use client"

import { motion } from "framer-motion";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

const fadeIn = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 1,
        y: 0
    }
}

export default function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [mobile, setMobile] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [message, setMessage] = useState("");
    const [pending, setTransition] = useTransition();
    const [isSent, setIsSent] = useState(false);


    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (isSent) {
            return toast({
                variant: "default",
                title: "Email already Sent!"
            });
        }
        // @ts-ignore
        setTransition(async () => {
            try {
                const res = await fetch("/api/send-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        name,
                        company,
                        mobile,
                        date,
                        time,
                        message
                    })
                });
                if (res.status === 200) {
                    setIsSent(true);
                    return toast({
                        variant: "default",
                        description: "Thanks for Contacting us! Our team will reach you soon."
                    });
                } else {
                    return toast({
                        variant: "destructive",
                        description: "Failed to contact. Please try again."
                    });
                }
            } catch (error) {
                return toast({
                    variant: "destructive",
                    description: "Failed to contact. Please try again."
                });
            }
        });
    }


    return <>
        <motion.section
            id="contact"
            className="w-full py-12 bg-[#F6F4FF]"
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
                    Schedule Your Demo
                </motion.h2>
                <div className="grid gap-10"></div>
                <section id="contact" className="w-full">
                    <div className="container">
                        <div className="grid lg:grid-cols-2 sm:grid-cols-1 max-sm:grid-col-1 gap-6 mt-5">
                            <div className="flex flex-col w-fit mx-auto justify-center space-y-5">
                                <p className="text-4xl font-semibold">Ready for 🔥 🚀<br />Transformation?</p>
                                <h2 className="text-4xl space-y-2 font-semibold flex flex-col">
                                    <span className="text-xl font-normal">
                                        Fill in your details below to learn how DigitalJanet can transform your recruitment process. Our tailored solutions are designed to meet your unique hiring needs and help you find the best talent quickly and efficiently.
                                    </span>
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl drop-shadow-md">
                                <h3 className="text-2xl font-semibold">Get Started with DigitalJanet!</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                onChange={
                                                    (e) => setName(e.target.value)
                                                }
                                                placeholder="Your Name"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="abc@yourdomain"
                                                onChange={
                                                    (e) => setEmail(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="company"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Company
                                        </label>
                                        <div className="mt-2">
                                            <Input
                                                type="text"
                                                name="company"
                                                id="company"
                                                placeholder="Your Company Name"
                                                onChange={
                                                    (e) => setCompany(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="mobile"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Mobile
                                        </label>
                                        <div className="mt-2">
                                            <Input
                                                id="mobile"
                                                name="mobile"
                                                type="phone"
                                                placeholder="+91 XXXXXXXXXX"
                                                onChange={
                                                    (e) => setMobile(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid grid-cols-1">
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Date
                                        </label>
                                        <div className="mt-2">
                                            <Input type="date"
                                                onChange={
                                                    (e) => setDate(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1">
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Time
                                        </label>
                                        <div className="mt-2">
                                            <Input type="time"
                                                onChange={
                                                    (e) => setTime(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Message
                                    </label>
                                    <div className="mt-2">
                                        <Textarea
                                            id="about"
                                            name="about"
                                            onChange={
                                                (e) => {
                                                    setMessage(e.target.value)
                                                }
                                            }
                                        ></Textarea>
                                    </div>
                                </div>

                                <Button disabled={pending}
                                    type="submit">
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </motion.section >
    </>
}