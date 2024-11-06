import CookieConsent from "@/components/consents/cookie-consent";
import Footer from "@/components/layout/footer";
import GoToTop from "@/components/layout/go-to-top";
import Header from "@/components/layout/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DigitalJanet: AI-Powered Candidate Sourcing Platform for Efficient Hiring",
  description: "DigitalJanet is an AI-driven recruitment platform that streamlines candidate sourcing with intelligent matching, automated searches, and real-time insights, helping businesses hire the best talent faster. Simplify your hiring process with cutting-edge LLM technology.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className='bg-white text-slate-800 min-h-screen max-w-screen'>
      <Header />
      <div className="flex flex-col min-h-screen bg-white">
        {children}
      </div>
      <GoToTop />
      <CookieConsent />
      <Footer />
    </div>
  );
}
