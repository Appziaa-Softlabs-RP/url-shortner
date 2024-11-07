import { NavItem } from "@/types";

export type legalPolicies = {
  id: number;
  title: string;
  file: string
  description: string
  created_at: string;
  updated_at: string;
}

export type blogCategory = {
  id: number;
  name: string;
  slug: string
  created_at: string;
  updated_at: string;
}

export type blog = {
  id: number;
  name: string;
  slug: string
  description: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  }
];

export const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Blogs",
    icon: "dashboard",
    label: "Dashboard",
    subItems: [
      {
        name: "Categories",
        title: "Categories",
        href: "/admin/dashboard/blog-categories",
        icon: "user",
      },
      {
        name: "Blog",
        title: "Blog",
        href: "/admin/dashboard/blogs",
        icon: "user",
      }
    ],
  },
  {
    title: "Legal Policies",
    href: "/admin/dashboard/legal-policies",
    icon: "dashboard",
    label: "Legal Policies",
  },
];
