
import LegalPolicyForm from "@/components/forms/legal-policy-form";
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
            <LegalPolicyForm
                token={session?.accessToken}
            />
        </div>
    )
}