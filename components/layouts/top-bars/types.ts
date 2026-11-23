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

export interface WalletTopBarProps {
  title: string;
  subtitle?: string;
  breadcrumbParentLabel?: string;
  breadcrumbCurrentLabel?: string;
  onBreadcrumbParentClick?: () => void;
  onBack?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export interface ProfessionalWalletTopBarProps {
  title?: string;
  breadcrumbs?: BreadcrumbItemConfig[];
  highlightLastPrimary?: boolean;
  onHelpCenter?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export interface VerificationTopBarProps {
  title?: string;
  breadcrumbs?: BreadcrumbItemConfig[];
  highlightLastPrimary?: boolean;
  onHelpCenter?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export interface ReviewsTopBarProps {
  title?: string;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  filterOpen: boolean;
  activeFilterCount?: number;
  onToggleFilters: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export interface ReviewSubpageTopBarProps {
  title: string;
  backLabel: string;
  onBack: () => void;
  actionLabel?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
  onMenuClick?: () => void;
  className?: string;
}

export interface ReelsTopBarProps {
  title?: string;
  isProfessional: boolean;
  viewMode: "my-reels" | "discover" | "following";
  searchQuery: string;
  onSearchChange: (value: string) => void;
  mobileSearchOpen?: boolean;
  onToggleMobileSearch?: () => void;
  onViewModeChange?: (mode: "my-reels" | "discover" | "following") => void;
  onUploadClick?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export interface ReelsSubpageTopBarProps {
  title: string;
  backLabel: string;
  onBack: () => void;
  actionLabel?: string;
  onAction?: () => void;
  onMenuClick?: () => void;
  className?: string;
}


