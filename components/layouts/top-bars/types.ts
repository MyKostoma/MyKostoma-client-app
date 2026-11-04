"use client";

import * as React from "react";

export type TopBarVariant =
  | "dashboard"
  | "header"
  | "app"
  | "minimal"
  | (string & {});

export interface BreadcrumbItemConfig {
  label: string;
  href?: string;
}

export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TopBarVariant;
  title?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItemConfig[];
  onMenuClick?: () => void;
  actions?: React.ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onSearchClick?: () => void;
  showSearch?: boolean;
  showNotifications?: boolean;
  showThemeToggle?: boolean;
  showUserMenu?: boolean;
  className?: string;
  children?: React.ReactNode;
}

