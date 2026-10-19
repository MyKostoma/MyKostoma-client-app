"use client";

import * as React from "react";
import Link from "next/link";
import { Cloud, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   CONFIG & TEMPORARY FLAGS
   ========================================================================== */

/**
 * Temporary flag to control the logged-in state of the Footer component.
 * Set to `false` for Logged-Out / Public Marketplace footer (Image 1).
 * Set to `true` for Logged-In / Application footer (Image 2).
 */
export const TEMPORARY_IS_LOGGED_IN = false;

/* ==========================================================================
   INTERFACES & TYPES
   ========================================================================== */

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
  /** Tagline displayed beneath the brand logo */
  tagline?: string;
  /** Link for the logo */
  logoHref?: string;
  /** Custom logo source (defaults to /mykostoma_full_logo.png) */
  logoSrc?: string;
  /** Dark mode logo source (defaults to /mykostoma_full_logo_white.png) */
  logoDarkSrc?: string;
  /** Navigation link columns */
  columns?: FooterColumnItem[];
  /** Social media links */
  socials?: FooterSocialItem[];
  /** Copyright year */
  copyrightYear?: number | string;
  /** Registered company name */
  companyName?: string;
  /** Region/City indicator */
  location?: string;
  /** Application version string */
  version?: string;
}

export interface AppFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Tagline displayed beneath the brand logo */
  tagline?: string;
  /** Link for the logo */
  logoHref?: string;
  /** Custom logo source (defaults to /mykostoma_full_logo.png) */
  logoSrc?: string;
  /** Dark mode logo source (defaults to /mykostoma_full_logo_white.png) */
  logoDarkSrc?: string;
  /** Navigation link columns */
  columns?: FooterColumnItem[];
  /** Bottom bar utility links */
  bottomLinks?: FooterLinkItem[];
  /** Copyright year */
  copyrightYear?: number | string;
  /** Registered company name */
  companyName?: string;
  /** Click handlers for the 3 quick action buttons */
  onCloudClick?: () => void;
  onSendClick?: () => void;
  onUserClick?: () => void;
}

export type FooterVariant = "public" | "app" | "logged-out" | "logged-in";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Manually override the logged in status.
   * If undefined, falls back to `TEMPORARY_IS_LOGGED_IN`.
   */
  isLoggedIn?: boolean;
  /**
   * Explicit variant specification for future extensible footer styles.
   */
  variant?: FooterVariant;
  /** Optional overrides passed to the rendered footer */
  tagline?: string;
  logoHref?: string;
  columns?: FooterColumnItem[];
  copyrightYear?: number | string;
}

/* ==========================================================================
   ACCURATE SOCIAL SVG ICONS (Image 1)
   ========================================================================== */

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4.5", className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4.5", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4.5", className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4.5", className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

/* ==========================================================================
   DEFAULT DATA CONSTANTS
   ========================================================================== */

