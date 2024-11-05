import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from '@next/third-parties/google';
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles.css";
import { ClarityInit } from "@/components/layout/clarity-init";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clock In & Out: Track Your Time Easily - people by RewardsPlus",
  description: "Stay on top of your work schedule with people by RewardsPlus! Clock in and out with ease, track your hours accurately, and simplify time management for your small business in India.",
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
          <GoogleAnalytics gaId={'G-B22RNVPSW5'} />
          <ClarityInit />
        </Providers>
      </body>
    </html>
  );
}
