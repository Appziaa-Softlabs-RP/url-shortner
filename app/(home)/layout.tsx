import CookieConsent from "@/components/consents/cookie-consent";
import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import GoToTop from "@/components/layout/go-to-top";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://app.rwps.in'),
  applicationName: process.env.NEXT_PUBLIC_APP_NAME || "RWPS URL Shortener",
  title: "Free URL Shortener-Simplify Link Management with RWPS ",
  description: "RWPS offers free, enterprise-grade URL shortening with detailed analytics, seamless API integration, and reliable performance.",
  openGraph: {
    type: 'website',
    siteName: "Free URL Shortener-Simplify Link Management with RWPS ",
    locale: 'en_US',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Free URL Shortener-Simplify Link Management with RWPS ",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free URL Shortener-Simplify Link Management with RWPS ",
    description: 'RWPS offers free, enterprise-grade URL shortening with detailed analytics, seamless API integration, and reliable performance.',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.png`],
  }
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className='bg-white text-slate-800 min-h-screen max-w-screen'>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        {children}
        <Footer />
      </div>
      <GoToTop />
      <CookieConsent />
    </div>
  );
}
