import type { ComponentType, HTMLAttributes, MouseEvent } from "react";

export interface FooterLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export interface FooterColumnItem {
  title: string;
  links: FooterLinkItem[];
}

export interface FooterSocialItem {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface PublicFooterProps extends HTMLAttributes<HTMLElement> {
  tagline?: string;
  logoHref?: string;
  logoSrc?: string;
  logoDarkSrc?: string;
  columns?: FooterColumnItem[];
  socials?: FooterSocialItem[];
  copyrightYear?: number | string;
  companyName?: string;
  location?: string;
  version?: string;
}

export interface PublicFooter2Props extends HTMLAttributes<HTMLElement> {
  tagline?: string;
  columns?: FooterColumnItem[];
  bottomLinks?: FooterLinkItem[];
  copyrightText?: string;
  copyrightYear?: number | string;
  companyName?: string;
}

export interface AppFooterProps extends HTMLAttributes<HTMLElement> {
  tagline?: string;
  logoHref?: string;
  logoSrc?: string;
  logoDarkSrc?: string;
  columns?: FooterColumnItem[];
  socials?: FooterSocialItem[];
  bottomLinks?: FooterLinkItem[];
  copyrightYear?: number | string;
  companyName?: string;
  onCloudClick?: () => void;
  onSendClick?: () => void;
  onUserClick?: () => void;
}

export interface DashboardFooterProps extends HTMLAttributes<HTMLElement> {
  copyrightText?: string;
  links?: FooterLinkItem[];
}

export type FooterVariant =
  | "public"
  | "public2"
  | "publicFooter2"
  | "app"
  | "dashboard"
  | "logged-out"
  | "logged-in"
  | (string & {});

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  isLoggedIn?: boolean;
  isAuthenticated?: boolean;
  variant?: FooterVariant;
  tagline?: string;
  logoHref?: string;
  columns?: FooterColumnItem[];
  copyrightYear?: number | string;
  [key: string]: any;
}
