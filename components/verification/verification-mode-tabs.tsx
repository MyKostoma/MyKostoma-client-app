"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Building2, IdCard } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  VerificationModeTab,
  VerificationModeTabsProps,
  VerificationStatus,
} from "./types";

interface TabItemConfig {
  id: VerificationModeTab;
  label: string;
  href: string;
  status: VerificationStatus;
  verifiedDotActiveClass: string;
  verifiedDotInactiveClass: string;
  icon: typeof IdCard;
}

export function VerificationModeTabs({
  activeTab,
  individualStatus,
  companyStatus,
}: VerificationModeTabsProps) {
  const tabRefs = useRef<Record<VerificationModeTab, HTMLAnchorElement | null>>({
    individual: null,
    company: null,
  });

  useEffect(() => {
    const activeNode = tabRefs.current[activeTab];
    if (activeNode) {
      activeNode.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  const tabs: readonly TabItemConfig[] = [
    {
      id: "individual",
      label: "Individual Verification",
      href: "/verification",
      status: individualStatus,
      verifiedDotActiveClass: "bg-primary-foreground sm:bg-warning",
      verifiedDotInactiveClass: "bg-warning",
      icon: IdCard,
    },
    {
      id: "company",
      label: "Company Verification",
      href: "/verification/company",
      status: companyStatus,
      verifiedDotActiveClass: "bg-primary-foreground sm:bg-info",
      verifiedDotInactiveClass: "bg-info",
      icon: Building2,
    },
  ];

  return (
    <div className="sticky top-2 z-10 sm:static bg-card/95 backdrop-blur-xs sm:bg-transparent border border-border sm:border-0 sm:border-b sm:border-border rounded-full sm:rounded-none p-1 sm:p-0 shadow-2xs sm:shadow-none">
      <nav
        aria-label="Verification category navigation"
        className="flex items-center gap-1 sm:gap-6 overflow-x-auto no-scrollbar"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              onClick={(e) => {
                e.currentTarget.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                });
              }}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-full sm:rounded-none px-4 py-2 sm:px-1 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all border-b-0 sm:border-b-2",
                isActive
                  ? "bg-primary text-primary-foreground sm:bg-transparent sm:text-foreground sm:border-primary shadow-2xs sm:shadow-none"
                  : "text-muted-foreground hover:text-foreground sm:border-transparent"
              )}
            >
              <Icon className="size-3.5 sm:size-4 shrink-0" />
              <span>{tab.label}</span>
              {tab.status === "verified" && (
                <span
                  aria-label="Verified"
                  className={cn(
                    "size-2 rounded-full shrink-0",
                    isActive
                      ? tab.verifiedDotActiveClass
                      : tab.verifiedDotInactiveClass
                  )}
                />
              )}
              {tab.status === "pending" && (
                <span
                  aria-label="Pending review"
                  className="size-2 rounded-full bg-info/60 shrink-0"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
