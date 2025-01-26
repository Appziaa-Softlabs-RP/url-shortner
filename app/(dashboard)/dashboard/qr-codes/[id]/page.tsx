import { getQrCode } from "@/api/qrCodeApi"
import ShowQrCodeCard from "@/components/cards/qrcodes/show-qr-codes"
import BackButton from "@/components/shared/back-button"
import { Button } from "@/components/ui/button"
import { authOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"

const getQrCodeData = async ({ token, id }: any) => {
    try {
        return await getQrCode({
            short_code: id,
            token: token,
        })
    } catch (e) {
        return null
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/login",
        },
    })

    const data = await getQrCodeData({
        token: session?.accessToken,
        id: params.id,
    })

    if (data === null) {
        return (
            <div className="flex items-center justify-center flex-col gap-4">
                <h1 className="text-2xl md:text-4xl font-bold text-center my-8 text-slate-700">QR Code not found</h1>
                <Button className="w-fit mx-auto">
                    <a href={"/dashboard/qr-codes"}>Back to list</a>
                </Button>
            </div>
        )
    }

    return (
        <div className="container p-0 sm:p-4 grid gap-6 py-5">
            <BackButton href={"/dashboard/qr-codes"} text={"Back to list"} />
            <ShowQrCodeCard data={data} token={session?.accessToken} />
        </div>
    )
}

