import { authOptions } from "@/lib/auth-options";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
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
        <div className="sticky h-fit w-full top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
            <nav className="h-14 flex items-center justify-between px-4">

                <div className="flex justify-end w-full gap-2">
                    <UserNav session={session} />
                </div>
                <div className={cn("block lg:!hidden")}>
                    <MobileSidebar session={session} />
                </div>
            </nav>
        </div>
    );
}