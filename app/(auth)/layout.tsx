import Header from "@/components/layout/auth/header";
import { authOptions } from "@/lib/auth-options";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up/Sign In with DigitalJanety4",
  description: "Login to your account with DigitalJanety4",
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
      <Header />
      <div className="min-h-[calc(100vh-80px)] flex-col justify-center">
        <div className="relative md:grid lg:max-w-none lg:grid-cols-[1fr_500px] gap-16 lg:px-0 w-[1200px] max-w-[100vw] mx-auto">
          <div className="relative bg-white hidden h-full flex-col text-black lg:grid grid-cols">
            <div className="bg-no-repeat bg-center bg-cover flex items-end mt-12 flex-col p-4 gap-3 h-full">
              <Image src="/img/auth.svg"
                alt="alt"
                width={600}
                height={600}
              />
            </div>
          </div>
          <div className="py-16 w-fit mx-auto ">
            <div className="relative p-6 py-6 h-fit rounded-xl shadow-xl flex w-full flex-col space-y-6 sm:w-[400px] max-w-full overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}