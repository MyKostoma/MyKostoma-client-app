"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Menu, Settings } from "lucide-react";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";

export interface ProfessionalShopTopBarProps {
  title: string;
  subtitleBadge?: string;
  statusBadge?: string;
  onBack?: () => void;
  notificationCount?: number;
  onMenuClick?: () => void;
  className?: string;
}

export function ProfessionalShopTopBar({
  title,
  subtitleBadge,
  statusBadge,
  onBack,
  notificationCount = 3,
  onMenuClick,
  className,
}: ProfessionalShopTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;
  const user = useAppSelector(selectCurrentUser);

  const displayName =
    user?.fullName ||
    (user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "") ||
    "Alex Morgan";

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
            <Menu className="h-5 w-5" />
          </button>
        )}

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="size-9 rounded-xl border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary/60 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="size-4" />
          </button>
        )}

        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-foreground truncate">
              {title}
            </h1>
            {statusBadge && (
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-secondary text-[9px] font-bold uppercase tracking-wider text-foreground shrink-0">
                {statusBadge}
              </span>
            )}
          </div>

          {subtitleBadge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-secondary/70 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              {subtitleBadge}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 ml-auto">
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative size-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors"
        >
          <Bell className="size-4" />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 size-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Link>

        <Link
          href="/settings"
          aria-label="Settings"
          className="hidden sm:flex size-9 rounded-full items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors"
        >
          <Settings className="size-4" />
        </Link>

        <span
          aria-hidden="true"
          className="hidden md:block h-6 w-px bg-border"
        />

        <Link
          href="/profile"
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity shrink-0"
        >
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold text-foreground leading-tight">
              {displayName}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              PREMIUM PROFESSIONAL
            </p>
          </div>
          <FallbackImage
            src={user?.avatarUrl}
            alt={displayName}
            variant="avatar"
            className="size-9 text-xs"
          />
        </Link>
      </div>
    </div>
  );
}
