import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link2, QrCode, Layout } from 'lucide-react'

export function Features() {
    const features = [
        {
            title: "URL Shortener",
            description: "Transform long URLs into concise, shareable links that drive more clicks",
            icon: Link2,
        },
        {
            title: "QR Codes",
            description: "Create custom QR codes to connect the physical and digital worlds",
            icon: QrCode,
        },
        {
            title: "Landing Pages",
            description: "Build mobile-optimized landing pages that convert visitors into customers",
            icon: Layout,
        },
    ]

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    The Platform You Need
                </h2>
                <p className="text-lg text-center text-gray-600 mb-12">
                    All the products you need to build brand connections, manage links and QR Codes
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-2 hover:border-[#5D91FA] transition-colors">
                            <CardHeader>
                                <feature.icon className="w-12 h-12 text-[#4800C4] mb-4" />
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

