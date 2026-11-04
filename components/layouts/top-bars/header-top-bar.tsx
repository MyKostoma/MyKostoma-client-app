"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/layouts/headers/app-header";
import type { TopBarProps } from "./types";

export function HeaderTopBar({
  onMenuClick,
  className,
  title,
  subtitle,
  actions,
  children,
  ...props
}: TopBarProps) {
  return (
    <div
      className={cn(
        "w-full bg-card border-b border-border sticky top-0 z-20 shrink-0",
        className
      )}
    >
      <div className="flex items-center">
        {onMenuClick && (
          <div className="lg:hidden pl-4 pr-1 py-3 flex items-center">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open mobile menu"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <AppHeader
            className="border-0 shadow-none rounded-none px-4 md:px-6 py-3"
            {...props}
          />
        </div>
      </div>
    </div>
  );
}

