import { SettingsMobileHeader } from "@/components/dashboard/settings/mobile-header"
import { SettingsSidebar } from "@/components/dashboard/settings/sidebar";
import { SettingSidebarItems } from "@/types";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const sidebarItems: SettingSidebarItems[] = [
        {
            heading: "Your settings",
            items: [
                { title: "Profile", href: "/dashboard/settings/profile", icon: "user" }
            ]
        },
        {
            heading: "Developer settings",
            items: [
                { title: "API", href: "/dashboard/settings/api", icon: "cpu" }
            ]
        }
    ];

    return (
        <div className="flex min-h-screen flex-col">
            <SettingsMobileHeader sidebarItems={sidebarItems} />
            <div className="flex flex-1 h-full">
                <SettingsSidebar sidebarItems={sidebarItems} />
                <div className="flex-1 p-6 lg:p-8 pt-[115px]">{children}</div>
            </div>~
        </div>
    )
}

