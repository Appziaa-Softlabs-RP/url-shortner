import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from 'next/link'

const getOverview = async ({ limit, search, category }: { limit: number; search: string; category: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/blogs?search=${search}&limit=${limit}&category=${category}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    }).then(res => res.json());
    return res?.data;
}

export default async function Blog({ params }: { params: { category?: string } }) {
    const data = await getOverview({
        limit: 10,
        search: '',
        category: params?.category === 'latest' ? '' : params?.category || ''
    });

    const heading = data?.heading || [];
    const categories = data?.categories || [];
    const articles = data?.blogs || [];
    const mostReadArticles = data?.most_read_articles || [];
    const categoryArticles = data?.category_articles || [];

    const activeCategory = params?.category || 'latest';

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
                    <Tabs value={activeCategory} className="w-full">
                        <TabsList className="h-16 w-full justify-start gap-4 bg-transparent max-w-full overflow-x-auto">
                            <TabsTrigger
                                value="latest"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none p-0"
                            >
                                <Link href="/blogs/latest">
                                    Latest Articles
                                </Link>
                            </TabsTrigger>
                            {categories.map((category: any) => (
                                <TabsTrigger
                                    key={category.id}
                                    value={category.slug}
                                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none p-0"
                                >
                                    <Link href={`/blogs/${category?.slug}`}>
                                        {category.name}
                                    </Link>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-[1fr_400px] gap-8">
                    <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Articles Section */}
                        <div className="lg:col-span-2">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold">
                                    {heading}
                                </h2>
                            </div>
                            <ShowArticles articles={articles} />
                        </div>
                        {categoryArticles.map((category: any) => (
                            category?.blogs?.length > 0 &&
                            <div key={category?.id} className="lg:col-span-2">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-3xl font-bold">{category?.name}</h2>
                                </div>
                                <ShowArticles articles={category?.blogs} />
                            </div>
                        ))}
                    </div>
                    {/* Sidebar */}
                    <div className="h-full">
                        <div className="sticky top-[100px] grid gap-4">
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
                                        {mostReadArticles.map((article: any) => (
                                            <div key={article.id}>
                                                {article.categories.map((category: any) => (
                                                    <Link
                                                        key={category.id}
                                                        href={`/category/${category.slug}`}
                                                        className="text-sm text-primary hover:underline mr-2"
                                                    >
                                                        {category.name}
                                                    </Link>
                                                ))}
                                                <h4 className="text-sm font-medium mt-1">
                                                    <Link href={`/blog/${article.slug}`} className="hover:text-primary">
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
        </div>
    )
}

const ShowArticles = ({ articles }: { articles: any[] }) => {

    if (articles.length === 0) {
        return <div className="text-center text-3xl font-semibold text-muted-foreground py-12">
            No articles found
        </div>
    }

    return <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article: any) => (
            <Card key={article.id} className="overflow-hidden min-w-[300px]">
                <CardHeader className="p-0">
                    <Image
                        src={article.image}
                        alt={article.title}
                        className="w-full h-[250px] object-cover"
                        width={400}
                        height={200}
                        unoptimized={true}
                    />
                </CardHeader>
                <CardContent className="p-6">
                    {article.categories.map((category: any) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="text-sm text-primary hover:underline mr-2"
                        >
                            {category.name}
                        </Link>
                    ))}
                    <div className="my-2">
                        <Link href={`/blog/${article.slug}`} className="hover:text-primary">
                            <h3 className="text-xl font-semibold">{article.title}</h3>
                            <p className="text-xs my-1">{article.description}</p>
                        </Link>
                    </div>
                </CardContent>
                <CardFooter className="px-6 py-4 border-t text-sm text-muted-foreground">
                    <span>{new Date(article.created_at).toLocaleDateString()}</span>
                </CardFooter>
            </Card>
        ))}
    </div>
}