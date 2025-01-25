import { AddOauthForm } from "@/components/dashboard/settings/api/add-oauth-app-form";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function SettingsProfilePage() {
    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/login",
        },
    });

    return (
        <div className="space-y-6">
            <div>
            <h3 className="text-lg sm:text-2xl font-bold">
                <Link href="/dashboard/settings/api" className="text-slate-600">API /</Link> Register OAuth application
                </h3>
            <p className="text-sm text-muted-foreground">
                    For documentation on using the Bitly API, visit the API Documentation.
                </p>
            </div>
            <Separator />
            <AddOauthForm token={session?.accessToken} />
        </div>
    );
}