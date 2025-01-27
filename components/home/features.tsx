import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link2, Network, QrCode } from 'lucide-react'

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
            title: "One link to all",
            description: "Get a single short link or QR code for your app, no matter the platform—Apple App Store, Google Play, Microsoft Store, and more.",
            icon: Network,
        },
    ]

    return (
        <section className="py-4 sm:py-16 px-4" id="features">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                    The Platform You Need
                </h2>
                <p className="text-lg text-center text-gray-600 mb-12">
                    All the products you need to build brand connections, manage links and QR Codes
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-[1px] hover:border-primary transition-colors">
                            <CardHeader>
                                <feature.icon className="w-12 h-12 text-primary mb-4" />
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

