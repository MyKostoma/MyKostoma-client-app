"use client";

import Link from "next/link";
import { ArrowLeft, Bell, ChevronDown, Menu, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { selectUnreadNotificationsCount } from "@/store/slices/uiSlice";
import { useDashboardMobileMenu } from "@/providers/dashboard-top-bar-context";
import type { WalletTopBarProps } from "../types";

export function WalletTopBar({
  title,
  subtitle,
  breadcrumbParentLabel,
  breadcrumbCurrentLabel,
  onBreadcrumbParentClick,
  onBack,
  onMenuClick,
  className,
}: WalletTopBarProps) {
  const contextMenuClick = useDashboardMobileMenu();
  const effectiveMenuClick = onMenuClick ?? contextMenuClick;
  const user = useAppSelector(selectCurrentUser);
  const unreadNotifs = useAppSelector(selectUnreadNotificationsCount);

  const displayName =
    user?.fullName ||
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
    "Alex Morgan";

  const roleBadge =
    user?.role === "professional" ? "VERIFIED PRO" : "PREMIUM CONSUMER";

  const avatarUrl =
    user?.avatarUrl ||
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80";

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

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="size-9 rounded-full border border-border bg-secondary/40 hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="size-4" />
          </button>
        )}

        <div className="min-w-0">
          {breadcrumbParentLabel && breadcrumbCurrentLabel && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground mb-0.5">
              {onBreadcrumbParentClick ? (
                <button
                  type="button"
                  onClick={onBreadcrumbParentClick}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  {breadcrumbParentLabel}
                </button>
              ) : (
                <span>{breadcrumbParentLabel}</span>
              )}
              <span>/</span>
              <span className="font-semibold text-foreground">
                {breadcrumbCurrentLabel}
              </span>
            </div>
          )}

          <h1 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight truncate leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
        <Link
          href="/messages"
          aria-label="Messages"
          className="relative size-9 rounded-xl border border-border bg-card hover:bg-secondary/60 text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
        >
          <MessageSquare className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
        </Link>

        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative size-9 rounded-xl border border-border bg-card hover:bg-secondary/60 text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
        >
          <Bell className="size-4" />
          <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
            {unreadNotifs > 0 ? unreadNotifs : 3}
          </span>
        </Link>

        <div className="hidden sm:block h-6 w-px bg-border mx-0.5" />

        <Link
          href="/profile"
          className="flex items-center gap-2.5 pl-1 group cursor-pointer"
        >
          <div className="hidden sm:flex flex-col items-end leading-tight">
            <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
              {displayName}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              {roleBadge}
            </span>
          </div>

          <img
            src={avatarUrl}
            alt={displayName}
            className="size-8 rounded-full object-cover border border-border group-hover:border-primary/50 transition-colors"
          />

          <ChevronDown className="hidden sm:block size-3.5 text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
