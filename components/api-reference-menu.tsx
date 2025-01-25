"use client";

import { API } from "@/lib/routes-config";
import SubLink from "./sublink";
import { usePathname } from "next/navigation";

export default function ApiReferenceMenu({ isSheet = false }) {
  const pathname = usePathname();
  if (!pathname.startsWith("/v1/api")) return null;

  return (
    <div className="flex flex-col gap-3.5 mt-5 pr-2 pb-6">
      {API.map((item, index) => {
        const modifiedItems = {
          ...item,
          href: `/v1/api${item.href}`,
          level: 0,
          isSheet,
        };
        return <SubLink key={item.title + index} {...modifiedItems} />;
      })}
    </div>
  );
}
