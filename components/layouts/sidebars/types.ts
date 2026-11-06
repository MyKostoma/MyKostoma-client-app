"use client";

import * as React from "react";
import type { User, UserRole } from "@/types/user";

export type SidebarVariant =
  | "consumer"
  | "professional"
  | "premium-vendor"
  | "vendor"
  | (string & {});

export interface SidebarNavChild {
  id: string;
  label: string;
  href: string;
  badge?: string | number;
  onClick?: () => void;
}

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  badge?: string | number;
  badgeVariant?: "primary" | "secondary";
  isDividerBefore?: boolean;
  disabled?: boolean;
  children?: SidebarNavChild[];
  onClick?: (item: SidebarNavItem) => void;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SidebarVariant;
  isOpen?: boolean;
  onToggle?: () => void;
  activeItemId?: string;
  onItemSelect?: (id: string, item?: SidebarNavItem) => void;
  items?: SidebarNavItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  user?: User | null;
  onLogout?: () => void | Promise<void>;
  collapsible?: boolean;
  logoHref?: string;
  className?: string;
}

export interface SidebarUserCardProps {
  user?: User | null;
  isOpen?: boolean;
  onLogout?: () => void | Promise<void>;
  className?: string;
}

