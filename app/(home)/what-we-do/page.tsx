import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WhatWeDo() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">What We Do</h1>

            <section className="mb-16">
                <p className="text-lg mb-6">
                    At Digital Janet, we are redefining staffing with a unique blend of innovation, cultural
                    alignment, and a commitment to diversity. Headquartered in the USA & offices in India,
                    we are dedicated to streamlining hiring processes for large corporations across sectors.
                    Our approach prioritizes finding candidates who not only match the skills and
                    experience required but also resonate with the organization’s core values, leading to
                    impactful, lasting hires.
                </p>
            </section>

            <section id="staff-and-consulting">
                <h2 className="text-3xl font-semibold mb-6">Staffing and Consulting</h2>
                <p>At Digital Janet, we bring the best talent to your organization. Our Staffing & Consulting services are powered by a combination of human expertise and AI-driven technology to ensure you get the right professionals for your business needs—faster and with greater precision.</p>
                <ul>
                    <li>
                        <b>AI-Powered Talent Sourcing:</b> Our in-house AI-powered product significantly reduces sourcing and screening time by 70%, enabling us to deliver higher-quality candidates in record time. This helps businesses scale quickly without compromising quality.
                    </li>
                    <li>
                        <b>IT Staff Augmentation:</b> Whether you’re in Telecom, Automobile, or Manufacturing & Logistics, we help you bring top-tier talent to your team to ensure that your projects are completed on time and within budget.
                    </li>
                    <li>
                        <b>Consulting Services:</b> Our expert consultants help you tackle your biggest challenges and optimize your operations across BFSI, Life Science & Healthcare, and more, providing strategic guidance and actionable insights.
                    </li>
                    <li>
                        <b>Diversity and Inclusion:</b> As an MBE, we are committed to sourcing diverse talent that fosters innovation and enriches your organizational culture.
                    </li>
                </ul>
            </section>

            <section id="recruitment-process-outsourcing">
                <h2 className="text-3xl font-semibold mb-6">Recruitment Process Outsourcing (RPO)</h2>
                <p>At Digital Janet, we bring the best talent to your organization. Our Staffing & Consulting services are powered by a combination of human expertise and AI-driven technology to ensure you get the right professionals for your business needs—faster and with greater precision.</p>
                <ul>
                    <li>
                        <b>AI-Powered Talent Sourcing:</b> Our in-house AI-powered product significantly reduces sourcing and screening time by 70%, enabling us to deliver higher-quality candidates in record time. This helps businesses scale quickly without compromising quality.
                    </li>
                    <li>
                        <b>IT Staff Augmentation:</b> Whether you’re in Telecom, Automobile, or Manufacturing & Logistics, we help you bring top-tier talent to your team to ensure that your projects are completed on time and within budget.
                    </li>
                    <li>
                        <b>Consulting Services:</b> Our expert consultants help you tackle your biggest challenges and optimize your operations across BFSI, Life Science & Healthcare, and more, providing strategic guidance and actionable insights.
                    </li>
                    <li>
                        <b>Diversity and Inclusion:</b> As an MBE, we are committed to sourcing diverse talent that fosters innovation and enriches your organizational culture.
                    </li>
                </ul>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">Our Unique Approach to Staffing</h2>
                <p className="text-lg mb-6">
                    In today’s competitive market, successful staffing goes beyond finding qualified
                    candidates. At Digital Janet, we emphasize a holistic approach that combines cultural
                    alignment, diversity, and advanced technology to ensure each candidate we place adds
                    value to our clients’ teams.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Culture-Driven Recruitment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>We believe that cultural compatibility is key to employee success. That’s why we delve deep into understanding each organization’s values, ensuring that candidates not only fit the job but also contribute positively to the workplace culture.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Diversity of Talent</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>We recognize the strength that a diverse workforce brings. By actively sourcing talent from varied backgrounds—across different genders, ethnicities, age groups, and abilities—we ensure our clients benefit from a range of perspectives, skills, and experiences.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>AI-Powered Precision</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Our in-house AI recruiting platform is a core part of our approach, allowing us to rapidly analyze data, match roles, and bring insights to bear in every placement. This technology enables us to maintain a competitive edge, offering efficient, tailored recruitment solutions that meet industry demands.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">Industry Expertise Across Sectors</h2>
                <p className="text-lg mb-6">
                    Digital Janet is proud to serve a wide variety of industries, tailoring our expertise and
                    technology to meet each sector’s unique needs. Here’s how we help companies across
                    diverse fields find the perfect fit:
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "Software and IT", description: "The fast-evolving software and IT sector demands innovative, adaptable talent. Our AI-powered platform identifies candidates with the specialized technical expertise required to keep businesses on the cutting edge." },
                        { title: "Manufacturing", description: "We know that the manufacturing industry depends on both efficiency and safety. By sourcing highly skilled, detail-oriented professionals, we help our clients maintain productive and secure operations." },
                        { title: "Aviation", description: "Aviation requires adherence to strict safety and regulatory standards. Our selection process ensures that only the most competent and reliable candidates become part of this high-stakes industry." },
                        { title: "Retail", description: "With customer satisfaction at the heart of retail, we find individuals who excel in customer engagement and have the potential to enhance brand reputation." },
                        { title: "Pharma and Healthcare", description: "The healthcare industry relies on compassionate, skilled professionals. Our rigorous screening process ensures that every candidate we place meets the high standards of care and compliance necessary in these fields." },
                    ].map((industry, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{industry.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{industry.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-6">Why Choose Digital Janet?</h2>
                <p className="text-lg mb-6">
                    Digital Janet isn’t just a staffing firm; we’re your dedicated partner in sourcing top talent.
                    Our commitment to speed, diversity, and quality makes us a trusted choice for
                    companies across the globe.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Best-in-Class Turnaround Time (TAT)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Our efficient processes enable us to deliver top talent swiftly, minimizing disruption and downtime. Our TAT is among the best in the industry, ensuring you receive qualified candidates when you need them most.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Diverse Candidate Network</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>With a diverse talent pool spanning various backgrounds and sectors, we ensure that our clients benefit from a range of perspectives. We believe that a diverse workforce fosters innovation, enhances problem-solving, and leads to more inclusive and productive teams.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>AI-Driven Solutions for Efficient Hiring</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Our advanced, AI-powered recruiting platform allows us to analyze extensive datasets, matching roles with high-potential candidates quickly and accurately. This technological advantage means faster, more precise hires that contribute directly to our clients’ success.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-semibold mb-6">Our Commitment to Excellence</h2>
                <p className="text-lg">
                    Digital Janet is dedicated to helping your organization build a team that thrives. We
                    understand that every hire should contribute lasting value, and we strive to create
                    meaningful matches between candidates and companies. With a strong focus on
                    cultural alignment, diversity, and innovative technology, we offer staffing solutions that
                    empower organizations and drive results.
                </p>
            </section>
        </div>
    )
}