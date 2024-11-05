import { authOptions } from "@/lib/auth-options";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";

export default async function AuthHeader({
    navItems
}: any) {

    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/auth/signin",
        },
    });

    return (
        <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
            <nav className="h-14 flex items-center justify-between px-4">
                <div className="hidden lg:block">
                    <Link href="/">
                        <Image src="/img/logo.svg" alt="RP" width={200} height={200} />
                    </Link>
                </div>
                <div className={cn("block lg:!hidden")}>
                    <MobileSidebar session={session} />
                </div>

                <div className="flex items-center gap-2">
                    <UserNav session={session} />
                </div>
            </nav>
        </div>
    );
}