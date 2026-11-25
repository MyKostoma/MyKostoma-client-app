"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Bell,
  HelpCircle,
  LayoutGrid,
  Lock,
  Trash2,
  User,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SettingsSectionId, SettingsShellProps } from "./types";

interface SettingsNavItem {
  id: SettingsSectionId;
  label: string;
  href: string;
  icon: typeof User;
  destructive?: boolean;
}

interface SettingsNavGroup {
  heading: string;
  items: SettingsNavItem[];
}

export function SettingsShell({
  activeSection,
  isProfessional,
  children,
}: SettingsShellProps) {
  const mobileNavRef = useRef<HTMLElement>(null);
  const pillRefs = useRef<
    Partial<Record<SettingsSectionId, HTMLAnchorElement | null>>
  >({});

  useEffect(() => {
    const navEl = mobileNavRef.current;
    const activeEl = pillRefs.current[activeSection];
    if (navEl && activeEl && navEl.scrollWidth > navEl.clientWidth) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeSection]);

  const groups: SettingsNavGroup[] = [
    {
      heading: "ACCOUNT SETTINGS",
      items: [
        { id: "overview", label: "Overview", href: "/settings", icon: LayoutGrid },
        { id: "profile", label: "Profile", href: "/settings/profile", icon: User },
        {
          id: "password",
          label: "Password",
          href: "/settings/password",
          icon: Lock,
        },
        {
          id: "notifications",
          label: "Notifications",
          href: "/settings/notifications",
          icon: Bell,
        },
      ],
    },
    ...(isProfessional
      ? [
          {
            heading: "PROFESSIONAL TOOLS",
            items: [
              {
                id: "verification" as const,
                label: "Verification",
                href: "/settings/verification",
                icon: HelpCircle,
              },
              {
                id: "wallet" as const,
                label: "Wallet/Payout",
                href: "/settings/wallet",
                icon: Wallet,
              },
            ],
          },
        ]
      : []),
    {
      heading: "SUPPORT",
      items: [
        {
          id: "disputes",
          label: "Disputes",
          href: "/settings/disputes",
          icon: AlertCircle,
        },
        {
          id: "delete-account",
          label: "Delete Account",
          href: "/settings/delete-account",
          icon: Trash2,
          destructive: true,
        },
      ],
    },
  ];

  const allItems = groups.flatMap((group) => group.items);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start pb-10">
      {/* Sticky Mobile Settings Pill Nav */}
      <div className="sticky top-0 z-20 w-full lg:hidden -mx-1 px-1 py-1.5">
        <nav
          ref={mobileNavRef}
          aria-label="Settings sections"
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar rounded-full border border-border bg-card/95 backdrop-blur-xs p-1 shadow-xs"
        >
          {allItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;

            return (
              <Link
                key={item.id}
                ref={(node) => {
                  pillRefs.current[item.id] = node;
                }}
                href={item.href}
                onClick={() => {
                  const navEl = mobileNavRef.current;
                  const el = pillRefs.current[item.id];
                  if (navEl && el && navEl.scrollWidth > navEl.clientWidth) {
                    el.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    });
                  }
                }}
                className={cn(
                  "shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors",
                  active
                    ? item.destructive
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-primary text-primary-foreground"
                    : item.destructive
                      ? "text-error hover:bg-error-bg/70"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                <Icon className="size-3.5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Desktop Inner Settings Sub-Navigation */}
      <aside
        aria-label="Settings navigation"
        className="hidden lg:block w-56 shrink-0 rounded-2xl border border-border bg-card p-3.5 shadow-2xs sticky top-4 space-y-5"
      >
        {groups.map((group) => (
          <div key={group.heading} className="space-y-1.5">
            <p className="px-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {group.heading}
            </p>

            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors",
                      active
                        ? item.destructive
                          ? "bg-error-bg text-error"
                          : "bg-accent text-primary"
                        : item.destructive
                          ? "text-error hover:bg-error-bg/60"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 w-full">{children}</div>
    </div>
  );
}
