"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { NavProps } from "@/constants/data";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";

interface DashboardNavProps {
  items: NavProps[];
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
    items.forEach((navItem, index) => {
      navItem?.items.forEach((item, index) => {
        if (item.subItems) {
          item.subItems.forEach((subItem) => {
            if (subItem?.href && path === subItem.href) {
              setSubItemActiveId(index.toString());
            }
          });
        }
      });
    });
  }, [path, items]);

  if (!items?.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ width: "auto" }}
      animate={{ width: (isOpen && isDesktopSidebar) ? 288 : "auto" }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      className={cn(
        "relative max-w-full h-full flex flex-col justify-between pb-4",
        isOpen && "lg:bg-primary/10"
      )}
    // animte bg color
    >
      <motion.nav
        className="grid items-start gap-2 h-fit overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <AnimatePresence>
          <div className="lg:bg-primary w-full h-full min-h-[57px] flex items-center justify-center">
            <Image
              src={
                isOpen ?
                  "/img/logo-white.svg" :
                  "/img/logo-sm.svg"
              }
              alt="Logo"
              width={
                isOpen ? 150 : 30
              }
              height={55}
              className="hidden lg:flex object-contain max-h-[55px]"
            />
            <Image
              src={"/img/logo.svg"}
              alt="Logo"
              width={
                isOpen ? 150 : 30
              }
              height={55}
              className="lg:hidden object-contain max-h-[55px]"
            />
          </div>
          {items.map((navGroup, index) => (
            <div key={index}>
              {
                isOpen && (
                  <h5 className="text-xs font-semibold text-slate-500 m-2">{navGroup?.heading}</h5>
                )}
              {navGroup?.items?.map((item, itemIndex) => {
                const Icon = Icons[item.icon || "arrowRight"];
                return (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: itemIndex * 0.05 }}
                    className="flex flex-col gap-2"
                  >
                    <Link
                      href={item.href ?? "#"}
                      onClick={() => {
                        if (item.subItems) {
                          setSubItemActiveId(subItemActiveId === itemIndex.toString() ? null : itemIndex.toString());
                        } else {
                          if (setOpen) setOpen(false);
                          setSubItemActiveId(null);
                        }
                      }}
                    >
                      <motion.p
                        className={cn(
                          `group flex items-center rounded-md ${!isOpen && 'lg:w-fit'} justify-between m-1 mx-2 p-2 text-sm font-medium hover:bg-primary/30 hover:text-accent-foreground`,
                          (item?.href !== undefined && path.includes(item?.href ?? '')) ? "bg-primary/20 text-primary font-bold" : "transparent",
                          item.disabled && "cursor-not-allowed opacity-80",
                          !isOpen && "min-w-[110px] max-w-[110px] flex items-center justify-center"
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className={cn(
                          "flex items-center gap-2 p-0 h-[20px]",
                          !isOpen && "grid relative grid-cols-1 grid-rows-[20px_1fr] text-center items-center justify-center h-fit w-full"
                        )}>
                          <Icon className="h-4 w-4 mx-auto" />
                          <AnimatePresence>
                            <motion.span
                              className="whitespace-nowrap truncate"
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                            >
                              {item.title}
                            </motion.span>
                          </AnimatePresence>
                        </span>
                        {subItemActiveId === itemIndex.toString() ? (
                          <ChevronUp size={18} />
                        ) : (
                          item.subItems && !item?.href && <ChevronDown size={18} />
                        )}
                      </motion.p>
                    </Link>
                    <AnimatePresence>
                      {item.subItems && subItemActiveId === itemIndex.toString() && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid items-start gap-2 p-0 relative"
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
                                className="max-w-full mx-1"
                              >
                                <Link
                                  href={subItem.href ? "/dashboard" + subItem.href : "#"}
                                  onClick={() => {
                                    if (setOpen) setOpen(false);
                                  }}
                                >
                                  <motion.span
                                    className={cn(
                                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/30 hover:text-accent-foreground gap-2 ms-5",
                                      path === subItem.href ? "bg-accent text-black" : "transparent",
                                      isOpen && "w-full",
                                      !isOpen && "flex flex-col text-center w-full me-2 text-[10px] max-w-[100px]",
                                    )}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <SubIcon className="h-4 w-4" />
                                    <span>{subItem.title}</span>
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
            </div>
          ))}
        </AnimatePresence>
        {/* <motion.div
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
        </motion.div> */}
      </motion.nav>
      {
        isDesktopSidebar &&
        <motion.div
          className="hidden lg:flex w-full z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: !isOpen ? 30 : 200,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <Button
            size={'icon'}
            variant={'outline'}
            onClick={() => setIsOpen(!isOpen)}
            className="m-4"
          >
            {
              isOpen ?
                <X size={20} />
                : <Menu size={20} />
            }
          </Button>
        </motion.div>
      }
    </motion.div>
  );
}