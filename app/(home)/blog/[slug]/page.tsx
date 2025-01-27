import BlogPost from '@/components/blogs/blog-post';

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    return <BlogPost params={props.params} />
}