/** Image 1: Logged-Out / Public Marketplace Navigation Links */
export const DEFAULT_PUBLIC_FOOTER_COLUMNS: FooterColumnItem[] = [
  {
    title: "MARKETPLACE",
    links: [
      { label: "Find Pros", href: "#find-pros" },
      { label: "All Categories", href: "#all-categories" },
      { label: "Enterprise Solutions", href: "#enterprise-solutions" },
      { label: "Referral Program", href: "#referral-program" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Us", href: "#about-us" },
      { label: "How it Works", href: "#how-it-works" },
      { label: "Success Stories", href: "#success-stories" },
      { label: "Contact Support", href: "#contact-support" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "#privacy-policy" },
      { label: "Terms of Service", href: "#terms-of-service" },
      { label: "Safety Center", href: "#safety-center" },
      { label: "Help Guidelines", href: "#help-guidelines" },
    ],
  },
];

export const DEFAULT_PUBLIC_SOCIALS: FooterSocialItem[] = [
  { name: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { name: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { name: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
  { name: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
];

/** Image 2: Logged-In / Application Navigation Links */
export const DEFAULT_APP_FOOTER_COLUMNS: FooterColumnItem[] = [
  {
    title: "SERVICES",
    links: [
      { label: "Plumbing & HVAC", href: "#plumbing-hvac" },
      { label: "Electrical Work", href: "#electrical-work" },
      { label: "Interior Design", href: "#interior-design" },
      { label: "Home Security", href: "#home-security" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About Us", href: "#about-us" },
      { label: "Become a Pro", href: "#become-a-pro" },
      { label: "Trust & Safety", href: "#trust-and-safety" },
      { label: "Press Center", href: "#press-center" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Service Standards", href: "#service-standards" },
      { label: "Community Forum", href: "#community-forum" },
      { label: "Support Center", href: "#support-center" },
      { label: "Legal Notices", href: "#legal-notices" },
    ],
  },
];

export const DEFAULT_APP_BOTTOM_LINKS: FooterLinkItem[] = [
  { label: "GUIDELINES", href: "#guidelines" },
  { label: "PRIVACY POLICY", href: "#privacy-policy" },
  { label: "TERMS OF SERVICE", href: "#terms-of-service" },
];

/* ==========================================================================
   COMPONENT 1: PublicFooter (Image 1 - When User is Logged Out)
   ========================================================================== */

export function PublicFooter({
  tagline = "Connecting Nigeria's finest talent with those who need it most.",
  logoHref = "/",
  logoSrc = "/mykostoma_full_logo.png",
  logoDarkSrc = "/mykostoma_full_logo_white.png",
  columns = DEFAULT_PUBLIC_FOOTER_COLUMNS,
  socials = DEFAULT_PUBLIC_SOCIALS,
  copyrightYear = 2026,
  location = "Lagos, Nigeria",
  version = "v1.0.0",
  className,
  ...props
}: PublicFooterProps) {
  return (
    <footer
      className={cn(
        "w-full bg-card text-foreground border-t border-border/60 transition-colors",
        className
      )}
      {...props}
    >
      <div className="container px-6 sm:px-8 lg:px-12 pt-14 pb-10">
        {/* Top Section: Brand + Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Brand & Socials Column */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4">
            <Link
              href={logoHref}
              className="inline-flex items-center transition-opacity hover:opacity-90"
              aria-label="MyKostoma Home"
            >
              <img
                src={logoSrc}
                alt="MyKostoma"
                className="h-7 sm:h-8 w-auto object-contain dark:hidden select-none"
              />
              <img
                src={logoDarkSrc}
                alt="MyKostoma"
                className="h-7 sm:h-8 w-auto object-contain hidden dark:block select-none"
              />
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs sm:max-w-sm pt-1">
              {tagline}
            </p>

            {/* Social Media Row */}
            {socials && socials.length > 0 && (
              <div className="flex items-center gap-4 pt-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="text-slate-400 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground transition-colors p-0.5"
                    >
                      <Icon className="size-4.5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3 Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {columns.map((column) => (
              <div key={column.title} className="space-y-4">
                <h4 className="text-xs sm:text-sm font-bold tracking-wider text-foreground uppercase select-none">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={link.onClick}
                        className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-t border-border/80 my-8 sm:my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
          <p className="tracking-normal text-center sm:text-left">
            MyKostoma Digital © {copyrightYear}. All rights reserved.
          </p>

          <div className="flex items-center gap-2 tracking-normal text-muted-foreground">
            <span>{location}</span>
            <span className="text-muted-foreground/60 select-none">•</span>
            <span>{version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ==========================================================================
   COMPONENT 2: AppFooter (Image 2 - When User is Logged In)
   ========================================================================== */

export function AppFooter({
  tagline = "Connecting homeowners with elite local professionals. Standardizing trust and quality for home services worldwide.",
  logoHref = "/",
  logoSrc = "/mykostoma_full_logo.png",
  logoDarkSrc = "/mykostoma_full_logo_white.png",
  columns = DEFAULT_APP_FOOTER_COLUMNS,
  bottomLinks = DEFAULT_APP_BOTTOM_LINKS,
  copyrightYear = 2024,
  companyName = "MYKOSTOMA",
  onCloudClick,
  onSendClick,
  onUserClick,
  className,
  ...props
}: AppFooterProps) {
  return (
    <footer
      className={cn(
        "w-full bg-card text-foreground border-t border-border/60 transition-colors",
        className
      )}
      {...props}
    >
      <div className="container px-6 sm:px-8 lg:px-12 pt-14 pb-10">
        {/* Top Section: Brand + Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Brand & Action Buttons Column */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4">
            <Link
              href={logoHref}
              className="inline-flex items-center transition-opacity hover:opacity-90"
              aria-label="MyKostoma Home"
            >
              <img
                src={logoSrc}
                alt="MyKostoma"
                className="h-7 sm:h-8 w-auto object-contain dark:hidden select-none"
              />
              <img
                src={logoDarkSrc}
                alt="MyKostoma"
                className="h-7 sm:h-8 w-auto object-contain hidden dark:block select-none"
              />
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm pt-1">
              {tagline}
            </p>

            {/* Quick Action Button Trio (Cloud, Send, Profile) */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onCloudClick}
                aria-label="Cloud Services"
                title="Cloud Services"
                className="size-10 rounded-xl bg-secondary hover:bg-secondary-hover text-slate-600 dark:text-muted-foreground hover:text-foreground flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              >
                <Cloud className="size-4.5" />
              </button>

              <button
                type="button"
                onClick={onSendClick}
                aria-label="Direct Messages"
                title="Direct Messages"
                className="size-10 rounded-xl bg-secondary hover:bg-secondary-hover text-slate-600 dark:text-muted-foreground hover:text-foreground flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              >
                <Send className="size-4.5 -rotate-12 translate-x-px" />
              </button>

              <button
                type="button"
                onClick={onUserClick}
                aria-label="Account Settings"
                title="Account Settings"
                className="size-10 rounded-xl bg-secondary hover:bg-secondary-hover text-slate-600 dark:text-muted-foreground hover:text-foreground flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              >
                <User className="size-4.5" />
              </button>
            </div>
          </div>

          {/* 3 Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {columns.map((column) => (
              <div key={column.title} className="space-y-4">
                <h4 className="text-xs sm:text-sm font-bold tracking-wider text-foreground uppercase select-none">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={link.onClick}
                        className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Horizontal Divider */}
        <hr className="border-t border-border/80 my-8 sm:my-10" />

        {/* Bottom Bar: Uppercase Copyright & Uppercase Utility Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          <p className="text-center sm:text-left">
            {companyName} DIGITAL © {copyrightYear} • ALL RIGHTS RESERVED
          </p>

          {bottomLinks && bottomLinks.length > 0 && (
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6 sm:gap-8">
              {bottomLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={link.onClick}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}


export function Footer({
  isLoggedIn,
  variant,
  className,
  ...props
}: FooterProps) {
  // Determine variant preference or fallback to flag
  const effectiveLoggedIn =
    variant === "app" || variant === "logged-in"
      ? true
      : variant === "public" || variant === "logged-out"
        ? false
        : (isLoggedIn ?? TEMPORARY_IS_LOGGED_IN);

  if (effectiveLoggedIn) {
    return <AppFooter className={className} {...props} />;
  }

  return <PublicFooter className={className} {...props} />;
}

export const Footers = Footer;
export const LoggedOutFooter = PublicFooter;
export const LoggedInFooter = AppFooter;

export default Footer;
