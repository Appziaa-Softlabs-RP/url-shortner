import BlogsServer from "@/components/home/blogs-server";
import FAQ from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Testimonials } from "@/components/home/testimonials";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession({
    ...authOptions,
    pages: {
      signIn: "/login",
    },
  });

  if(session){
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <BlogsServer />
      <FAQ />
    </main>
  )
}

