import { getDisplayName } from "@/api/profileApi";
import { DisplayNameForm } from "@/components/dashboard/settings/display-name-form";
import { Separator } from "@/components/ui/separator"
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

const getUrlsData = async ({ token }: any) => {
    try {
        return await getDisplayName({
            token: token
        });
    } catch (e) {
        return null
    }
};

export default async function SettingsProfilePage() {
    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/signin",
        },
    });
    const data = await getUrlsData({
        token: session?.accessToken,
    });

    const name = data?.name
    return <>
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
            </div>
            <Separator />
            <DisplayNameForm
                token={session?.accessToken}
                name={name}
            />
        </div>
    </>
}