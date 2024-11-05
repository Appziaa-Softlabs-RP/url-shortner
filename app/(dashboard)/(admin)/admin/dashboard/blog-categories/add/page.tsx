
import BlogCategoryForm from "@/components/forms/blogs/add-category";
import { authOptions } from "@/lib/auth-options";

import { getServerSession } from "next-auth";

export default async function Page() {

    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/signin",
        },
    });

    return (
        <div>
            <BlogCategoryForm
                token={session?.accessToken}
            />
        </div>
    )
}