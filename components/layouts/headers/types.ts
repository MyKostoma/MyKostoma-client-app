import type { HTMLAttributes } from "react";

export interface LandingNavbarProps extends HTMLAttributes<HTMLElement> {
  logoHref?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void | Promise<void>;
  isAuthenticated?: boolean;
}

export interface AppHeaderProps extends HTMLAttributes<HTMLElement> {
  logoHref?: string;
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
  notificationCount?: number;
  hasUnreadMessages?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onSearchSubmit?: (val: string) => void;
  onNotificationsClick?: () => void;
  onMessagesClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void | Promise<void>;
}

export type HeaderVariant =
  | "landing"
  | "public"
  | "logged-out"
  | "app"
  | "logged-in"
  | (string & {});

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  variant?: HeaderVariant;
  logoHref?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void | Promise<void>;
  isAuthenticated?: boolean;
  isLoggedIn?: boolean;
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
  notificationCount?: number;
  hasUnreadMessages?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onSearchSubmit?: (val: string) => void;
  onNotificationsClick?: () => void;
  onMessagesClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  [key: string]: any;
}
