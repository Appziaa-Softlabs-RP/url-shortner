import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import FeaturesForm from "./feature-form";

export default async function Page() {
    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/login",
        },
    });

    return <FeaturesForm
        token={session?.accessToken}
    />
}