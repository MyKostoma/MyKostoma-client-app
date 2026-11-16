import * as React from "react";

export interface LandingNavbarProps extends React.HTMLAttributes<HTMLElement> {
  logoHref?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void | Promise<void>;
  isAuthenticated?: boolean;
}

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
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

export type HeaderVariant = "landing" | "app" | (string & {});

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  variant?: HeaderVariant;
  logoHref?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void | Promise<void>;
  isAuthenticated?: boolean;
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
