import Link from 'next/link'
import Image from 'next/image'

const footerSections = [
    {
        title: 'Solutions',
        links: [
            { name: 'Recruitment', href: '/solutions/recruitment' },
            { name: 'Analytics', href: '/solutions/analytics' },
            { name: 'AI Solutions', href: '/solutions/ai-solutions' },
            { name: 'Consulting', href: '/solutions/consulting' },
        ],
    },
    {
        title: 'Company',
        links: [
            { name: 'About Us', href: '/about-us' },
            { name: 'Careers', href: '/careers' },
            { name: 'News', href: '/news' },
            { name: 'Contact', href: '/contact' },
        ],
    },
    {
        title: 'Frontend',
        links: [
            { name: 'Blogs', href: '/blogs/latest' },
            { name: 'Legal Policies', href: '/Legal Policies' },
            { name: 'Webinars', href: '/webinars' },
            { name: 'Documentation', href: '/documentation' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { name: 'Privacy Policy', href: '/privacy-policy' },
            { name: 'Terms of Service', href: '/terms-of-service' },
            { name: 'Security', href: '/security' },
            { name: 'Compliance', href: '/compliance' },
        ],
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
                                        <Link href={link.href} className="hover:text-white transition-colors">
                                            {link.name}
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