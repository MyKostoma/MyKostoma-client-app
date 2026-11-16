"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SidebarTooltip } from "./sidebar-tooltip";

export interface SidebarBrandLogoProps {
  isOpen?: boolean;
  logoHref?: string;
  className?: string;
}

export function SidebarBrandLogo({
  isOpen = true,
  logoHref = "/",
  className,
}: SidebarBrandLogoProps) {
  if (!isOpen) {
    return (
      <div className={cn("pt-1 pb-3 flex items-center justify-center", className)}>
        <SidebarTooltip content="MyKostoma" enabled={true}>
          <Link
            href={logoHref}
            className="inline-flex items-center justify-center focus:outline-hidden hover:opacity-90 transition-opacity"
            aria-label="MyKostoma Dashboard"
          >
            <img
              src="/mykostoma_logo.png"
              alt="MyKostoma"
              className="h-7 w-7 object-contain dark:hidden select-none"
            />
            <img
              src="/mykostoma_logo_white.png"
              alt="MyKostoma"
              className="h-7 w-7 object-contain hidden dark:block select-none"
            />
          </Link>
        </SidebarTooltip>
      </div>
    );
  }

  return (
    <div className={cn("px-4 pt-1 pb-3 flex items-center", className)}>
      <Link
        href={logoHref}
        className="inline-flex items-center focus:outline-hidden hover:opacity-90 transition-opacity"
        aria-label="MyKostoma Dashboard"
      >
        <img
          src="/mykostoma_full_logo.png"
          alt="MyKostoma"
          className="h-7 w-auto object-contain dark:hidden select-none"
        />
        <img
          src="/mykostoma_full_logo_white.png"
          alt="MyKostoma"
          className="h-7 w-auto object-contain hidden dark:block select-none"
        />
      </Link>
    </div>
  );
}

export default SidebarBrandLogo;
