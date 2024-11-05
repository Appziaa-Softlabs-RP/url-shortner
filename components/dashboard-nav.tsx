"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { signOut } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";

interface DashboardNavProps {
  items: NavItem[];
  isDesktopSidebar?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, isDesktopSidebar = false, setOpen }: DashboardNavProps) {
  const path = usePathname();
  const [subItemActiveId, setSubItemActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    await signOut();
  }

  useEffect(() => {
    items.forEach((item, index) => {
      if (item.subItems) {
        item.subItems.forEach((subItem) => {
          if (subItem?.href && path === subItem.href) {
            setSubItemActiveId(index.toString());
          }
        });
      }
    });
  }, [path, items]);

  if (!items?.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ width: "auto" }}
      animate={{ width: (isOpen && isDesktopSidebar) ? 288 : "auto" }}
      transition={{ duration: 0.3 }}
      className="relative max-w-full"
    >
      {
        isDesktopSidebar &&
        <motion.div
          className="hidden lg:block absolute -top-2 right-0 z-10"
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          <Button
            size={'icon'}
            variant={'outline'}
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronRight size={20} />
          </Button>
        </motion.div>
      }
      <motion.nav
        className="grid items-start gap-2 p-4 pt-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <AnimatePresence>
          {items.map((item, index) => {
            const Icon = Icons[item.icon || "arrowRight"];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col gap-2"
              >
                <Link
                  href={item.href ?? "#"}
                  onClick={() => {
                    if (item.subItems) {
                      setSubItemActiveId(subItemActiveId === index.toString() ? null : index.toString());
                    } else {
                      if (setOpen) setOpen(false);
                      setSubItemActiveId(null);
                    }
                  }}
                >
                  <motion.p
                    className={cn(
                      `group flex items-center rounded-md px-3 ${!isOpen && 'lg:w-fit'} justify-between py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground`,
                      (item?.href !== undefined && (path).includes(item?.href ?? '')) ? "bg-accent text-black" : "transparent",
                      item.disabled && "cursor-not-allowed opacity-80",
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-2 p-0 h-[20px]">
                      <Icon className="h-4 w-4" />
                      <AnimatePresence>
                        {isOpen && (
                          <motion.span
                            className="whitespace-nowrap"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    {subItemActiveId === index.toString() ? (
                      <ChevronUp size={18} />
                    ) : (
                      item.subItems && !item?.href && <ChevronDown size={18} />
                    )}
                  </motion.p>
                </Link>
                <AnimatePresence>
                  {item.subItems && subItemActiveId === index.toString() && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid items-start gap-2 p-0"
                    >
                      {item.subItems.map((subItem, subIndex) => {
                        const SubIcon = Icons[subItem.icon || "arrowRight"];
                        return (
                          <motion.div
                            key={subIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <Link
                              href={subItem.href ? subItem.href : "#"}
                              onClick={() => {
                                if (setOpen) setOpen(false);
                              }}
                            >
                              <motion.span
                                className={cn(
                                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-200 hover:text-accent-foreground bg-slate-100  gap-2 ms-5",
                                  path === subItem.href ? "bg-accent text-black" : "transparent",
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <SubIcon className="h-4 w-4" />
                                {
                                  isOpen &&
                                  <span>{subItem.title}</span>
                                }
                              </motion.span>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={() => handleLogout()}
            className="flex flex-row items-center gap-2 justify-center w-full"
          >
            <Icons.logout className="h-4 w-4" />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
}