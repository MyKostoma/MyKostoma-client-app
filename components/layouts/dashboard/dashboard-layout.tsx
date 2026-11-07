"use client";

import { useState, useCallback, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getDashboardPageTitle, getDashboardRouteConfig } from "@/lib/route-config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCurrentUser, selectUserRole } from "@/store/slices/authSlice";
import {
  toggleSidebar,
  selectSidebarOpen,
  selectActivePerspective,
} from "@/store/slices/uiSlice";
import { Sidebar } from "../sidebars/sidebars";
import { TopBar } from "../top-bars/top-bars";
import {
  DashboardTopBarProvider,
  useDashboardTopBar,
} from "@/providers/dashboard-top-bar-context";
import { MobileDrawer } from "../mobile-drawer";
import type { SidebarVariant } from "../sidebars/types";
import type { TopBarVariant, BreadcrumbItemConfig } from "../top-bars/types";
import type { UserRole } from "@/types/user";

export interface DashboardLayoutProps {
  children: ReactNode;
  role?: UserRole;
  sidebarVariant?: SidebarVariant;
  topBarVariant?: TopBarVariant;
  title?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItemConfig[];
  actions?: ReactNode;
  showSidebar?: boolean;
  showTopBar?: boolean;
  searchPlaceholder?: string;
  onSearchClick?: () => void;
  className?: string;
  contentClassName?: string;
}

const DEFAULT_PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/search": "Find Pros",
  "/bookings": "My Bookings",
  "/my-bookings": "My Bookings",
  "/saved": "Saved Items",
  "/saved-items": "Saved Items",
  "/requests": "My Requests",
  "/quotations": "Quotations",
  "/orders": "My Orders",
  "/shop": "My Shop",
  "/my-shop": "My Shop",
  "/reels": "Reels Console",
  "/reels-console": "Reels Console",
  "/earnings": "Earnings & Payouts",
  "/settings": "Settings",
  "/profile": "My Profile",
  "/notifications": "Notifications",
  "/messages": "Messages",
};

function getPageTitle(pathname: string): string {
  const configuredRoute = getDashboardRouteConfig(pathname);
  if (configuredRoute) {
    return getDashboardPageTitle(pathname);
  }
  if (DEFAULT_PAGE_TITLES[pathname]) {
    return DEFAULT_PAGE_TITLES[pathname];
  }
  for (const [path, title] of Object.entries(DEFAULT_PAGE_TITLES)) {
    if (pathname.startsWith(path)) {
      return title;
    }
  }
  return "Dashboard";
}

interface DashboardLayoutContentProps extends DashboardLayoutProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onMenuClick: () => void;
}

function DashboardLayoutContent({
  children,
  role: roleProp,
  sidebarVariant: sidebarVariantProp,
  topBarVariant = "dashboard",
  title,
  subtitle,
  breadcrumbs,
  actions,
  showSidebar = true,
  showTopBar = true,
  searchPlaceholder,
  onSearchClick,
  className,
  contentClassName,
  mobileOpen,
  onCloseMobile,
  onMenuClick,
}: DashboardLayoutContentProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const storeUserRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const sidebarOpen = useAppSelector(selectSidebarOpen);

  const { hasCustomTopBar, setPortalTarget } = useDashboardTopBar();

  const effectiveRole = roleProp || storeUserRole || activePerspective || "consumer";
  const effectiveSidebarVariant: SidebarVariant =
    sidebarVariantProp ||
    ((effectiveRole as string) === "premium-vendor" || (effectiveRole as string) === "vendor"
      ? "premium-vendor"
      : effectiveRole === "professional"
        ? "professional"
        : "consumer");

  const effectiveTitle = title || getPageTitle(pathname);
  const effectiveSubtitle =
    subtitle !== undefined
      ? subtitle
      : user
        ? `Welcome back, ${user.firstName || user.fullName || "there"}.`
        : undefined;

  const handleToggleSidebar = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  return (
    <div
      className={cn(
        "flex h-screen w-full overflow-hidden bg-background text-foreground font-inter select-none",
        className
      )}
    >
      {/* Desktop Collapsible Sidebar */}
      {showSidebar && (
        <Sidebar
          variant={effectiveSidebarVariant}
          isOpen={sidebarOpen}
          onToggle={handleToggleSidebar}
        />
      )}

      {/* Main Content Workspace */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Dynamic Top-Bar */}
        {showTopBar && (
          <>
            {/* Slot for pages with custom dynamic top bar */}
            <div
              ref={setPortalTarget}
              className={cn("w-full shrink-0", !hasCustomTopBar && "hidden")}
            />

            {/* Default TopBar when page has not mounted a custom top bar */}
            {!hasCustomTopBar && (
              <TopBar
                variant={topBarVariant}
                title={effectiveTitle}
                subtitle={effectiveSubtitle}
                breadcrumbs={breadcrumbs}
                actions={actions}
                searchPlaceholder={searchPlaceholder}
                onMenuClick={onMenuClick}
                onSearchClick={onSearchClick}
              />
            )}
          </>
        )}

        {/* Scrollable Main Viewport */}
        <main
          className={cn(
            "flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 min-w-0",
            contentClassName
          )}
        >
          {children}
        </main>
      </div>

      {/* Mobile Slide-in Drawer */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={onCloseMobile}
        variant={effectiveSidebarVariant}
      />
    </div>
  );
}

/**
 * Main dashboard layout wrapper that dynamically renders navigation, topbar,
 * and content views according to user role and configurable variants.
 * Supports dynamic page-specific top bars via `<DashboardTopBarSlot />`.
 */
export function DashboardLayout(props: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleMenuClick = useCallback(() => setMobileOpen(true), []);
  const handleCloseMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <DashboardTopBarProvider onMenuClick={handleMenuClick}>
      <DashboardLayoutContent
        {...props}
        mobileOpen={mobileOpen}
        onCloseMobile={handleCloseMobile}
        onMenuClick={handleMenuClick}
      />
    </DashboardTopBarProvider>
  );
}

export const DashboardWrapper = DashboardLayout;
export default DashboardLayout;
