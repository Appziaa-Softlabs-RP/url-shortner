"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Head from "next/head";
import { motion } from "framer-motion"

const faqData = [
    {
        question: "What is Recruitplus?",
        answer: "Recruitplus is an AI-powered candidate sourcing platform built on advanced LLM technology, designed to simplify the recruitment process and enhance hiring results by quickly identifying top talent.<br>"
    },
    {
        question: "How Does Recruitplus Work?",
        answer: "Recruitplus harnesses the power of advanced LLM-based AI to streamline candidate sourcing and recruitment. Here's how it works: <br><ul><br><li><b>1. Understanding Job Requirements: </b>Recruitplus analyzes job descriptions to identify key skills, qualifications, and experience needed for the role.</li><br><li><b>2. AI-Powered Sourcing: </b>Using its AI algorithms, Recruitplus scans multiple databases, job boards, and social platforms to find candidates that match the job criteria.</li><br><li><b>3. Boolean Search Generation: </b>It creates complex Boolean search strings to perform in-depth searches across platforms like LinkedIn, providing a comprehensive list of potential candidates.</li><br><li><b>4. Intelligent Ranking: </b>The AI ranks candidates based on relevance, skills, and cultural fit, ensuring the best matches are presented at the top of the list.</li><br><li><b>5. Continuous Learning: </b>Recruitplus learns from user feedback, refining its search results and recommendations over time to improve future hiring outcomes.</li></ul><br>By automating these steps, Recruitplus accelerates the hiring process, helping recruiters find the best talent faster and more efficiently."
    },
    {
        question: "How Can Recruitplus Enhance Your Recruiting Process?",
        answer: "<ul><br><li><b>1. Automated Candidate Sourcing: </b>Recruitplus uses AI-powered algorithms to scan multiple platforms and databases, quickly identifying top candidates that match your job requirements. This saves you hours of manual searching and improves sourcing efficiency.</li><br><li><b>2. Accurate Boolean Search: </b>Recruitplus automatically generates complex Boolean search strings, enabling precise candidate searches across job boards and professional networks like LinkedIn. This ensures you reach a broader talent pool while maintaining accuracy.</li><br><li><b>3. Smarter Candidate Matching: </b>By analyzing job descriptions and resumes, Recruitplus intelligently ranks candidates based on skills, experience, and cultural fit. This helps you focus on the most suitable candidates, reducing time-to-hire and improving the quality of hires.</li><br><li><b>4. Real-Time Insights: </b>The platform provides valuable insights into market trends and candidate availability, helping you make data-driven decisions and adjust your recruitment strategy for better outcomes.</li><br><li><b>5. Continuous Learning: </b>With every interaction and feedback, Recruitplus learns and adapts, improving its recommendations and refining search results to better align with your hiring needs over time.</li></ul><br>By automating sourcing, enhancing search precision, and providing actionable insights, Recruitplus transforms your recruitment process into a faster, more effective, and streamlined experience."
    },
    {
        question: "Is Recruitplus Good for Staffing Businesses of All Sizes?",
        answer: "<b>Absolutely!</b> Recruitplus is designed to cater to staffing businesses of all sizes, from small agencies to large enterprises. Here's how it benefits each: <ul><br><li><b>1. For Small Businesses: </b>Recruitplus simplifies and automates sourcing, allowing small staffing agencies to compete with larger firms. Its AI-powered tools minimize manual work, helping smaller teams identify top talent quickly without requiring extensive resources or a large recruiting staff.</li><br><li><b>2. For Medium-Sized Businesses: </b>As agencies grow, Recruitplus scales with them. It provides advanced search capabilities and data-driven insights, making it easier to handle a higher volume of job openings and clients. This ensures recruiters can maintain a high-quality candidate pool and efficiently manage multiple hiring processes simultaneously.</li><br><li><b>3. For Large Enterprises: </b>For large staffing firms managing extensive databases and complex hiring needs, Recruitplus offers robust automation and AI-powered matching, streamlining the sourcing process. Its intelligent ranking and real-time insights help recruiters quickly narrow down the best candidates, even in high-volume recruitment scenarios.</li></ul><br>Regardless of the size of the staffing business, Recruitplus enhances efficiency, improves candidate matching, and scales to meet the demands of any recruiting process."
    },
    {
        question: "What are the Key Features of Recruitplus?",
        answer: "<b>Key Features of Recruitplus</b><br><ul><br><li><b>1. AI-Powered Candidate Sourcing:</b> Recruitplus uses advanced LLM-based AI to scan multiple job boards, databases, and professional networks to identify the most relevant candidates. It automates the sourcing process, saving time and increasing efficiency.</li><br><li><b>2. Smart Boolean Search Generator:</b> Generates complex Boolean search strings tailored to your job requirements, enabling precise and in-depth searches across platforms like LinkedIn.</li><br><li><b>3. Intelligent Candidate Ranking:</b> The platform analyzes candidate skills, experience, and cultural fit, then ranks them to highlight the best matches.</li><br><li><b>4. Automated Job Description Analysis:</b> Analyzes job descriptions to identify key skills, qualifications, and experience requirements, streamlining the candidate search process.</li><br><li><b>5. Customizable Search Criteria:</b> Allows you to fine-tune search queries and filters based on specific attributes, skills, locations, and experience levels.</li><br><li><b>6. Real-Time Insights and Analytics:</b> Provides insights into market trends, candidate availability, and hiring patterns.</li><br><li><b>7. Continuous Learning and Adaptation:</b> Learns from user interactions and feedback, refining its algorithms and improving search results over time.</li><br><li><b>8. CRM Integration:</b> Seamlessly integrates with popular CRM and Applicant Tracking Systems (ATS).</li><br><li><b>9. Candidate Outreach Automation:</b> Offers tools for automated candidate outreach through personalized messages and follow-ups.</li><br><li><b>10. User-Friendly Interface:</b> An intuitive, easy-to-use interface ensures that recruiters of all experience levels can navigate the platform effectively.</li></ul><br>These features combine to provide a comprehensive and efficient recruitment solution, empowering staffing agencies and recruiters to find, engage, and hire the best talent faster."
    },
    {
        question: "How Does Recruitplus Reduce Hiring TAT (Turnaround Time)?",
        answer: "<ul><br><li><b>1. Automated Candidate Sourcing: </b>Recruitplus quickly scans multiple job boards, databases, and professional networks to find relevant candidates using its AI-powered algorithms. This automation eliminates the need for manual searches, significantly reducing the time spent on sourcing potential hires.</li><br><li><b>2. Instant Boolean Search Generation: </b>The platform generates complex Boolean search strings tailored to job requirements instantly. This enables precise searches across platforms like LinkedIn, allowing recruiters to identify suitable candidates much faster than traditional methods.</li><br><li><b>3. Intelligent Candidate Ranking: </b>Recruitplus analyzes candidates' skills, experience, and fit using its AI, automatically ranking the best matches. This streamlines the screening process, allowing recruiters to focus only on top candidates, reducing the time spent on evaluating numerous profiles.</li><br><li><b>4. Quick Job Description Analysis: </b>By analyzing job descriptions to identify key requirements, Recruitplus ensures that the search targets the most relevant candidates right from the start. This leads to a more focused and effective sourcing process, cutting down on unnecessary back-and-forth.</li><br><li><b>5. Automated Candidate Outreach: </b>The platform facilitates automated and personalized communication with candidates, expediting the initial contact and engagement process. This minimizes delays in reaching out to potential hires and speeds up their movement through the recruitment funnel.</li><br><li><b>6. Real-Time Market Insights: </b>Recruitplus provides real-time insights into candidate availability, market trends, and competitive hiring patterns. This data helps recruiters make quick, informed decisions, optimizing recruitment strategies and reducing delays.</li><br><li><b>7. Seamless Integration with CRMs and ATS: </b>By integrating with popular CRM and Applicant Tracking Systems (ATS), Recruitplus ensures smooth data flow and management, reducing time lost in manual data entry and candidate tracking.</li><br><li><b>8. Continuous Learning: </b>The AI learns from previous interactions and feedback to refine search results and recommendations over time. This continuous improvement helps recruiters find better matches faster, reducing the need for multiple search iterations.</li></ul>By automating and streamlining key parts of the recruitment process, Recruitplus significantly reduces the hiring turnaround time (TAT), enabling recruiters to find and hire the best talent much more efficiently."
    },
    {
        question: "What steps have you taken for data privacy of candidates and companies?",
        answer: "<b>Data Privacy Measures for Candidates and Companies in Recruitplus</b><br><ul><br><li><b>1. Data Encryption: </b>All candidate and company data are encrypted both in transit and at rest using advanced encryption standards (AES-256). This ensures that sensitive information remains secure during communication between systems and while stored in databases.</li><br><li><b>2. Access Control: </b>Implemented strict access controls using role-based access mechanisms to ensure that only authorized users can access sensitive data. Admins and recruiters have different levels of access depending on their roles, minimizing unnecessary exposure of candidate and company information.</li><br><li><b>3. Anonymization and Masking: </b>Candidate data is anonymized and masked wherever possible, especially during the initial stages of the sourcing process, to protect individual identities. Only essential information is shared with recruiters until a more advanced stage of the recruitment cycle.</li><br><li><b>4. Data Minimization: </b>Collect only the necessary information required for recruitment purposes, ensuring compliance with data privacy regulations. This approach limits the exposure of personal data, reducing risks associated with data breaches.</li><br><li><b>5. GDPR and CCPA Compliance: </b>Recruitplus adheres to global data privacy regulations like GDPR (General Data Protection Regulation) and CCPA (California Consumer Privacy Act). This includes providing candidates and companies with the right to access, modify, or delete their data upon request.</li><br><li><b>6. Regular Security Audits: </b>Conduct regular security audits and vulnerability assessments to identify and address potential security threats. This proactive approach helps maintain the platform’s integrity and safeguard candidate and company information.</li><br><li><b>7. Data Retention Policies: </b>Implement data retention policies that define how long candidate and company information is stored. Data is securely deleted once it is no longer needed, in compliance with legal and privacy requirements.</li><br><li><b>8. Secure APIs: </b>All integrations with third-party systems use secure APIs with authentication tokens and SSL/TLS protocols to prevent unauthorized access to data.</li></ul><br>By adopting these measures, Recruitplus ensures the privacy and security of candidate and company data throughout the recruitment process."
    },
];

export default function FAQ({
    stagger,
    fadeIn
}: {
    stagger: any,
    fadeIn: any
}) {

    return (
        <>
            <motion.section
                id="contact"
                className="w-full py-12"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={stagger}
            >
                <Head>
                    <title>FAQ - Your Company</title>
                    <meta name="description" content="Frequently Asked Questions" />
                </Head>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-center mb-8 text-secondary">Frequently Asked Questions</h1>
                    <Accordion type="single" collapsible>
                        {faqData.map((item, index) => (
                            <AccordionItem
                                key={index}
                                value={index.toString()}
                                className="mb-4 border border-gray-200 rounded-md hover:border-secondary"
                            >
                                <AccordionTrigger className="py-4 px-6 text-lg text-start font-medium cursor-pointer text-black no-underline hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="p-6 bg-gray-50 text-black text-base">
                                    <div dangerouslySetInnerHTML={
                                        { __html: item.answer }
                                    } />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </motion.section >
        </>
    );
}