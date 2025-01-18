import { getUrl } from "@/api";
import UrlShortenerForm from "@/components/forms/dashboard/links/save-link-form";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

const getUrlData = async ({ token, short_code }: any) => {
    try {
        return await getUrl({
            short_code: short_code,
            token: token
        });
    } catch (e) {
        return null
    }
}

export default async function Page(props: {
    params: Promise<{
        short_code: string;
    }>
}) {

    const params = await props.params;

    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/login",
        },
    });

    const data = await getUrlData({
        token: session?.accessToken,
        short_code: params?.short_code
    });


    return <>
        <UrlShortenerForm
            token={session?.accessToken}
            data={data}
        />
    </>
}