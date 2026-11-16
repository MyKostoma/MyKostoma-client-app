"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { DashboardFooterProps, FooterLinkItem } from "./types";

export const DEFAULT_DASHBOARD_FOOTER_LINKS: FooterLinkItem[] = [
  { label: "DOCUMENTATION", href: "/navigation-system" },
  { label: "SUPPORT", href: "/messages" },
  { label: "PRIVACY POLICY", href: "/" },
];

export function DashboardFooter({
  links = DEFAULT_DASHBOARD_FOOTER_LINKS,
  copyrightText = "MYKOSTOMA DIGITAL © 2026",
  className,
  ...props
}: DashboardFooterProps) {
  return (
    <footer
      className={cn(
        "w-full border-t border-border/70 py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-card/95 backdrop-blur-xs select-none shrink-0",
        className
      )}
      {...props}
    >
      <span>{copyrightText}</span>
      <div className="flex items-center gap-5">
        {links.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={item.onClick}
            className="hover:text-foreground transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}

