import { getPreviousNext } from "@/lib/markdown";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Pagination({ pathname, type }: { pathname: string, type: "docs" | "api" }) {
  const res = getPreviousNext(pathname, type);

  return (
    <div className="grid grid-cols-2 flex-grow sm:py-10 py-7 gap-3">
      <div>
        {res.prev && (
          <Link
            className={buttonVariants({
              variant: "outline",
              className:
                "no-underline w-full -translate-y-[6px] flex flex-col truncate pl-3 !py-8 !items-start",
            })}
            href={`/v1/${type}${res.prev.href}`}
          >
            <span className="flex translate-y-3 items-center text-muted-foreground text-xs">
              <ChevronLeftIcon className="w-[1rem] h-[1rem] mr-1" />
              Previous
            </span>
            <span className=" ml-1 max-w-full">
              <p className="truncate">{res.prev.title}
              </p>
            </span>
          </Link>
        )}
      </div>
      <div>
        {res.next && (
          <Link
            className={buttonVariants({
              variant: "outline",
              className:
                "no-underline w-full flex flex-col pr-3 !py-8 !items-end",
            })}
            href={`/v1/${type}${res.next.href}`}
          >
            <span className="flex items-center text-muted-foreground text-xs">
              Next
              <ChevronRightIcon className="w-[1rem] h-[1rem] ml-1" />
            </span>
            <span className="mt-1 mr-1">{res.next.title}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
