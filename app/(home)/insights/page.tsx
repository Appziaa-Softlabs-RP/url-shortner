"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function Insights() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <motion.h1
                className="text-4xl font-bold mb-8 text-center"
                initial="initial"
                animate="animate"
                variants={fadeIn}
            >
                Digital Janet Insights
            </motion.h1>

            <motion.section
                className="mb-16"
                initial="initial"
                animate="animate"
                variants={fadeIn}
            >
                <Card className="bg-gradient-to-r from-secondary to-slate-500 text-white">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-semibold mb-4">Empowering Your Digital Transformation</h2>
                        <p className="text-lg mb-6">
                            At Digital Janet, we don’t just deliver services; we provide transformative solutions that
                            drive efficiency, innovation, and growth. Specializing in Staffing & Consulting, Digital
                            Engineering, Cyber Security, Cloud Migration, and Recruitment Process Outsourcing
                            (RPO), we help businesses thrive in a digital-first world.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button>Learn More</Button>
                            <Button variant="outline">Contact Us</Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            <motion.section
                className="mb-16"
                initial="initial"
                animate="animate"
                variants={fadeIn}
            >
                <h2 className="text-3xl font-semibold mb-6">Our Unique Approach</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Minority Business Enterprise (MBE)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>As a certified MBE and NWBOC member, we take pride in fostering diversity and inclusion in every aspect of our work.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>AI-Powered Solutions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Our AI-powered products revolutionize recruitment and talent acquisition, reducing sourcing and screening teams by 70% while improving speed and quality.</p>
                        </CardContent>
                    </Card>
                </div>
            </motion.section>

            <motion.section
                className="mb-16"
                initial="initial"
                animate="animate"
                variants={fadeIn}
            >
                <h2 className="text-3xl font-semibold mb-6">Our Services</h2>
                <Tabs defaultValue="staffing" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 min-h-fit">
                        <TabsTrigger value="staffing">Staffing & Consulting</TabsTrigger>
                        <TabsTrigger value="rpo">RPO</TabsTrigger>
                        <TabsTrigger value="engineering">Digital Engineering</TabsTrigger>
                        <TabsTrigger value="security">Cyber Security</TabsTrigger>
                        <TabsTrigger value="cloud">Cloud Migration</TabsTrigger>
                    </TabsList>
                    <TabsContent value="staffing">
                        <Card>
                            <CardHeader>
                                <CardTitle>Staffing and Consulting</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>AI-Powered Talent Sourcing</li>
                                    <li>IT Staff Augmentation</li>
                                    <li>Consulting Services</li>
                                    <li>Diversity and Inclusion</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="rpo">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recruitment Process Outsourcing (RPO)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>End-to-End Recruitment</li>
                                    <li>AI-Powered Screening and Sourcing</li>
                                    <li>High-Volume Hiring</li>
                                    <li>Enhanced Candidate Experience</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="engineering">
                        <Card>
                            <CardHeader>
                                <CardTitle>Digital Engineering</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Custom Software Development</li>
                                    <li>Application Modernization</li>
                                    <li>Systems Integration</li>
                                    <li>AI and Automation</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cyber Security</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Threat Detection and Prevention</li>
                                    <li>Incident Response and Recovery</li>
                                    <li>Security Audits and Compliance</li>
                                    <li>Penetration Testing</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="cloud">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cloud Migration</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Cloud Strategy and Planning</li>
                                    <li>Cloud Architecture and Design</li>
                                    <li>Data Migration</li>
                                    <li>Cloud Optimization</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.section>

            <motion.section
                initial="initial"
                animate="animate"
                variants={fadeIn}
            >
                <h2 className="text-3xl font-semibold mb-6">Industries We Serve</h2>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[
                        "Information Technology",
                        "BFSI",
                        "Consumer & Retail",
                        "E-Commerce",
                        "Life Science & Healthcare",
                        "Automobile",
                        "Telecom",
                        "Manufacturing & Logistics"
                    ].map((industry, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="text-center">{industry}</CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </motion.section>
        </div>
    )
}