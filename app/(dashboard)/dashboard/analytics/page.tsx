import { getAllUrlsAnalytics } from "@/api";
import { UrlAnalytics } from "@/components/dashboard/url-analytics";
import BackButton from "@/components/shared/back-button";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

const getUrlData = async ({ token }: any) => {
    try {
        return await getAllUrlsAnalytics({
            token: token
        });
    } catch (e) {
        return null
    }
}

export default async function Page() {

    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/login",
        },
    });

    const data = await getUrlData({
        token: session?.accessToken,
    });

    const analyticsData = data?.analytics

    if (analyticsData === null) {
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
            <UrlAnalytics
                urlAnalytics={analyticsData}
            />
        </div>
    )
}