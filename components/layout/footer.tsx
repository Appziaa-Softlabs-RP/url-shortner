import Link from 'next/link'
import Image from 'next/image'

const footerSections = [
    {
        title: 'Solutions',
        links: ['Recruitment', 'Analytics', 'AI Solutions', 'Consulting'],
    },
    {
        title: 'Company',
        links: ['About Us', 'Careers', 'News', 'Contact'],
    },
    {
        title: 'Resources',
        links: ['Blog', 'Case Studies', 'Webinars', 'Documentation'],
    },
    {
        title: 'Legal',
        links: ['Privacy Policy', 'Terms of Service', 'Security', 'Compliance'],
    },
]

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-white mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link href="#" className="hover:text-white transition-colors">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap justify-between items-center pt-8 border-t border-gray-800">
                    <div className="text-sm">© 2024 Company Name. All rights reserved.</div>
                    <div className="flex gap-4">
                        {[1, 2, 3, 4].map((index) => (
                            <Image
                                key={index}
                                src={`/placeholder.svg?height=40&width=40`}
                                alt={`Certification ${index}`}
                                width={40}
                                height={40}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}