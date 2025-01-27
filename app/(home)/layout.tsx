import CookieConsent from "@/components/consents/cookie-consent";
import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";
import GoToTop from "@/components/layout/go-to-top";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://app.rwps.in'),
  applicationName: process.env.NEXT_PUBLIC_APP_NAME || "RWPS URL Shortener",
  title: "Free Enterprise-Grade URL Shortener",
  description: "Experience RWPS, the enterprise-grade URL shortening platform designed for reliability, scalability, and customization. Enjoy powerful analytics, seamless integration, and limitless innovation—all for free.",
  openGraph: {
    type: 'website',
    siteName: "Free Enterprise-Grade URL Shortener",
    locale: 'en_US',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Free Enterprise-Grade URL Shortener",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Enterprise-Grade URL Shortener",
    description: 'Experience RWPS, the enterprise-grade URL shortening platform designed for reliability, scalability, and customization. Enjoy powerful analytics, seamless integration, and limitless innovation—all for free.',
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
