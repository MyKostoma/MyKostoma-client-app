"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  ListOrdered,
  Calendar,
  Heart,
  Settings,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarUserCard } from "./sidebar-user-card";
import type { SidebarNavItem, SidebarProps } from "./types";

export const DEFAULT_CONSUMER_NAV_ITEMS: SidebarNavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: Home },
  {
    id: "requests",
    label: "Requests",
    href: "/requests",
    icon: ListOrdered,
    badge: 12,
    badgeVariant: "primary",
  },
  { id: "my-bookings", label: "My Bookings", href: "/bookings", icon: Calendar },
  {
    id: "saved-items",
    label: "Saved Items",
    href: "/saved",
    icon: Heart,
    badge: 12,
    badgeVariant: "primary",
  },
  { id: "settings", label: "Settings", href: "/settings", icon: Settings },
];

export function ConsumerSidebar({
  isOpen = true,
  onToggle,
  activeItemId,
  onItemSelect,
  items = DEFAULT_CONSUMER_NAV_ITEMS,
  header,
  footer,
  user,
  onLogout,
  collapsible = true,
  className,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isItemActive = (item: SidebarNavItem) => {
    if (activeItemId !== undefined) {
      return activeItemId === item.id;
    }
    if (item.href) {
      if (item.href === "/dashboard") {
        return pathname === "/dashboard" || pathname === "/dashboard/";
      }
      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    }
    return false;
  };

  const handleItemClick = (item: SidebarNavItem) => {
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
      aria-label="Consumer navigation sidebar"
      className={cn(
        "relative hidden lg:flex flex-col h-screen shrink-0 bg-card border-r border-border transition-[width] duration-300 ease-in-out select-none z-30",
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

      {/* Brand Header */}
      {header || (
        <div className="h-16 px-4 flex items-center border-b border-border/70 overflow-hidden">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-hidden"
          >
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            {isOpen && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-sm tracking-tight text-foreground truncate">
                  MyKostoma
                </span>
                <span className="text-[10px] font-medium text-muted-foreground truncate uppercase tracking-wider">
                  Consumer Portal
                </span>
              </div>
            )}
          </Link>
        </div>
      )}

      {/* Nav Items List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item);

          return (
            <React.Fragment key={item.id}>
              {item.isDividerBefore && (
                <div className="my-2 border-t border-border/60" />
              )}
              <div className="relative group">
                <button
                  type="button"
                  disabled={item.disabled}
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer outline-none",
                    item.disabled &&
                      "opacity-50 cursor-not-allowed pointer-events-none",
                    active
                      ? "bg-accent text-primary font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/70",
                    !isOpen && "justify-center px-0"
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
            </React.Fragment>
          );
        })}
      </nav>

      {/* Footer User Card */}
      {footer || (
        <SidebarUserCard
          user={user}
          isOpen={isOpen}
          onLogout={onLogout}
        />
      )}
    </aside>
  );
}

