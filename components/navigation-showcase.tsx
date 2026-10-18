"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { AppHeader } from "@/components/ui/app-header";
import {
  ConsumerSidebar,
  ProfessionalSidebar,
  type NavItemConfig,
} from "@/components/ui/sidebar-nav";
import {
  ConsumerMobileNav,
  ProfessionalMobileNav,
} from "@/components/ui/mobile-bottom-nav";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  Home,
  Search,
  Calendar,
  Heart,
  Settings,
  PieChart,
  ListOrdered,
  Store,
  Film,
  Wallet,
} from "lucide-react";
import { cn } from "cn";

// Nav items defined at parent level to keep SidebarNav reusable as a template
const consumerNavItems: NavItemConfig[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "find-pros", label: "Find Pros", icon: Search },
  { id: "my-bookings", label: "My Bookings", icon: Calendar },
  { id: "saved-items", label: "Saved Items", icon: Heart, badge: 12, badgeVariant: "primary" },
  { id: "settings", label: "Settings", icon: Settings },
];

const professionalNavItems: NavItemConfig[] = [
  { id: "overview", label: "Overview", icon: PieChart },
  { id: "requests", label: "Requests", icon: ListOrdered, badge: 12, badgeVariant: "primary" },
  { id: "my-shop", label: "My Shop", icon: Store },
  { id: "reels-console", label: "Reels Console", icon: Film },
  { id: "earnings", label: "Earnings", icon: Wallet, isDividerBefore: true },
];

export function NavigationShowcase() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Interactive states
  const [consumerSidebarActive, setConsumerSidebarActive] = useState("dashboard");
  const [proSidebarActive, setProSidebarActive] = useState("overview");
  const [consumerTab, setConsumerTab] = useState<
    "home" | "search" | "requests" | "messages" | "profile"
  >("home");
  const [proTab, setProTab] = useState<
    "requests" | "shop" | "reels" | "messages" | "settings"
  >("requests");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
          setIsDark(true);
        } else {
          document.documentElement.classList.remove("dark");
          setIsDark(false);
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {}
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {}
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-10 space-y-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          {/* Identity Tag */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border/70 bg-card text-foreground shadow-2xs mb-3">
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="8" height="8" rx="2" fill="#E8175C" />
              <rect x="13" y="3" width="8" height="8" rx="2" fill="#E86040" />
              <rect x="3" y="13" width="8" height="8" rx="2" fill="#3B82F6" />
              <circle cx="17" cy="17" r="4" fill="#22C55E" />
            </svg>
            <span className="text-xs font-semibold tracking-tight">identity</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            MyKostoma{" "}
            <span className="text-primary transition-colors">Navigation System</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Core navigational components and layout patterns for web and mobile.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground border border-border/80">
            V1.0.0
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            aria-label={
              mounted && isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            leadingIcon={
              mounted && isDark ? (
                <Sun className="size-4 text-warning" />
              ) : (
                <Moon className="size-4 text-foreground" />
              )
            }
            className="transition-colors shadow-2xs"
          >
            {mounted && isDark ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-primary rounded-full inline-block transition-colors" />
          01 Main App Header
        </h2>

        <div>
          <AppHeader />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-primary rounded-full inline-block transition-colors" />
          02 Sidebar Navigation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    CONSUMER PERSPECTIVE
                  </span>
                  <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold tracking-wide uppercase bg-success/15 text-success">
                      ACTIVE
                  </span>
                </div>
            <ConsumerSidebar
              items={consumerNavItems}
              activeItemId={consumerSidebarActive}
              onItemSelect={setConsumerSidebarActive}
            />
          </div>
          </div>


          <div>
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  PROFESSIONAL PERSPECTIVE
                </span>
                <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold tracking-wide uppercase bg-secondary text-muted-foreground">
                  WORKSPACE
                </span>
              </div>
            <ProfessionalSidebar
              items={professionalNavItems}
              activeItemId={proSidebarActive}
              onItemSelect={setProSidebarActive}
            />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-primary rounded-full inline-block transition-colors" />
          03 Mobile Bottom Navigation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Consumer Mobile App */}
          <div className="pt-2">
            <div className="space-y-3">
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                CONSUMER APP
              </span>
              <ConsumerMobileNav
                activeTab={consumerTab}
                onTabChange={setConsumerTab}
              />
            </div>
          </div>

          <div className="pt-2">
            <div className="space-y-3">
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                PROFESSIONAL APP
              </span>
              <ProfessionalMobileNav
                activeTab={proTab}
                onTabChange={setProTab}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-primary rounded-full inline-block transition-colors" />
          04 Secondary Navigation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
              BREADCRUMBS
            </span>
            <div className="p-2">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#home">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#professionals">
                      Professionals
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Interior Designers</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          <div className="space-y-3">
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
              PAGINATION
            </span>
            <div className="p-1">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink
                      isActive={currentPage === 1}
                      onClick={() => setCurrentPage(1)}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink
                      isActive={currentPage === 2}
                      onClick={() => setCurrentPage(2)}
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink
                      isActive={currentPage === 3}
                      onClick={() => setCurrentPage(3)}
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink
                      isActive={currentPage === 12}
                      onClick={() => setCurrentPage(12)}
                    >
                      12
                    </PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(12, p + 1))}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
