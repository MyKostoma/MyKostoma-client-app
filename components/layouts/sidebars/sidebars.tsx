"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type ComponentType,
} from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import {
  toggleSidebar as toggleSidebarAction,
  selectActivePerspective,
} from "@/store/slices/uiSlice";
import { ConsumerSidebar } from "./consumer-sidebar";
import { ProfessionalSidebar } from "./professional-sidebar";
import { PremiumVendorSidebar } from "./premium-vendor-sidebar";
import type { SidebarProps } from "./types";

export const SIDEBAR_VARIANTS: Record<
  string,
  ComponentType<SidebarProps>
> = {
  consumer: ConsumerSidebar,
  professional: ProfessionalSidebar,
  "premium-vendor": PremiumVendorSidebar,
  vendor: PremiumVendorSidebar,
};

const XL_BREAKPOINT_QUERY = "(min-width: 1280px)";

function subscribeXlBreakpoint(callback: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {};
  }
  const mediaQuery = window.matchMedia(XL_BREAKPOINT_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getXlSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  return window.matchMedia(XL_BREAKPOINT_QUERY).matches;
}

function getServerXlSnapshot(): boolean {
  return true;
}

export function Sidebar({
  variant,
  isOpen: isOpenProp,
  onToggle: onToggleProp,
  ...props
}: SidebarProps) {
  const dispatch = useAppDispatch();
  const storeUserRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);

  // Responsive default: expanded on xl (>= 1280px), collapsed on lg (1024px <= width < 1280px)
  const isXl = useSyncExternalStore(
    subscribeXlBreakpoint,
    getXlSnapshot,
    getServerXlSnapshot
  );

  // Explicit user manual override
  const [userToggledOpen, setUserToggledOpen] = useState<boolean | null>(null);

  // Reset explicit toggle state when screen crosses between lg and xl breakpoints
  useEffect(() => {
    setUserToggledOpen(null);
  }, [isXl]);

  const effectiveIsOpen =
    isOpenProp !== undefined
      ? isOpenProp
      : userToggledOpen !== null
        ? userToggledOpen
        : isXl;

  const handleToggle = useCallback(() => {
    setUserToggledOpen((prev) => {
      const current = prev !== null ? prev : isXl;
      return !current;
    });

    if (onToggleProp) {
      onToggleProp();
    } else {
      dispatch(toggleSidebarAction());
    }
  }, [onToggleProp, isXl, dispatch]);

  const effectiveVariant =
    variant || storeUserRole || activePerspective || "consumer";

  const VariantComponent =
    SIDEBAR_VARIANTS[effectiveVariant] || ConsumerSidebar;

  return (
    <VariantComponent
      isOpen={effectiveIsOpen}
      onToggle={handleToggle}
      {...props}
    />
  );
}

export const Sidebars = Sidebar;

export * from "./types";
export * from "./sidebar-user-card";
export * from "./sidebar-theme-toggle";
export * from "./sidebar-brand-logo";
export * from "./consumer-sidebar";
export * from "./professional-sidebar";
export * from "./premium-vendor-sidebar";

export default Sidebar;
