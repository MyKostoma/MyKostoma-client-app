"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  TrendingUp,
  Search,
  FileText,
  Store,
  Wallet,
  Cog,
  Star,
  IdCard,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  BadgeCheck,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  logout,
  selectCurrentUser,
} from "@/store/slices/authSlice";
import { clearAuthCookies } from "@/lib/cookies";
import { baseApi } from "@/store/api/baseApi";
import { SidebarTooltip, SidebarTooltipProvider } from "./sidebar-tooltip";
import { SidebarThemeToggle } from "./sidebar-theme-toggle";
import { SidebarBrandLogo } from "./sidebar-brand-logo";
import type { SidebarNavItem, SidebarProps } from "./types";

export const DEFAULT_PREMIUM_VENDOR_NAV_ITEMS: SidebarNavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: TrendingUp },
  { id: "requests", label: "Requests", href: "/requests", icon: Search },
  { id: "quotations", label: "Quotations", href: "/quotations", icon: FileText },
  { id: "my-shop", label: "My Shop", href: "/shop", icon: Store },
  { id: "orders", label: "Orders", href: "/orders", icon: Wallet },
  { id: "wallet", label: "Wallet", href: "/wallet", icon: Cog },
  { id: "reviews", label: "Reviews", href: "/reviews", icon: Star },
  { id: "verification", label: "Verification", href: "/verification", icon: IdCard },
];

export function PremiumVendorSidebar({
  isOpen = true,
  onToggle,
  activeItemId,
  onItemSelect,
  items = DEFAULT_PREMIUM_VENDOR_NAV_ITEMS,
  header,
  footer,
  user: userProp,
  onLogout,
  collapsible = true,
  logoHref = "/",
  className,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeUser = useAppSelector(selectCurrentUser);
  const user = userProp !== undefined ? userProp : storeUser;

  const vendorName =
    user?.fullName ||
    (user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "") ||
    "Elite Designs Ltd.";
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
    <SidebarTooltipProvider delayDuration={120} skipDelayDuration={250}>
      <aside
        aria-label="Premium vendor navigation sidebar"
        className={cn(
          "relative hidden lg:flex flex-col h-screen shrink-0 bg-card border-r border-border transition-[width] duration-300 ease-in-out select-none z-30 justify-between overflow-x-hidden",
          isOpen ? "w-64" : "w-16",
          className
        )}
      >
        {/* Top Section: Header & User Card */}
        <div className="flex flex-col shrink-0 overflow-x-hidden">
          {/* Top Collapse Toggle before any element */}
          {collapsible && onToggle && (
            isOpen ? (
              <div className="pt-3 px-4 pb-1 flex items-center justify-end">
                <button
                  type="button"
                  onClick={onToggle}
                  aria-label="Collapse sidebar"
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Collapse</span>
                </button>
              </div>
            ) : (
              <div className="pt-3 pb-1 flex items-center justify-center">
                <SidebarTooltip content="Expand" enabled={!isOpen}>
                  <button
                    type="button"
                    onClick={onToggle}
                    aria-label="Expand sidebar"
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </SidebarTooltip>
              </div>
            )
          )}

          {/* MyKostoma Brand Logo: Full logo when open, icon logo when collapsed */}
          <SidebarBrandLogo isOpen={isOpen} logoHref={logoHref} />

          {header || (
            isOpen ? (
              <div className="px-4 pb-2 pt-1">
                <Link
                  href="/profile/company"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-[#D81B60] to-[#E91E63] text-white shadow-md hover:opacity-95 transition-opacity"
                >
                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-bold text-white truncate leading-tight">
                        {vendorName}
                      </p>
                      <span className="shrink-0">
                        <BadgeCheck className="h-3.5 w-3.5 text-blue-200 fill-blue-500" />
                      </span>
                    </div>
                    <p className="text-xs text-white/85 font-medium mt-0.5 truncate">
                      Premium Vendor
                    </p>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="pt-4 pb-2 flex flex-col items-center gap-3">
                {/* Collapsed Vendor Briefcase Badge with Blue Checkmark */}
                <SidebarTooltip content={`${vendorName} (Premium Vendor)`} enabled={!isOpen}>
                  <Link href="/profile/company" className="relative cursor-pointer block">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-[#D81B60] to-[#E91E63] text-white flex items-center justify-center shadow-xs">
                      <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-card flex items-center justify-center">
                      <BadgeCheck className="h-3 w-3 text-blue-500 fill-blue-500" />
                    </span>
                  </Link>
                </SidebarTooltip>
              </div>
            )
          )}

          {/* Main Nav Items */}
          <nav
            className={cn(
              "px-3 py-2 space-y-1 overflow-y-auto no-scrollbar overflow-x-hidden max-h-[calc(100vh-270px)]",
              !isOpen && "px-2"
            )}
          >
            {items.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item.href, item.id);

              return (
                <SidebarTooltip
                  key={item.id}
                  content={
                    <span>
                      {item.label}
                      {item.badge !== undefined && ` (${item.badge})`}
                    </span>
                  }
                  enabled={!isOpen}
                >
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
                </SidebarTooltip>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section (Stacked one after the other, cleanly pop up on hover when collapsed) */}
        {footer || (
          <div
            className={cn(
              "p-3 border-t border-border/70 shrink-0 space-y-1 mt-auto overflow-x-hidden",
              !isOpen && "px-2 py-3 flex flex-col items-center"
            )}
          >
            {/* Notifications */}
            <SidebarTooltip content="Notifications" enabled={!isOpen}>
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
            </SidebarTooltip>

            {/* Admin Profile */}
            <SidebarTooltip content="Admin Profile" enabled={!isOpen}>
              <Link
                href="/profile"
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                  isItemActive("/profile") || isItemActive("/admin/profile")
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                  !isOpen && "justify-center px-0 py-2.5"
                )}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Admin"
                    className="h-5 w-5 rounded-full object-cover shrink-0 border border-border"
                  />
                ) : (
                  <UserIcon className="h-5 w-5 shrink-0" />
                )}
                {isOpen && <span className="truncate">Admin Profile</span>}
              </Link>
            </SidebarTooltip>

            {/* Settings */}
            <SidebarTooltip content="Settings" enabled={!isOpen}>
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
            </SidebarTooltip>

            {/* Theme Toggle */}
            <SidebarThemeToggle isOpen={isOpen} />

            {/* Log Out */}
            <SidebarTooltip content="Log Out" enabled={!isOpen}>
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
            </SidebarTooltip>
          </div>
        )}
      </aside>
    </SidebarTooltipProvider>
  );
}

export default PremiumVendorSidebar;
