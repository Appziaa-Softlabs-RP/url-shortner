import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export function PricingWhyFree() {
    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-8">
                <div className="grid lg:grid-cols-[1.5fr_1fr] justify-center gap-12 items-center">
                    <div className="mx-auto grid gap-6">
                        <h2 className="text-3xl lg:text-4xl font-bold">Why RWPS is Always Free</h2>
                        <div className="lg:hidden max-w-[400px] w-fit mx-auto">
                            <Image
                                src={'/img/question.svg'}
                                alt="savings"
                                className=""
                                height={500}
                                width={500}
                            />
                        </div>
                        <div className="prose prose-lg max-w-none grid gap-2">
                            <p>
                                At RWPS which is powered by RewardsPlus, we believe in empowering businesses, developers, and marketers
                                with the tools they need to succeed—without the burden of unnecessary costs.
                            </p>
                            <p>
                                The internet is built on connection, collaboration, and creativity, and a small tool like a URL shortener
                                shouldn&apos;t stand in the way of big ideas. By keeping RWPS free, we aim to level the playing field, ensuring
                                that businesses of all sizes—from budding startups to thriving enterprises—have access to enterprise-grade
                                technology without financial barriers.
                            </p>
                            <p>
                                Our vision is to create a digital ecosystem where innovation thrives, campaigns flourish, and ideas reach
                                their full potential. RWPS is not just a service; it&apos;s a commitment to the power of accessibility and
                                inclusivity in technology.
                            </p>
                            <p>Because when we help you grow, we grow together. 💙</p>
                            <p>
                                Your data is always secure with us. We never share it with third parties, and we remain committed to
                                maintaining the highest standards of privacy and integrity. By keeping RWPS free, we&apos;re building a
                                smarter, more connected digital ecosystem for everyone.
                            </p>
                        </div>
                        <Link href="https://rewardsplus.in/privacy" target="_blank">
                            <Button variant={'outline'}
                                size={'sm'}
                                className="border-primary w-fit rounded"
                            >
                                Learn about data privacy and security
                            </Button>
                        </Link>
                    </div>
                    <div className="hidden lg:flex justify-center">
                        <Image
                            src={'/img/question.svg'}
                            alt="savings"
                            className=""
                            height={500}
                            width={500}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

