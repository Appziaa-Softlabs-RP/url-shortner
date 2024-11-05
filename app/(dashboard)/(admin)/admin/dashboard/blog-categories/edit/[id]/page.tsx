
import BlogCategoryForm from "@/components/forms/blogs/add-category";
import { authOptions } from "@/lib/auth-options";

import { getServerSession } from "next-auth";

const getSocial = async ({ token, id }: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/blog-categories/${id}`, {
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

    const social = await getSocial({
        token: session?.accessToken,
        id: params?.id
    });

    return (
        <div>
            <BlogCategoryForm
                data={social}
                token={session?.accessToken}
            />
        </div>
    )
}