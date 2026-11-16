"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TopBarProps } from "../types";

export function MinimalTopBar({
  title,
  subtitle,
  onMenuClick,
  actions,
  className,
  children,
}: TopBarProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "h-14 px-4 md:px-6 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-xs select-none sticky top-0 z-20 shrink-0",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 -ml-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {title && (
          <div className="flex flex-col min-w-0">
            <h1 className="text-sm sm:text-base font-semibold text-foreground truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] text-muted-foreground truncate">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {actions}
        {children}
      </div>
    </header>
  );
}

