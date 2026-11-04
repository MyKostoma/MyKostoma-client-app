"use client";

import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import {
  toggleSidebar as toggleSidebarAction,
  selectSidebarOpen,
  selectActivePerspective,
} from "@/store/slices/uiSlice";
import { ConsumerSidebar } from "./consumer-sidebar";
import { ProfessionalSidebar } from "./professional-sidebar";
import type { SidebarProps } from "./types";

export const SIDEBAR_VARIANTS: Record<
  string,
  React.ComponentType<SidebarProps>
> = {
  consumer: ConsumerSidebar,
  professional: ProfessionalSidebar,
};

export function Sidebar({
  variant,
  isOpen: isOpenProp,
  onToggle: onToggleProp,
  ...props
}: SidebarProps) {
  const dispatch = useAppDispatch();
  const storeUserRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const storeSidebarOpen = useAppSelector(selectSidebarOpen);

  const effectiveIsOpen =
    isOpenProp !== undefined ? isOpenProp : storeSidebarOpen;

  const handleToggle = React.useCallback(() => {
    if (onToggleProp) {
      onToggleProp();
    } else {
      dispatch(toggleSidebarAction());
    }
  }, [onToggleProp, dispatch]);

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
export * from "./consumer-sidebar";
export * from "./professional-sidebar";

export default Sidebar;

