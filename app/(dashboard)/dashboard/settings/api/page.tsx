import { getDisplayName } from "@/api/profileApi";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

const getUrlsData = async (token: any) => {
    try {
        return await getDisplayName({
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
        token: session?.accessToken,
    });

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg sm:text-2xl font-bold">API</h3>
                <p className="text-sm text-muted-foreground">
                    For documentation on using the Bitly API, visit the API Documentation.
                </p>
            </div>
            <Separator />
        </div>
    );
}