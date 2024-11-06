import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Career() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">Career at Digital Janet</h1>

            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">Why Choose Digital Janet?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: "AI-Powered Solutions",
                            description: "Our in-house AI-powered products reduce the time and cost of sourcing and screening talent by up to 70%, while improving the quality of candidates and increasing speed."
                        },
                        {
                            title: "Minority Business Enterprise (MBE)",
                            description: "As a certified Minority Business Enterprise (MBE) and NWBOC certified, we are committed to providing diverse and inclusive solutions that drive innovation."
                        },
                        {
                            title: "Industry Expertise",
                            description: "We bring deep industry knowledge to every project, ensuring that our solutions meet the unique challenges of your sector."
                        },
                        {
                            title: "Comprehensive Services",
                            description: "From Staffing and RPO to Digital Engineering, Cyber Security, and Cloud Migration, we offer end-to-end services that align with your business goals."
                        },
                        {
                            title: "Proven Experience",
                            description: "With over a decade of experience and AI-driven tools, we can manage high-volume hiring projects efficiently, delivering faster, better results."
                        }
                    ].map((item, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mb-16 bg-gradient-to-r text-white from-secondary to-slate-500 p-8 rounded-lg">
                <h2 className="text-3xl font-semibold mb-6">Get in Touch with Us</h2>
                <p className="mb-6">
                    Ready to transform your business with cutting-edge AI-powered solutions and expert services? Whether you need Staffing, RPO, Digital Engineering, Cyber Security, or Cloud Migration, Digital Janet is here to help.
                </p>
                <Button>Contact Us Today</Button>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">Offshore Delivery Center</h2>
                <p className="mb-6">
                    Digital Janet’s offshore delivery center brings together a team of highly skilled professionals proficient in a wide range of modern technologies. We specialize in providing innovative solutions across various domains, ensuring cost-effective and quality-driven services for clients worldwide.
                </p>
                <Tabs defaultValue="web">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 min-h-fit">
                        <TabsTrigger value="web">Web Development</TabsTrigger>
                        <TabsTrigger value="mobile">Mobile Development</TabsTrigger>
                        <TabsTrigger value="ai">AI & ML</TabsTrigger>
                        <TabsTrigger value="cloud">Cloud Computing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="web">
                        <Card>
                            <CardHeader>
                                <CardTitle>Web Development</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Our web development services span both front-end and back-end development, creating robust and visually engaging applications for web-based platforms.</p>
                                <ul className="list-disc pl-5 mt-4">
                                    <li>Front-End Development: React, Angular, HTML, CSS, JavaScript</li>
                                    <li>Back-End Development: Python, Java, Ruby, Node.js, Django</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="mobile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Mobile Development</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>We develop high-performing applications for mobile platforms, helping clients engage with users on Android and iOS devices.</p>
                                <ul className="list-disc pl-5 mt-4">
                                    <li>Android Development: Java, Kotlin</li>
                                    <li>iOS Development: Swift, Objective-C</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="ai">
                        <Card>
                            <CardHeader>
                                <CardTitle>Artificial Intelligence and Machine Learning</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Our expertise in AI and ML enables us to build systems that automate processes and facilitate intelligent decision-making.</p>
                                <ul className="list-disc pl-5 mt-4">
                                    <li>AI/ML Frameworks: TensorFlow, PyTorch</li>
                                    <li>Predictive Analytics and NLP</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="cloud">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cloud Computing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Our cloud solutions enable clients to leverage scalable, secure applications and services hosted in the cloud.</p>
                                <ul className="list-disc pl-5 mt-4">
                                    <li>Cloud Platforms: AWS, Azure, Google Cloud</li>
                                    <li>Cloud Migration and Optimization</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">Our Achievements and Capabilities</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        "1,000+ Projects Delivered",
                        "1 Million+ Resource Database",
                        "1,000+ Active Resources",
                        "100+ Satisfied Customers",
                        "70% Faster Talent Acquisition",
                        "Certified Minority Business Enterprise (MBE)",
                        "End-to-End Service Portfolio",
                        "99% Project Success Rate",
                        "Decade of Industry Expertise",
                        "AI-Powered Recruitment Solutions"
                    ].map((achievement, index) => (
                        <Card key={index}>
                            <CardContent className="flex items-center justify-center h-full p-6">
                                <p className="text-center font-semibold">{achievement}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-semibold mb-6">Customer Testimonials</h2>
                <Accordion type="single" collapsible className="w-full">
                    {[
                        {
                            title: "Staffing and Consulting Services",
                            content: "Partnering with Digital Janet for our staffing needs was one of the best decisions we made. Their commitment to diversity and inclusion also made a positive impact on our company culture.",
                            author: "CTO, Telecom Company"
                        },
                        {
                            title: "Recruitment Process Outsourcing (RPO)",
                            content: "Digital Janet stepped in with their Recruitment Process Outsourcing services, which combined expert recruiters and AI-powered sourcing tools. The result was a 60% reduction in our time-to-hire and significant cost savings.",
                            author: "Head of HR, E-commerce Business"
                        },
                        {
                            title: "Digital Engineering",
                            content: "Digital Janet's Digital Engineering services transformed our legacy systems and set us up for success in a competitive industry. The level of expertise they brought to the project was outstanding.",
                            author: "COO, Logistics Company"
                        },
                        {
                            title: "Cyber Security",
                            content: "Digital Janet's Cyber Security services have been a game-changer for us. In an industry where trust and security are paramount, we feel confident knowing Digital Janet is keeping our data and infrastructure secure.",
                            author: "CISO, Financial Services Firm"
                        },
                        {
                            title: "Cloud Migration",
                            content: "Digital Janet delivered a flawless experience. The transition was smooth, with minimal downtime, and they optimized our cloud environment to cut costs while improving performance.",
                            author: "Director of IT, Retail Company"
                        }
                    ].map((testimonial, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{testimonial.title}</AccordionTrigger>
                            <AccordionContent>
                                <p className="mb-4">{testimonial.content}</p>
                                <p className="font-semibold">— {testimonial.author}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    )
}