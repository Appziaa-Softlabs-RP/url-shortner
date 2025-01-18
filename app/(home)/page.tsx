import { Features } from "@/components/home/features";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { Navbar } from "@/components/home/navbar";
import { Stats } from "@/components/home/stats";
import { Testimonials } from "@/components/home/testimonials";
import { UseCases } from "@/components/home/use-cases";
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
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <UseCases />
      <Footer />
    </main>
  )
}

