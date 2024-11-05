import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className="w-full bg-secondary text-secondary-foreground p-6">
            {/* Want to know more section */}
            <div className="text-center py-12 space-y-4">
                <h2 className="text-2xl font-semibold">Whant to know more?</h2>
                <p className="text-secondary-foreground/60">Lorem ipsum dolor sit amet consectetur. Adipiscing sed nunc commodo se mattis nibhum.</p>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Contact Us
                </button>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid sm:grid-cols-2 justify-center gap-2 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center w-fit mb-4 md:mb-0">
                        <Image src="/img/logo-light.svg"
                        alt="SCANMATE"
                        width={300}
                        height={300}
                        className="max-w-[200px] max-h-[40px]" />
                    </Link>

                    {/* Social Icons */}
                    <div className="flex w-fit mx-auto sm:w-full justify-end gap-4">
                        <Link href="#" className="hover:text-primary transition-colors">
                            <Facebook className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            <Youtube className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-8 py-12 mb-12">
                    <div className="space-y-4">
                        <h3 className="font-semibold">Features</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">Our Feature</Link></li>
                            <li><Link href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Team</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">Our Story</Link></li>
                        </ul>
                    </div>


                    <div className="space-y-4">
                        <h3 className="font-semibold">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="/privacy" className="text-secondary-foreground/60 hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">More</h3>
                        <ul className="space-y-2">
                            <li className="text-secondary-foreground/60">Mail: info@scanmate.com</li>
                            <li className="text-secondary-foreground/60">Call: +91 9650067890</li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-sm text-secondary-foreground/60 pt-8 border-t border-secondary-foreground/10">
                    © {(new Date()).getFullYear()}. Made in India by RewardsPlus.
                </div>
            </div>
        </footer>
    )
}