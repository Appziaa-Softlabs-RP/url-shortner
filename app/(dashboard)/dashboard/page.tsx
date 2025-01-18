import { ScrollArea } from "@/components/ui/scroll-area";
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
        <ScrollArea className="h-full">
            {/* Dashbaord Data */}
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Hi, {session?.user?.name}👋
                    </h2>
                    <div className="hidden md:flex items-center space-x-2">
                        <p className="text-slate-600̦ p-2 rounded-xl border-[1px] border-slate-300">
                            {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </ScrollArea >
    );
}