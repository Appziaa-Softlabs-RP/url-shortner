export function HeroSection() {
    return (
        <div className="relative h-[300px] overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="/img/blog-banner.png"
                    alt="Blog hero background"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative z-10 flex h-full items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Blog</h1>
                    <p className="mt-4 text-lg font-medium">Learn, Grow & Share</p>
                </div>
            </div>
        </div>
    )
}

