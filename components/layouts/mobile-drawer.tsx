"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  X,
  Briefcase,
  BadgeCheck,
  Bell,
  Settings,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectUserRole,
  selectCurrentUser,
  logout,
} from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import { clearAuthCookies } from "@/lib/cookies";
import { baseApi } from "@/store/api/baseApi";
import {
  DEFAULT_CONSUMER_NAV_ITEMS,
} from "./sidebars/consumer-sidebar";
import {
  DEFAULT_PROFESSIONAL_NAV_ITEMS,
} from "./sidebars/professional-sidebar";
import {
  DEFAULT_PREMIUM_VENDOR_NAV_ITEMS,
} from "./sidebars/premium-vendor-sidebar";
import type {
  SidebarNavItem,
  SidebarVariant,
} from "./sidebars/types";
import type { User } from "@/types/user";

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: SidebarVariant;
  activeItemId?: string;
  onItemSelect?: (id: string, item?: SidebarNavItem) => void;
  items?: SidebarNavItem[];
  title?: string;
  user?: User | null;
  onLogout?: () => void | Promise<void>;
  className?: string;
  children?: React.ReactNode;
  logoHref?: string;
}

export function MobileDrawer({
  isOpen,
  onClose,
  variant,
  activeItemId,
  onItemSelect,
  items: itemsProp,
  title,
  user: userProp,
  logoHref = "/dashboard",
  onLogout,
  className,
  children,
}: MobileDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const storeUserRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const storeUser = useAppSelector(selectCurrentUser);
  const user = userProp !== undefined ? userProp : storeUser;

  const effectiveVariant =
    variant || storeUserRole || activePerspective || "consumer";
  const isVendor =
    effectiveVariant === "premium-vendor" || effectiveVariant === "vendor";
  const isProfessional = effectiveVariant === "professional";

  const defaultItems = isVendor
    ? DEFAULT_PREMIUM_VENDOR_NAV_ITEMS
    : isProfessional
    ? DEFAULT_PROFESSIONAL_NAV_ITEMS
    : DEFAULT_CONSUMER_NAV_ITEMS;
  const items = itemsProp || defaultItems;

  const displayName =
    user?.fullName ||
    (user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "") ||
    (isVendor
      ? "Elite Designs Ltd."
      : isProfessional
      ? "Marcus Webb"
      : "Sarah Jenkins");

  const roleSubtitle = isVendor
    ? "Premium Vendor"
    : isProfessional
    ? user?.category
      ? `Pro ${String(user.category).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`
      : "Pro Tailor"
    : "Consumer";

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
      onClose();
    }
  };

  // Close on route change
  const prevPathnameRef = React.useRef(pathname);
  React.useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  const handleItemClick = (item: SidebarNavItem) => {
    if (item.disabled) return;
    if (item.onClick) {
      item.onClick(item);
    }
    onItemSelect?.(item.id, item);
    if (item.href && !item.onClick) {
      router.push(item.href);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer Aside */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title || "Navigation Menu"}
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 w-72 max-w-[85vw] flex flex-col justify-between bg-card border-r border-border shadow-xl lg:hidden transition-transform duration-300 ease-in-out select-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex flex-col min-h-0 flex-1">
          {/* Header Bar */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-border/70 shrink-0">
            <Link
              href={logoHref}
              className="flex items-center gap-2 group focus:outline-hidden"
              aria-label="MyKostoma Home"
              onClick={onClose}
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

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Profile Card / Header Widget based on variant */}
          <div className="p-3 shrink-0">
            {isVendor ? (
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#E91E63] text-white shadow-md">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-bold text-white truncate leading-tight">
                      {displayName}
                    </p>
                    <BadgeCheck className="h-3.5 w-3.5 text-blue-200 fill-blue-500 shrink-0" />
                  </div>
                  <p className="text-xs text-white/85 font-medium mt-0.5 truncate">
                    {roleSubtitle}
                  </p>
                </div>
              </div>
            ) : isProfessional ? (
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
                  <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-card flex items-center justify-center">
                    <BadgeCheck className="h-3.5 w-3.5 text-blue-500 fill-blue-500" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground truncate leading-tight">
                    {displayName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {roleSubtitle}
                  </p>
                </div>
              </div>
            ) : (
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
                        .toUpperCase() || "SJ"}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground truncate leading-tight">
                    {displayName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {roleSubtitle}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1">
            {children || (
              <nav aria-label="Mobile navigation" className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(item.href, item.id);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={item.disabled}
                      onClick={() => handleItemClick(item)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer outline-none",
                        item.disabled &&
                          "opacity-50 cursor-not-allowed pointer-events-none",
                        active
                          ? "bg-primary/10 text-primary font-semibold shadow-2xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      )}
                    >
                      {Icon && (
                        <Icon
                          className={cn(
                            "h-5 w-5 shrink-0 transition-colors",
                            active ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                      )}

                      <span className="truncate flex-1 text-left">
                        {item.label}
                      </span>

                      {item.badge !== undefined && (
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
                  );
                })}
              </nav>
            )}
          </div>
        </div>

        {/* Stacked Bottom Utilities */}
        <div className="p-3 border-t border-border/70 shrink-0 space-y-1">
          {/* Notifications */}
          <Link
            href="/notifications"
            onClick={onClose}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
              isItemActive("/notifications")
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            )}
          >
            <Bell className="h-5 w-5 shrink-0" />
            <span className="truncate">Notifications</span>
          </Link>

          {/* Profile (Consumer or Vendor Admin Profile) */}
          {(isVendor || !isProfessional) && (
            <Link
              href="/profile"
              onClick={onClose}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                isItemActive("/profile") || isItemActive("/admin/profile")
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <UserIcon className="h-5 w-5 shrink-0" />
              <span className="truncate">
                {isVendor ? "Admin Profile" : "Profile"}
              </span>
            </Link>
          )}

          {/* Settings */}
          <Link
            href="/settings"
            onClick={onClose}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
              isItemActive("/settings")
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            )}
          >
            <Settings className="h-5 w-5 shrink-0" />
            <span className="truncate">Settings</span>
          </Link>

          {/* Log Out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className="truncate">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default MobileDrawer;
