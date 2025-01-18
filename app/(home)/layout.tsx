import CookieConsent from "@/components/consents/cookie-consent";
import GoToTop from "@/components/layout/go-to-top";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empowering Organizations Through Talent and Technology",
  description: "With our extensive capabilities, strategic ecosystem partnerships, and unparalleled industry expertise, we empower your business to reach its next level. Whether it's sourcing top talent or driving digital transformation, we're here to support your success.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className='bg-white text-slate-800 min-h-screen max-w-screen'>
      <div className="flex flex-col min-h-screen bg-white">
        {children}
      </div>
      <GoToTop />
      <CookieConsent />
    </div>
  );
}
