"use client";

import Link from "next/link";
import { Cloud, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppFooterProps } from "./types";
import { DEFAULT_APP_BOTTOM_LINKS, DEFAULT_APP_FOOTER_COLUMNS } from "./data";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
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

export default AppFooter;

