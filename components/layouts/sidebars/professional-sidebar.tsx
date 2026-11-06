"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  TrendingUp,
  Search,
  FileText,
  Store,
  Wallet,
  Cog,
  Clapperboard,
  MessageSquare,
  Star,
  IdCard,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  BadgeCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  logout,
  selectCurrentUser,
} from "@/store/slices/authSlice";
import { clearAuthCookies } from "@/lib/cookies";
import { baseApi } from "@/store/api/baseApi";
import type { SidebarNavItem, SidebarProps } from "./types";

export const DEFAULT_PROFESSIONAL_NAV_ITEMS: SidebarNavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: TrendingUp },
  { id: "requests", label: "Requests", href: "/requests", icon: Search },
  { id: "quotations", label: "Quotations", href: "/quotations", icon: FileText },
  { id: "my-shop", label: "My Shop", href: "/shop", icon: Store },
  { id: "orders", label: "Orders", href: "/orders", icon: Wallet },
  { id: "wallet", label: "Wallet", href: "/wallet", icon: Cog },
  { id: "reels", label: "Reels", href: "/reels", icon: Clapperboard },
  { id: "messages", label: "Messages", href: "/messages", icon: MessageSquare },
  { id: "reviews", label: "Reviews", href: "/reviews", icon: Star },
  { id: "verification", label: "Verification", href: "/verification", icon: IdCard },
];

export function ProfessionalSidebar({
  isOpen = true,
  onToggle,
  activeItemId,
  onItemSelect,
  items = DEFAULT_PROFESSIONAL_NAV_ITEMS,
  header,
  footer,
  user: userProp,
  onLogout,
  collapsible = true,
  logoHref = "/dashboard",
  className,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeUser = useAppSelector(selectCurrentUser);
  const user = userProp !== undefined ? userProp : storeUser;

  const displayName =
    user?.fullName ||
    (user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "") ||
    "Marcus Webb";
  const categoryLabel = user?.category
    ? `Pro ${String(user.category).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`
    : "Pro Tailor";
  const avatarUrl = user?.avatarUrl;

  const handleSignOut = async () => {
    try {
      if (onLogout) {
        await onLogout();
      } else {
        router.push("/login");
      }
    } finally {
      dispatch(logout());
      clearAuthCookies();
      dispatch(baseApi.util.resetApiState());
    }
  };

  const isItemActive = (href?: string, id?: string) => {
    if (activeItemId !== undefined && id) {
      return activeItemId === id;
    }
    if (!href) return false;
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/dashboard/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleNavClick = (item: SidebarNavItem) => {
    if (item.disabled) return;
    if (item.onClick) {
      item.onClick(item);
    }
    onItemSelect?.(item.id, item);
    if (item.href && !item.onClick) {
      router.push(item.href);
    }
  };

  return (
    <aside
      aria-label="Professional navigation sidebar"
      className={cn(
        "relative hidden lg:flex flex-col h-screen shrink-0 bg-card border-r border-border transition-[width] duration-300 ease-in-out select-none z-30 justify-between",
        isOpen ? "w-64" : "w-20",
        className
      )}
    >
      {/* Collapse Toggle Button */}
      {collapsible && onToggle && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="absolute -right-3.5 top-7 z-40 h-7 w-7 rounded-full bg-card border border-border shadow-xs flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              !isOpen && "rotate-180"
            )}
          />
        </button>
      )}

      {/* Top Section: Header & User Card */}
      <div className="flex flex-col shrink-0">
        {header || (
          isOpen ? (
            <div className="p-4 pb-2">
              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-secondary/40 border border-border/50">
                <div className="relative shrink-0">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="h-10 w-10 rounded-full object-cover border border-border/60"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
                      {displayName
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase() || "MW"}
                    </div>
                  )}
                  {/* Blue Verified Badge */}
                  <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-card flex items-center justify-center">
                    <BadgeCheck className="h-3.5 w-3.5 text-blue-500 fill-blue-500" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold text-foreground truncate leading-tight">
                      {displayName}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {categoryLabel}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-2 flex flex-col items-center gap-3">
              {/* Brand Logo Badge */}
              <Link
                href={logoHref}
                className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center p-2 shadow-xs hover:scale-105 transition-transform"
                aria-label="MyKostoma Home"
              >
                <img
                  src="/mykostoma_logo_white.png"
                  alt="MyKostoma"
                  className="h-5 w-5 object-contain"
                />
              </Link>
              {/* User Avatar with Blue Verified Badge */}
              <div className="relative">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="h-9 w-9 rounded-full object-cover border border-border/60"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
                    {displayName
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase() || "MW"}
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-card flex items-center justify-center">
                  <BadgeCheck className="h-3 w-3 text-blue-500 fill-blue-500" />
                </span>
              </div>
            </div>
          )
        )}

        {/* Main Nav Items */}
        <nav
          className={cn(
            "px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)]",
            !isOpen && "px-2"
          )}
        >
          {items.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.href, item.id);

            return (
              <div key={item.id} className="relative group">
                <button
                  type="button"
                  disabled={item.disabled}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer outline-none",
                    item.disabled &&
                      "opacity-50 cursor-not-allowed pointer-events-none",
                    active
                      ? "bg-primary/10 text-primary font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                    !isOpen && "justify-center px-0 py-2.5"
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        "h-5 w-5 shrink-0 transition-colors",
                        active
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                  )}

                  {isOpen && (
                    <span className="truncate flex-1 text-left">
                      {item.label}
                    </span>
                  )}

                  {isOpen && item.badge !== undefined && (
                    <span
                      className={cn(
                        "inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold leading-3.5 shrink-0 transition-colors",
                        item.badgeVariant === "secondary"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-white"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>

                {/* Collapsed Tooltip */}
                {!isOpen && (
                  <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow-md group-hover:block whitespace-nowrap">
                    {item.label}
                    {item.badge !== undefined && ` (${item.badge})`}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section (Stacked one after the other in both open and collapsed) */}
      {footer || (
        <div
          className={cn(
            "p-3 border-t border-border/70 shrink-0 space-y-1 mt-auto",
            !isOpen && "px-2 py-3 flex flex-col items-center"
          )}
        >
          {/* Notifications */}
          <div className="relative group w-full">
            <Link
              href="/notifications"
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                isItemActive("/notifications")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                !isOpen && "justify-center px-0 py-2.5"
              )}
            >
              <Bell className="h-5 w-5 shrink-0" />
              {isOpen && <span className="truncate">Notifications</span>}
            </Link>
            {!isOpen && (
              <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow-md group-hover:block whitespace-nowrap">
                Notifications
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative group w-full">
            <Link
              href="/settings"
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                isItemActive("/settings")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                !isOpen && "justify-center px-0 py-2.5"
              )}
            >
              <Settings className="h-5 w-5 shrink-0" />
              {isOpen && <span className="truncate">Settings</span>}
            </Link>
            {!isOpen && (
              <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow-md group-hover:block whitespace-nowrap">
                Settings
              </div>
            )}
          </div>

          {/* Log Out */}
          <div className="relative group w-full">
            <button
              type="button"
              onClick={handleSignOut}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer",
                !isOpen && "justify-center px-0 py-2.5"
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {isOpen && <span className="truncate">Log Out</span>}
            </button>
            {!isOpen && (
              <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow-md group-hover:block whitespace-nowrap">
                Log Out
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
