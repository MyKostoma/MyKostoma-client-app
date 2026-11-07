"use client";

import type { HTMLAttributes, ReactNode } from "react";
import type { OrderStatusBadgeProps } from "@/components/orders/types";

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

export interface TopBarProps extends HTMLAttributes<HTMLElement> {
  variant?: TopBarVariant;
  title?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItemConfig[];
  onMenuClick?: () => void;
  actions?: ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onSearchClick?: () => void;
  showSearch?: boolean;
  showNotifications?: boolean;
  showThemeToggle?: boolean;
  showUserMenu?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface OrdersListTopBarProps {
  totalCountLabel?: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onToggleFilters?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export interface OrderDetailTopBarProps {
  title: string;
  subtitle?: string;
  status: OrderStatusBadgeProps["status"];
  statusCustomLabel?: string;
  onBack: () => void;
  messageLabel?: string;
  onMessagePro?: () => void;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onMenuClick?: () => void;
  className?: string;
}
