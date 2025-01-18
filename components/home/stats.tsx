
export function Stats() {
    const stats = [
        {
            number: "500K+",
            label: "Global paying customers",
            icon: "🌐"
        },
        {
            number: "256M",
            label: "Links & QR Codes created monthly",
            icon: "🔗"
        },
        {
            number: "800+",
            label: "App integrations",
            icon: "🔌"
        },
        {
            number: "10B",
            label: "Connections linked & tracked monthly",
            icon: "📊"
        }
    ]

    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    Adopted and loved by millions of users for over a decade
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center"
                        >
                            <span className="text-4xl mb-2 block">{stat.icon}</span>
                            <h3 className="text-4xl font-bold text-[#4800C4] mb-2">{stat.number}</h3>
                            <p className="text-gray-600 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
