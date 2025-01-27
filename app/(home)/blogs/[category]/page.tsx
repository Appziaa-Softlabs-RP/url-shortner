import Blog from "@/components/blogs/show-blog-server";

export default async function Page(props: {
    params: Promise<{ category?: string }>,
    searchParams: Promise<{ order?: string }>
}) {
    return <Blog params={props.params} searchParams={props.searchParams} />
}