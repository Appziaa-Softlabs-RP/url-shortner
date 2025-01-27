import { getLatestBlogs } from "@/api/blogsApi";
import { ShowBlogs } from "./blogs";

const getBlogsData = async () => {
    try {
        return await getLatestBlogs();
    } catch (e) {
        return null
    }
}
export default async function BlogsServer() {

    const blogs = await getBlogsData();

    return <>
        <ShowBlogs data={blogs} />
    </>
}