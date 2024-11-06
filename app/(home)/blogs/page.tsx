import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import Link from 'next/link'

const categories = [
    "Latest Articles",
    "Start a Business",
    "Sales & Marketing",
    "Technology",
    "Government",
    "Business Tools"
]

const articles = [
    {
        title: "Engage the Audience You Want With These Ecommerce Tips",
        author: "RewardsPlus Team",
        date: "Aug 18, 2022",
        image: "/placeholder.svg?height=200&width=400",
        category: "Sales & Marketing"
    },
    {
        title: "How to Build a Successful Online Store",
        author: "RewardsPlus Team",
        date: "Aug 18, 2022",
        image: "/placeholder.svg?height=200&width=400",
        category: "Start a Business"
    },
    {
        title: "Digital Marketing Strategies for 2024",
        author: "RewardsPlus Team",
        date: "Aug 18, 2022",
        image: "/placeholder.svg?height=200&width=400",
        category: "Sales & Marketing"
    },
    {
        title: "Essential Business Tools for Startups",
        author: "RewardsPlus Team",
        date: "Aug 18, 2022",
        image: "/placeholder.svg?height=200&width=400",
        category: "Business Tools"
    }
]

const popularArticles = [
    {
        title: "Still No Media Coverage? This Press Release Guide is Helping Businesses Get Seen",
        category: "Start a Business"
    },
    {
        title: "How to Create a Winning Marketing Strategy",
        category: "Sales & Marketing"
    },
    {
        title: "Top Technology Trends for Small Businesses",
        category: "Technology"
    },
    {
        title: "Government Grants for Small Businesses",
        category: "Government"
    }
]

export default function Blog() {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[300px] p-0">
                <div
                    className="absolute inset-0 blur-[2px] w-full h-full"
                    style={{
                        backgroundImage: "url('/img/blog-banner.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Blog</h1>
                    <p className="text-xl">Learn, Grow & Share</p>
                </div>
            </div>

            {/* Navigation */}
            <div className="border-b">
                <div className="container mx-auto px-4">
                    <Tabs defaultValue="Latest Articles" className="w-full">
                        <TabsList className="h-16 w-full justify-start gap-4 bg-transparent">
                            {categories.map((category) => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Articles Section */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold">Latest Articles</h2>
                            {/* <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                                <Input
                                    placeholder="Search articles"
                                    className="pl-10 w-[300px]"
                                />
                            </div> */}
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {articles.map((article, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <CardHeader className="p-0">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <Link
                                            href="#"
                                            className="text-sm text-primary hover:underline"
                                        >
                                            {article.category}
                                        </Link>
                                        <h3 className="text-xl font-semibold mt-2 mb-4">
                                            <Link href="#" className="hover:text-primary">
                                                {article.title}
                                            </Link>
                                        </h3>
                                    </CardContent>
                                    <CardFooter className="px-6 py-4 border-t text-sm text-muted-foreground">
                                        <span>by {article.author}</span>
                                        <span className="mx-2">•</span>
                                        <span>{article.date}</span>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Promotional Banner */}
                        <Card className="bg-secondary text-white">
                            <CardContent className="p-6">
                                <h3 className="text-2xl font-bold mb-4">Now start selling Online</h3>
                                <p className="mb-6">
                                    Take your business online with RewardsPlus. Get your free online store. Live now.
                                </p>
                                <Button className="w-full">
                                    Start 30 days free trial
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Most Read Articles */}
                        <Card>
                            <CardHeader>
                                <h3 className="text-xl font-semibold">Most read articles</h3>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {popularArticles.map((article, index) => (
                                        <div key={index}>
                                            <Link
                                                href="#"
                                                className="text-sm text-primary hover:underline"
                                            >
                                                {article.category}
                                            </Link>
                                            <h4 className="text-sm font-medium mt-1">
                                                <Link href="#" className="hover:text-primary">
                                                    {article.title}
                                                </Link>
                                            </h4>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}