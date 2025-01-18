import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Testimonials() {
    const testimonials = [
        {
            quote: "When it comes to deciding on a platform to use for generating all of our QR Codes, there was a general consensus among the team—of course we should use Bitly! We didn't even give it a second thought.",
            author: "Jessica Park",
            role: "Marketing Director at TechCorp",
            avatar: "/placeholder.svg?height=40&width=40"
        },
        // Add more testimonials as needed
    ]

    return (
        <section className="py-20 px-4 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-[#1d4ed8] via-[#1e40af] to-[#111827]">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                    What our customers are saying
                </h2>
                <div className="relative">
                    <Card className="bg-white p-8 max-w-2xl mx-auto">
                        <CardContent className="space-y-6">
                            <Quote className="w-12 h-12 text-[#5D91FA]" />
                            <p className="text-lg text-gray-700">{testimonials[0].quote}</p>
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={testimonials[0].avatar} alt={testimonials[0].author} />
                                    <AvatarFallback>JP</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{testimonials[0].author}</p>
                                    <p className="text-sm text-gray-600">{testimonials[0].role}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex justify-center gap-4 mt-8">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/20 hover:bg-white/30 text-white"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="bg-white/20 hover:bg-white/30 text-white"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
