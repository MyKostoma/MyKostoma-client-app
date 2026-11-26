"use client";

import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser, selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import { cn } from "@/lib/utils";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";
import type { SettingsTopBarProps } from "../types";

export type { SettingsTopBarProps } from "../types";

export function SettingsTopBar({
  title = "Settings",
  onMenuClick,
  className,
}: SettingsTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;

  const currentUser = useAppSelector(selectCurrentUser);
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  const displayName =
    currentUser?.fullName ||
    (currentUser?.firstName
      ? `${currentUser.firstName} ${currentUser.lastName || ""}`.trim()
      : "") ||
    (effectiveRole === "professional" ? "Alex Rivera" : "Sarah Jenkins");

  return (
    <div
      className={cn(
        "h-16 px-4 md:px-6 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-xs select-none sticky top-0 z-20 shrink-0 gap-3",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {effectiveMenuClick && (
          <button
            type="button"
            onClick={effectiveMenuClick}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 -ml-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer shrink-0"
          >
            <Menu className="size-5" />
          </button>
        )}

        <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-foreground truncate">
          {title}
        </h1>
      </div>

      <div className="hidden sm:flex items-center shrink-0 ml-auto">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2.5 pl-3 pr-2 py-1 rounded-full border border-border bg-secondary/40 hover:bg-secondary/80 transition-colors"
        >
          <span className="text-xs font-semibold text-foreground truncate max-w-36">
            {displayName}
          </span>
          <FallbackImage
            src={currentUser?.avatarUrl}
            alt={displayName}
            fallbackType="user"
            variant="avatar"
            className="size-7 rounded-full object-cover border border-border bg-card shrink-0"
          />
          <ChevronRight className="size-3.5 text-muted-foreground shrink-0" />
        </Link>
      </div>
    </div>
  );
}

export default SettingsTopBar;
