import { ClarityInit } from "@/components/layout/clarity-init";
import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import { GoogleTagManager } from '@next/third-parties/google';
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free URL Shortener Service for Quick, Easy Links - rwps.in",
  description: "Use rwps.in for a fast, free Enterprise grade URL shortener to create short, shareable links instantly. Track link performance and enhance your online presence with ease.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Providers session={session}>
          <Toaster />
          {children}
          {/* <GoogleAnalytics gaId={'G-B22RNVPSW5'} /> */}
          <GoogleTagManager gtmId={'GTM-P3R5C589'} />
          <ClarityInit />
        </Providers>
      </body>
    </html>
  );
}
