import { CheckCircle } from "lucide-react"
import { ShortnerUI } from "./shortner-ui"

export function Hero() {
    return (
        <section className="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-[#1d4ed8] via-[#1e40af] to-[#111827] text-white py-4 sm:py-16 sm:px-4">
            <div className="p-4 mx-auto max-w-5xl">
                <div className="grid gap-2 sm:gap-6 text-center sm:mb-12 mx-auto">
                    <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                        Enterprise-Grade URL Shortening — Always Free
                    </h1>
                    <p className="text-sm sm:text-lg md:text-xl mx-auto">
                        Simplify your links, track their performance, and empower your campaigns with enterprise-grade URL shortening. Use it on-screen or through our powerful REST API.
                    </p>
                </div>

                <ShortnerUI />

                <div className="sm:text-center sm:flex flex-col gap-2 sm:justify-center">
                    <p className="text-md mb-4">Sign up for free. Your free plan includes:</p>
                    <div className="grid sm:grid-cols-3 sm:justify-center gap-4 mb-4 text-sm font-light max-w-4xl mx-auto">
                        <span className="flex gap-2 sm:justify-center items-center">
                            <CheckCircle size={20} className="text-orange-500" />
                            <span>Basic link analytics</span>
                        </span>
                        <span className="flex gap-2 sm:justify-center items-center">
                            <CheckCircle size={20} className="text-orange-500" />
                            <span>Customizable short links</span>
                        </span>
                        <span className="flex gap-2 sm:justify-center items-center">
                            <CheckCircle size={20} className="text-orange-500" />
                            <span>URL shortening</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

