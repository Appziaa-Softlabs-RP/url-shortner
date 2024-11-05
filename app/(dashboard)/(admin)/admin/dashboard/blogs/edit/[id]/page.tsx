import BlogForm from "@/components/forms/blogs/add-blog";
import { authOptions } from "@/lib/auth-options";

import { getServerSession } from "next-auth";

const getSocial = async ({ token, id }: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/blogs/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-cache'
    }).then(res => res.json());
    return res?.data;
}

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

export default async function Page({ params }: {
    params: {
        id: string;
    }
}) {

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
    }))?.data

    const social = await getSocial({
        token: session?.accessToken,
        id: params?.id
    });

    return (
        <div>
            <BlogForm
                categories={categories}
                data={social}
                token={session?.accessToken}
            />
        </div>
    )
}