import * as React from "react";

export interface FooterLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface FooterColumnItem {
  title: string;
  links: FooterLinkItem[];
}

export interface FooterSocialItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface PublicFooterProps extends React.HTMLAttributes<HTMLElement> {
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

export interface PublicFooter2Props extends React.HTMLAttributes<HTMLElement> {
  tagline?: string;
  columns?: FooterColumnItem[];
  bottomLinks?: FooterLinkItem[];
  copyrightText?: string;
  copyrightYear?: number | string;
  companyName?: string;
}

export interface AppFooterProps extends React.HTMLAttributes<HTMLElement> {
  tagline?: string;
  logoHref?: string;
  logoSrc?: string;
  logoDarkSrc?: string;
  columns?: FooterColumnItem[];
  bottomLinks?: FooterLinkItem[];
  copyrightYear?: number | string;
  companyName?: string;
  onCloudClick?: () => void;
  onSendClick?: () => void;
  onUserClick?: () => void;
}

export type FooterVariant =
  | "public"
  | "public2"
  | "publicFooter2"
  | "app"
  | "logged-out"
  | "logged-in"
  | (string & {});

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  isLoggedIn?: boolean;
  variant?: FooterVariant;
  tagline?: string;
  logoHref?: string;
  columns?: FooterColumnItem[];
  copyrightYear?: number | string;
  [key: string]: any;
}
