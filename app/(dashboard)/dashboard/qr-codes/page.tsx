import { getQrCodes } from "@/api/qrCodeApi"
import ShowQrCodes from "@/components/dashboard/qr-code/show-qr-codes"
import { authOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"

const getQrCodesData = async ({ token, search, page, limit }: any) => {
    try {
        return await getQrCodes({
            token: token,
            search: search,
            page: page,
            limit: limit,
        })
    } catch (e) {
        return null
    }
}

export default async function QrCodesPage() {
    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/login",
        },
    })

    const data = await getQrCodesData({
        token: session?.accessToken,
        search: "",
        page: 1,
        limit: 10,
    })

    return (
        <>
            <ShowQrCodes qrCodes={data} token={session?.accessToken} />
        </>
    )
}

