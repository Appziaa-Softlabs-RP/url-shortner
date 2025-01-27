import { CheckCircle } from "lucide-react"
import { ShortnerUI } from "./shortner-ui"

export function Hero() {
    return (
        <section className="bg-gradient-to-br from-[#111827] to-[#2E2662] text-white py-4 sm:py-16 sm:px-4">
            <div className="p-4 mx-auto max-w-5xl grid gap-6">
                <div className="grid gap-2 sm:gap-6 text-center sm:mb-12 mx-auto">
                    <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                        Enterprise-Grade URL Shortening — Always Free
                    </h1>
                    <p className="text-sm sm:text-lg md:text-xl mx-auto">
                        Simplify your links, track their performance, and empower your campaigns with enterprise-grade URL shortening.<br />Use it on-screen or through our powerful REST API.
                    </p>
                </div>

                <ShortnerUI />

                <div className="sm:text-center sm:flex flex-col gap-2 sm:justify-center">
                    <div className="grid sm:grid-cols-3 sm:justify-center gap-4 mb-4 text-sm font-light max-w-4xl mx-auto">
                        <span className="flex gap-2 sm:justify-center items-center">
                            <CheckCircle size={20} className="text-yellow-300" />
                            <span>Complete link analytics</span>
                        </span>
                        <span className="flex gap-2 sm:justify-center items-center">
                            <CheckCircle size={20} className="text-yellow-300" />
                            <span>Customizable short links</span>
                        </span>
                        <span className="flex gap-2 sm:justify-center items-center">
                            <CheckCircle size={20} className="text-yellow-300" />
                            <span>URL shortening with QR Code</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

