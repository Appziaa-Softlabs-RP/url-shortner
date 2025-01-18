import UrlShortenerForm from "@/components/forms/dashboard/links/save-link-form";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

export default async function Page() {

    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/login",
        },
    });

    return <>
        <UrlShortenerForm
            token={session?.accessToken}
        />
    </>
}