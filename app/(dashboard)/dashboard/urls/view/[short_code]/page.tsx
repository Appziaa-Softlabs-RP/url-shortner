import { getUrl } from "@/api";
import ShowUrlCard from "@/components/cards/url/show-url-card";
import { UrlAnalytics } from "@/components/dashboard/url-analytics";
import UrlCreatedSuccess from "@/components/dashboard/url-created-success";
import BackButton from "@/components/shared/back-button";
import { Button } from "@/components/ui/button";
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
    }>,
    searchParams: Promise<{
        new: string;
    }>
}) {

    const params = await props.params;
    const searchParams = await props.searchParams;

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

    const urlData = data?.url;
    const analyticsData = data?.analytics



    if (urlData === null) {
        return <div className="flex items-center justify-center flex-col gap-4">
            <h1 className="text-2xl md:text-4xl font-bold text-center my-8 text-slate-700">
                Url not found
            </h1>
            <Button className="w-fit mx-auto">
                <a href={'/dashboard/urls'}>Back to list</a>
            </Button>
        </div>
    }

    return (
        <div className="container p-0 sm:p-4 grid gap-6 py-5">
            <BackButton
                href={'/dashboard/urls'}
                text={'Back to list'}
            />
            <ShowUrlCard data={urlData}
                token={session?.accessToken}
            />
            <UrlAnalytics
                urlAnalytics={analyticsData}
            />
            <UrlCreatedSuccess
                data={urlData}
                shortCode={params.short_code}
                isNew={searchParams?.new == 'true'}
            />
        </div>
    )
}