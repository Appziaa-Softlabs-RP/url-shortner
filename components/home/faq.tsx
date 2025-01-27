"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
    {
        question: "What is RWPS?",
        answer: "RWPS is a free, enterprise-grade URL shortener that helps you create, manage, and track shortened links with ease. It offers advanced analytics, REST API integration, and robust performance for businesses and individuals alike."
    },
    {
        question: "Is RWPS really free?",
        answer: "Yes, absolutely! RWPS is and always will be completely free. You can access all our features without worrying about limits, hidden fees, or the need to upgrade."
    },
    {
        question: "How does RWPS remain free?",
        answer: "RWPS is powered by RewardsPlus, a company dedicated to advancing accessible technology solutions. Anonymized insights gathered through the service help us improve our tools and products, enabling us to keep RWPS free for everyone."
    },
    {
        question: "What features does RWPS offer?",
        answer: "<ul><li>Unlimited URL shortening</li><li>Real-time analytics (clicks, device types, geolocation, referrers)</li><li>REST API integration for automation</li><li>Customizable branded links</li><li>Enterprise-grade reliability and performance</li><li>GDPR and CCPA compliance</li></ul>"
    },
    {
        question: "How do I shorten a URL with RWPS?",
        answer: "You can shorten URLs in two ways:<ul><li>Use our web interface by pasting the long URL and clicking 'Shorten.'</li><li>Integrate RWPS into your apps or workflows with our REST API for automated link shortening.</li></ul>"
    },
    {
        question: "Is there a limit to how many URLs I can shorten?",
        answer: "No, RWPS allows unlimited URL shortening, even for high-volume users."
    },
    {
        question: "Can I customize the shortened URLs?",
        answer: "Yes, you can personalize your destination links to reflect your branding and keep your information up to date."
    },
    {
        question: "Does RWPS provide analytics?",
        answer: "Yes! RWPS offers a comprehensive analytics dashboard where you can track:<ul><li>Total clicks</li><li>Unique visitors</li><li>Geographic locations</li><li>Referrers</li><li>Device usage</li><li>And more</li></ul>"
    },
    {
        question: "How secure is RWPS?",
        answer: "RWPS is built with enterprise-grade security to ensure your links and data are safe. It is fully GDPR and CCPA compliant, adhering to the highest standards of privacy."
    },
    {
        question: "Can developers integrate RWPS with their applications?",
        answer: "Absolutely! RWPS provides a robust REST API that developers can use to automate URL shortening and access click analytics programmatically."
    },
    {
        question: "Is RWPS suitable for businesses of all sizes?",
        answer: "Yes, whether you're a solo entrepreneur, a small business, or a large enterprise, RWPS scales to meet your needs without compromising on performance."
    },
    {
        question: "How can I get started with RWPS?",
        answer: "It’s simple! Just sign up at RWPS Signup and start shortening your URLs instantly."
    },
    {
        question: "Can I use RWPS for marketing campaigns?",
        answer: "Yes, RWPS is perfect for marketers. Use shortened URLs to track campaign performance, optimize engagement, and gain valuable insights about your audience."
    },
    {
        question: "What makes RWPS different from other URL shorteners?",
        answer: "RWPS combines enterprise-grade features like unlimited usage, advanced analytics, and API integration, all at zero cost—making it a truly unique offering."
    },
    {
        question: "Who can I contact for support?",
        answer: "If you need assistance, feel free to reach out to us at support@rwps.in. We're here to help!"
    },
];

export default function FAQ() {

    return (
        <>
            <section
                id="contact"
                className="w-full py-12 max-w-4xl mx-auto"
            >
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-center mb-8 text-secondary">Frequently Asked Questions</h1>
                    <Accordion type="single" collapsible>
                        {faqData.map((item, index) => (
                            <AccordionItem
                                key={index}
                                value={index.toString()}
                                className="mb-4 rounded-none border border-t-1 border-b-white border-x-white"
                            >
                                <AccordionTrigger className="py-4 px-6 text-lg text-start font-medium cursor-pointer text-black no-underline hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="p-6 text-black text-base">
                                    <div dangerouslySetInnerHTML={
                                        { __html: item.answer }
                                    } />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section >
        </>
    );
}