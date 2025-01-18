import { authOptions } from "@/lib/auth-options";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up/Sign In with RewardsPlus URL Shortener",
  description: "Login to your account with RewardsPlus URL Shortener",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession({
    ...authOptions,
    pages: {
      signIn: "/signin",
    },
  });

  if (session) {
    if (session?.user?.role === "admin") {
      redirect("/admin/dashboard");
    }
    redirect("/dashboard");
  }


  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-500">
        <div className={cn(
          "flex items-center justify-center px-4",
          "min-h-[calc(100vh)] h-full w-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10"
        )}>
          <div className="w-full max-w-[1200px] mx-auto items-center">
            <div className="w-full max-w-md mx-auto">
              <div className="bg-white my-6 rounded-3xl p-8 shadow-xl grid gap-4">
                <Link className="flex items-center" href="https://rewardsplus.in">
                  <Image src="https://rewardsplus.in/public/frontend/assets/images/rp_w.png"
                    alt="RP"
                    height={40}
                    width={120}
                    unoptimized
                  />
                </Link>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}