import Image from "next/image";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

async function fetchedLogo({ token }: {
    token: string
}) {
    const res = fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/getCompanyLogoAuth`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        cache: 'no-cache'
    }).then(res => res.json());
    const json = await res;
    return json?.data;
}

export default async function MobileHeader() {

    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/auth/signin",
        },
    });
    const fetchedData = await fetchedLogo({
        token: session?.accessToken
    });

    return <header className="sm:hidden">
        <div className="flex items-center justify-between p-4">
            <div>
                <Link href="/">
                    {
                        fetchedData?.logo ?
                            <Image
                                src={fetchedData?.logo}
                                alt="Logo"
                                style={{
                                    maxHeight: '70px',
                                    maxWidth: '100px'
                                }}
                                width={200}
                                height={200}
                                unoptimized={true}
                            />
                            :
                            <div>
                                <Image
                                    src="/img/light-logo.png"
                                    className="w-auto h-full"
                                    alt="Flowbite Logo"
                                    style={{
                                        maxHeight: "3rem",
                                    }}
                                    width={200}
                                    height={200}
                                />
                            </div>
                    }
                </Link>
            </div>
            <div>
                <UserNav session={session} />
            </div>
        </div>
    </header>
}