"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PublicFooterProps } from "./types";
import { DEFAULT_PUBLIC_FOOTER_COLUMNS, DEFAULT_PUBLIC_SOCIALS } from "./data";

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

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs sm:max-w-sm pt-1">
              {tagline}
            </p>

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
                      className="text-foreground/60 hover:text-primary transition-colors p-0.5"
                    >
                      <Icon className="size-4.5" />
                    </a>
                  );
                })}
              </div>
            )}
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
                        className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
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

export default PublicFooter;

