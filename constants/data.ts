import { NavItem } from "@/types";

export type NavProps = {
  heading: string,
  items: NavItem[]
}

export type socials = {
  id: number,
  icon: string,
  name: string,
  status: string
}

export const navItems: NavProps[] = [
  {
    heading: "Operations",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: "dashboard",
        label: "Dashboard",
      },
      {
        title: "Leads",
        href: "/dashboard/leads",
        icon: "users",
        label: "Leads",
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: "barchart2",
      }
    ]
  },
  {
    heading: "Workspace",
    items: [
      {
        title: "My Projects",
        href: "/dashboard/projects",
        icon: "kanban",
      },
      {
        title: "My Uploads",
        href: "/dashboard/uploads",
        icon: "media",
      }
    ]
  }
];

export const adminNavItems: NavProps[] = [
  {
    heading: "",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: "dashboard",
        label: "Dashboard",
      },
    ]
  },
  {
    heading: "Settings",
    items: [
      {
        title: "Socials",
        href: "/admin/dashboard/socials",
        icon: "globe",
        label: "Socials",
      },
      {
        title: "Templates",
        href: "/dashboard/templates",
        icon: "page",
        label: "Templates",
      }
    ]
  },
];