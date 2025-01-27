import { Card, CardContent } from "@/components/ui/card"
import { Link, BarChart3, Paintbrush, Code2, AppWindowIcon as Apps, Server, Activity, Shield } from "lucide-react"

const features = [
    {
        title: "Unlimited URL Shortening",
        description: "Shorten as many URLs as you need, with no limits.",
        icon: Link,
    },
    {
        title: "Real-Time Analytics",
        description: "Track clicks, user demographics, device usage, geographic locations, and more.",
        icon: BarChart3,
    },
    {
        title: "Customizable Short Links",
        description: "Personalize your URLs to match your brand's identity.",
        icon: Paintbrush,
    },
    {
        title: "REST API Integration",
        description: "Seamlessly integrate RWPS with your apps or website for automated link shortening.",
        icon: Code2,
    },
    {
        title: "One Link for All Your Apps",
        description: "Streamline your link management across all platforms with a single, powerful tool",
        icon: Apps,
    },
    {
        title: "Enterprise-Grade Reliability",
        description: "Ensure fast and secure performance, even at high volumes.",
        icon: Server,
    },
    {
        title: "Advanced Link Tracking",
        description: "Gain insights into traffic sources, referrers, and user engagement.",
        icon: Activity,
    },
    {
        title: "Data Privacy Compliance",
        description: "Ensuring your data is safe and secure.",
        icon: Shield,
    },
]

export function PricingFeatures() {
    return (
        <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container grid lg:grid-cols-2 gap-4 mx-auto px-8 items-center justify-center">
                <div className="max-w-3xl mx-auto text-start mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">All Features, Completely Free</h2>
                    <p className="text-xl text-gray-600">
                        Unlock the full potential of RWPS with zero cost. Enjoy unrestricted access to all our powerful features, at
                        no charge.
                    </p>
                </div>
                <div className="grid gap-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <div className="p-2 rounded-full h-fit w-fit bg-blue-100">
                                <feature.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </section>
    )
}

