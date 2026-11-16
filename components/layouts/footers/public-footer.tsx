"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PublicFooter2Props } from "./types";
import {
  DEFAULT_PUBLIC_FOOTER_2_COLUMNS,
  DEFAULT_PUBLIC_FOOTER_2_BOTTOM_LINKS,
} from "./data";

export function PublicFooter({
  tagline = "Your local talent, connected.",
  columns = DEFAULT_PUBLIC_FOOTER_2_COLUMNS,
  bottomLinks = DEFAULT_PUBLIC_FOOTER_2_BOTTOM_LINKS,
  copyrightYear = 2024,
  companyName = "MyKostoma",
  copyrightText,
  className,
  ...props
}: PublicFooter2Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const effectiveCopyright =
    copyrightText || `© ${copyrightYear} ${companyName}. All rights reserved.`;

  return (
    <footer
      className={cn("w-full py-6 sm:py-8 font-inter transition-colors", className)}
      {...props}
    >
      <div className="container mx-auto">
        <div className="bg-card overflow-hidden">
          {/* Top Columns Section - Desktop & Tablet */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 px-6 sm:px-8 lg:px-10 py-10 lg:py-12">
            {columns.map((column) => (
              <div key={column.title} className="space-y-4">
                <h4 className="text-[12px] lg:text-[13px] font-black tracking-wider text-foreground uppercase select-none">
                  {column.title}
                </h4>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("#") || link.isExternal ? (
                        <a
                          href={link.href}
                          onClick={link.onClick}
                          target={link.isExternal ? "_blank" : undefined}
                          rel={link.isExternal ? "noopener noreferrer" : undefined}
                          className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block leading-relaxed"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={link.onClick}
                          className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block leading-relaxed"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Top Accordion Section - Mobile */}
          <div className="md:hidden divide-y divide-border/60 px-5 py-4">
            {columns.map((column) => {
              const isOpen = Boolean(openSections[column.title]);
              return (
                <div key={column.title} className="py-1">
                  <button
                    type="button"
                    onClick={() => toggleSection(column.title)}
                    className="w-full flex items-center justify-between py-3 text-left font-black text-xs tracking-wider text-foreground uppercase cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <span>{column.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <ul className="space-y-2.5 pt-1 pb-3 pl-1 animate-in fade-in-50 duration-150">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          {link.href.startsWith("#") || link.isExternal ? (
                            <a
                              href={link.href}
                              onClick={link.onClick}
                              target={link.isExternal ? "_blank" : undefined}
                              rel={link.isExternal ? "noopener noreferrer" : undefined}
                              className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block leading-relaxed"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              onClick={link.onClick}
                              className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block leading-relaxed"
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Bar Section */}
          <div className="border-t border-border/70 px-6 sm:px-8 lg:px-10 py-5 sm:py-6">
            {/* Desktop & Tablet Bottom Bar */}
            <div className="hidden sm:flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="h-4 w-px bg-border/80" />
                <p className="italic font-medium text-muted-foreground">
                  &ldquo;{tagline}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-6">
                <p>{effectiveCopyright}</p>
              </div>
            </div>

            {/* Mobile Bottom Bar (Image 3) */}
            <div className="sm:hidden flex flex-col items-center justify-center text-center space-y-3.5 pt-2 pb-1 text-xs text-muted-foreground">
              <p className="italic font-medium text-muted-foreground">
                {tagline}
              </p>

              {bottomLinks && bottomLinks.length > 0 && (
                <div className="flex items-center justify-center gap-5 pt-1">
                  {bottomLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={link.onClick}
                      className="text-muted-foreground hover:text-primary transition-colors font-medium text-xs"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              <p className="text-[11px] pt-1">
                © {copyrightYear} {companyName} Inc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const publicFooter = PublicFooter;
export default PublicFooter;

