import { cn } from "@/lib/utils";
import { DashboardNav } from "../dashboard-nav";

export default async function Sidebar({ navItems }: any) {

  return (
    <nav
      className={cn(`sticky top-0 hidden h-screen border-r lg:block`)}
    >
      <div className="relative space-y-4 h-full max-w-[300px]">
          <DashboardNav isDesktopSidebar={true} items={navItems} />
      </div>
    </nav>

  );
}