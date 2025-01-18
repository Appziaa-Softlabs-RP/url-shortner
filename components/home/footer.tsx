import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Footer() {
    const footerLinks = {
        "Why Bitly?": [
            "Bitly 101",
            "Enterprise Class",
            "Integrations & API",
            "Pricing",
        ],
        "Products": [
            "Link Management",
            "QR Codes",
            "Link-in-bio",
            "Social Media",
            "Digital Marketing",
        ],
        "Solutions": [
            "Social Media",
            "Digital Marketing",
            "Customer Service",
            "For Developers",
        ],
        "Resources": [
            "Blog",
            "Resource Library",
            "Developers",
            "App Connectors",
            "Support",
            "Trust Center",
            "Browser Extension",
            "Mobile App",
        ],
        "Legal": [
            "Privacy Policy",
            "Cookie Policy",
            "Terms of Service",
            "Acceptable Use Policy",
            "Code of Conduct",
        ],
        "Company": [
            "About Bitly",
            "Careers",
            "Partners",
            "Press",
            "Contact",
            "Reviews",
        ],
    }

    return (
        <footer className="bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-[#1d4ed8] via-[#1e40af] to-[#111827] text-white pt-20 pb-8">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        More than a link shortener
                    </h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Knowing how your clicks and scans are performing should be as easy as making them. That&apos;s why we&apos;ve optimized all your connections in one place.
                    </p>
                    <Button className="bg-white text-[#4800C4] hover:bg-gray-100">
                        Get started for free
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-semibold mb-4">{category}</h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className="text-gray-300 hover:text-white text-sm"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-700 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-300">
                            © 2024 URLShort. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-300 hover:text-white">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-white">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

