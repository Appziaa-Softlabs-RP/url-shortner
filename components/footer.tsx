import { CommandIcon, HeartIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
        <div className="flex items-center gap-3">
          <CommandIcon className="sm:block hidden w-5 h-5 text-muted-foreground" />
          <p className="text-center flex items-center gap-1">
            Made with{" "}
            <HeartIcon fill="#dc2626" className="w-4 h-4 text-red-600" />
            by <Link
              className="px-1 underline underline-offset-2"
              href="https://rewardsplus.in"
            >
              Rewards Plus
            </Link>
            .
          </p>
        </div>
          <Link
            className="px-1 underline underline-offset-2"
            href="https://rwps.in"
          >
            RWPS
          </Link>
      </div>
    </footer>
  );
}