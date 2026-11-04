"use client";

import * as React from "react";
import { DashboardTopBar } from "./dashboard-top-bar";
import { HeaderTopBar } from "./header-top-bar";
import { MinimalTopBar } from "./minimal-top-bar";
import type { TopBarProps } from "./types";

export const TOP_BAR_VARIANTS: Record<
  string,
  React.ComponentType<TopBarProps>
> = {
  dashboard: DashboardTopBar,
  header: HeaderTopBar,
  app: HeaderTopBar,
  minimal: MinimalTopBar,
};

export function TopBar({
  variant = "dashboard",
  className,
  ...props
}: TopBarProps) {
  if (variant && TOP_BAR_VARIANTS[variant]) {
    const VariantComponent = TOP_BAR_VARIANTS[variant];
    return <VariantComponent className={className} {...props} />;
  }

  return <DashboardTopBar className={className} {...props} />;
}

export const TopBars = TopBar;
export const Topbar = TopBar;

export * from "./types";
export * from "./dashboard-top-bar";
export * from "./header-top-bar";
export * from "./minimal-top-bar";

export default TopBar;

