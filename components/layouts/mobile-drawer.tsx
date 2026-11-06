"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, Sparkles, Briefcase, User2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { selectUserRole, selectCurrentUser } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import {
  DEFAULT_CONSUMER_NAV_ITEMS,
} from "./sidebars/consumer-sidebar";
import {
  DEFAULT_PROFESSIONAL_NAV_ITEMS,
} from "./sidebars/professional-sidebar";
import { SidebarUserCard } from "./sidebars/sidebar-user-card";
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
  logoHref = "/home",
  onLogout,
  className,
  children,
}: MobileDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();

  const storeUserRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const storeUser = useAppSelector(selectCurrentUser);
  const user = userProp !== undefined ? userProp : storeUser;

  const effectiveVariant =
    variant || storeUserRole || activePerspective || "consumer";
  const isProfessional = effectiveVariant === "professional";

  const defaultItems = isProfessional
    ? DEFAULT_PROFESSIONAL_NAV_ITEMS
    : DEFAULT_CONSUMER_NAV_ITEMS;
  const items = itemsProp || defaultItems;

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
          "fixed left-0 top-0 bottom-0 z-50 w-72 max-w-[85vw] flex flex-col bg-card border-r border-border shadow-xl lg:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-border/70 shrink-0">
          <Link
            href={logoHref}
            className="flex items-center gap-2.5 group"
            aria-label="MyKostoma Home"
            onClick={onClose}
          >
            {isOpen ? (
              <div className="inline-flex items-center shrink-0">
                <img
                  src="/mykostoma_full_logo.png"
                  alt="MyKostoma"
                  className="h-7 sm:h-8 w-auto object-contain dark:hidden select-none"
                />
                <img
                  src="/mykostoma_full_logo_white.png"
                  alt="MyKostoma"
                  className="h-7 sm:h-8 w-auto object-contain hidden dark:block select-none"
                />
              </div>
            ) : (
              <>
                <div
                  className={cn(
                    "h-8 w-8 rounded-xl flex items-center justify-center font-bold text-white shadow-xs",
                    isProfessional ? "bg-foreground text-background" : "bg-primary"
                  )}
                >
                  {isProfessional ? (
                    <Briefcase className="h-4 w-4" />
                  ) : (
                    <User2 className="h-4 w-4" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm tracking-tight text-foreground">
                    MyKostoma
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    {isProfessional ? "Partner Portal" : "Consumer Portal"}
                  </span>
                </div>
              </>
            )}
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

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {children || (
            <nav aria-label="Mobile navigation" className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const active = isItemActive(item);

                return (
                  <React.Fragment key={item.id}>
                    {item.isDividerBefore && (
                      <div className="my-2 border-t border-border/60" />
                    )}
                    <button
                      type="button"
                      disabled={item.disabled}
                      onClick={() => handleItemClick(item)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer outline-none",
                        item.disabled &&
                        "opacity-50 cursor-not-allowed pointer-events-none",
                        active
                          ? isProfessional
                            ? "bg-primary text-white font-semibold shadow-xs"
                            : "bg-accent text-primary font-semibold shadow-2xs"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                      )}
                    >
                      {Icon && (
                        <Icon
                          className={cn(
                            "h-5 w-5 shrink-0 transition-colors",
                            active
                              ? isProfessional
                                ? "text-white"
                                : "text-primary"
                              : "text-muted-foreground"
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
                            active && isProfessional
                              ? "bg-white text-primary"
                              : "bg-primary text-white"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </React.Fragment>
                );
              })}
            </nav>
          )}
        </div>

        {/* Footer User Card */}
        <SidebarUserCard
          user={user}
          isOpen={true}
          onLogout={onLogout}
        />
      </aside>
    </>
  );
}

export default MobileDrawer;
