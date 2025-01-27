import { PricingFeatures } from "@/components/pricing/features";
import { PricingHero } from "@/components/pricing/hero";
import { PricingWhyFree } from "@/components/pricing/why-free";

export default function Home() {
    return (
        <main>
            <PricingHero />
            <PricingWhyFree />
            <PricingFeatures />
        </main>
    )
}

