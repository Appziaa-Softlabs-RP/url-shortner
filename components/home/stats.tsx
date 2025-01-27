
export function Stats() {
    const stats = [
        {
            number: "10K+",
            label: "Global active customers",
            icon: "🌐"
        },
        {
            number: "250K",
            label: "Links & QR Codes created monthly",
            icon: "🔗"
        },
        {
            number: "1K+",
            label: "App integrations",
            icon: "🔌"
        },
        {
            number: "10K",
            label: "Connections linked & tracked monthly",
            icon: "📊"
        }
    ]

    return (
        <section className="py-4 sm:py-16 px-4 bg-gray-50">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Loved and trusted by thousands of users.
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center"
                        >
                            <span className="text-4xl mb-2 block">{stat.icon}</span>
                            <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                            <p className="text-gray-600 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
