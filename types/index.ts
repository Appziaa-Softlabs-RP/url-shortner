import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  subItems?: {
    name: string
    title?: string
    href: string
    icon?: keyof typeof Icons
  }[];
}

export interface SettingSidebarItem {
  icon: keyof typeof Icons;
  href: string;
  title: string;
}

export interface SettingSidebarItems {
  heading: string;
  items: SettingSidebarItem[];
}
export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
