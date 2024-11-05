import { cn } from "@/lib/utils";
import { DashboardNav } from "../dashboard-nav";

export default async function Sidebar({ navItems }: any) {

  return (
    <nav
      className={cn(`sticky top-0 hidden h-screen border-r pt-16 lg:block`)}
    >
      <div className="relative space-y-4 py-2 max-w-[300px]">
        <div className="">
          <DashboardNav isDesktopSidebar={true} items={navItems} />
        </div>
      </div>
    </nav>

  );
}