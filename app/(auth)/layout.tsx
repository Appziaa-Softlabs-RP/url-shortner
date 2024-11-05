import Header from "@/components/layout/auth/header";
import Footer from "@/components/layout/footer";
import { authOptions } from "@/lib/auth-options";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up/Sign In with Scanmate",
  description: "Login to your account with Scanmate",
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
    redirect("/");
  }


  return (
    <>
      <div className="min-h-[calc(100vh-80px)] flex-col justify-center p-0">
        <div className="relative md:grid  lg:grid-cols-[1fr_500px] w-full gap-16 lg:px-0 max-w-[1600px] mx-auto">
          <div className="relative bg-white hidden h-full flex-col text-black lg:grid grid-cols">
            <div className="bg-no-repeat bg-center bg-cover flex-col gap-3 h-full ">
              <Image src="/img/auth.svg"
                alt="alt"
                width={1500}
                className="max-w-[800px] w-full"
                height={1500}
              />
            </div>
          </div>
          <div className="py-16 w-fit mx-auto ">
            <div className="relative p-4 h-fit flex w-full flex-col space-y-6 sm:w-[400px] max-w-full overflow-y-auto border-[1px] rounded-xl shadow-sm lg:shadow-none lg:border-none">
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
