
import LegalPolicyForm from "@/components/forms/legal-policy-form";
import { authOptions } from "@/lib/auth-options";

import { getServerSession } from "next-auth";

const getSocial = async ({ token, id }: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/admin/legal-policies/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-cache'
    }).then(res => res.json());
    return res?.data;
}


export default async function Page({ params }: {
    params: {
        id: string;
    }
}) {

    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/signin",
        },
    });

    const social = await getSocial({
        token: session?.accessToken,
        id: params?.id
    });

    return (
        <div>
            <LegalPolicyForm
                data={social}
                token={session?.accessToken}
            />
        </div>
    )
}