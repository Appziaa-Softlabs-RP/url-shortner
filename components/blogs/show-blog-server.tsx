import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import Subscribe from "./subscribe"
import BlogsFilter from "./blog-filter"
import { getBlogs } from "@/api/blogsApi"
import ShowBlogCard from "../cards/blogs/show-blog-card"

const getBlogsData = async ({ search, limit, category, order }: any) => {
    try {
        return await getBlogs({
            search: search,
            category: category,
            limit: limit,
            order: order,
        })
    } catch (e) {
        console.log(e)
        return null
    }
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }) {
    const params = await props.params
    const category = params.category || "latest"
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1)

    return {
        title: `${capitalizedCategory} Blogs | ${process.env.NEXT_PUBLIC_APP_NAME}`,
        description: `Explore our ${capitalizedCategory} blog posts. Learn, grow, and stay updated with the latest insights and trends.`,
        openGraph: {
            title: `${capitalizedCategory} Blogs | ${process.env.NEXT_PUBLIC_APP_NAME}`,
            description: `Explore our ${capitalizedCategory} blog posts. Learn, grow, and stay updated with the latest insights and trends.`,
            images: [{ url: `${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.png` }],
        },
    }
}

export default async function Blog(props: {
    params: Promise<{ category?: string }>
    searchParams: Promise<{ order?: string }>
}) {
    const params = await props.params
    const searchParams = await props.searchParams
    const order = searchParams?.order || "desc"
    const data = await getBlogsData({
        limit: 10,
        search: "",
        category: params?.category === "latest" ? "" : params?.category || "",
        order: order,
    })
    const heading = data?.heading || []
    const categories = data?.categories || []
    const articles = data?.blogs || []
    const mostReadArticles = data?.most_read_articles || []
    const categoryArticles = data?.category_articles || []

    const activeCategory = params?.category || "latest"

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <div className="sticky top-0 z-10 bg-white border-b">
                <div className="container mx-auto px-4">
                    <Tabs value={activeCategory} className="w-full max-w-full overflow-x-auto">
                        <TabsList className="h-16 w-full justify-start gap-4 bg-transparent max-w-full md:overflow-x-auto">
                            <TabsTrigger
                                value="latest"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none p-0"
                            >
                                <Link href="/blogs/latest">Latest Blogs</Link>
                            </TabsTrigger>
                            {categories?.map((category: any) => (
                                <TabsTrigger
                                    key={category?.id}
                                    value={category?.slug}
                                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none p-0"
                                >
                                    <Link href={`/blogs/${category?.slug}`}>{category?.name}</Link>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-[1fr_400px] gap-8">
                    <div className="grid w-full grid-cols-1 gap-8">
                        {/* Articles Section */}
                        <div>
                            <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
                                <h2 className="text-3xl font-bold">{heading}</h2>
                                <BlogsFilter />
                            </div>
                            <ShowArticles articles={articles} />
                        </div>
                        {categoryArticles.map(
                            (category: any) =>
                                category?.blogs?.length > 0 && (
                                    <div key={category?.id}>
                                        <div className="flex justify-between items-center mb-8">
                                            <h2 className="text-3xl font-bold">{category?.name}</h2>
                                        </div>
                                        <ShowArticles articles={category?.blogs} />
                                    </div>
                                ),
                        )}
                    </div>
                    {/* Sidebar */}
                    <div className="h-full">
                        <div className="sticky top-[100px] grid gap-4 md:max-h-[calc(100vh-100px)] overflow-y-auto pb-8 px-2">
                            <Subscribe />
                            {/* Most Read Articles */}
                            <Card>
                                <CardHeader>
                                    <h3 className="text-2xl font-semibold">Most read articles</h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {mostReadArticles.map((article: any) => (
                                            <div key={article.id}>
                                                {article.categories.map((category: any) => (
                                                    <Link
                                                        key={category.id}
                                                        href={`/blogs/${category?.slug}`}
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
        return <div className="text-center text-3xl font-semibold text-muted-foreground py-12">No articles found</div>
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: any) => (
                <div key={article?.id}>
                    <ShowBlogCard blog={article} />
                </div>
            ))}
        </div>
    )
}

