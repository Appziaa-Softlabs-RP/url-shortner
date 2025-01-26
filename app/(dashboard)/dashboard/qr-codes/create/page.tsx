import QrCodeForm from "@/components/forms/dashboard/qr-code/qr-code-form"
import { authOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"

export default async function CreateQrCodePage() {
    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/login",
        },
    })

    return <QrCodeForm token={session?.accessToken} />
}

