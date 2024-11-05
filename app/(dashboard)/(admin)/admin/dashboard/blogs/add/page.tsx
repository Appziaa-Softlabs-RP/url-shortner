
import BlogForm from "@/components/forms/blogs/add-blog";
import { authOptions } from "@/lib/auth-options";

import { getServerSession } from "next-auth";

const getBlogCategories = async ({ token, search, page, limit }: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/blog-categories?page=${page}&search=${search}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-cache'
    }).then(res => res.json());
    return res?.data;
}

export default async function Page() {

    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/signin",
        },
    });

    const categories = (await getBlogCategories({
        token: session?.accessToken,
        search: '',
        page: 1,
        limit: 100,
    }))?.data;

    return (
        <div>
            <BlogForm
                token={session?.accessToken}
                categories={categories}
            />
        </div>
    )
}