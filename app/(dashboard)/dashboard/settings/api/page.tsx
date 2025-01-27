import { getOauthApps } from "@/api/oauthAppApi";
import ShowAuthApps from "@/components/dashboard/settings/api/show-oauth-app";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

const getUrlsData = async ({token}: {token: string}) => {
    try {
        return await getOauthApps({
            token: token,
        });
    } catch (e) {
        return null;
    }
};

export default async function SettingsProfilePage() {
    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/login",
        },
    });

    const data = await getUrlsData({
        token: session?.accessToken ?? '',
    });

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg sm:text-2xl font-bold">API</h3>
                <p className="text-sm text-muted-foreground">
                    For documentation on using the RWPS API, visit the API Documentation.
                </p>
            </div>
            <Separator />
            <ShowAuthApps
                token={session?.accessToken}
                data={data}
            />
        </div>
    );
}