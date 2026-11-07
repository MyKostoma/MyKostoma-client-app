"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layouts/headers";
import { Footer } from "@/components/layouts/footers";
import { DashboardLayout } from "@/components/layouts/dashboard/dashboard-layout";
import { getDashboardRouteConfig } from "@/lib/route-config";

export interface InternalRoutesShellProps {
  children: ReactNode;
}

/**
 * Client layout wrapper for `app/(internal-routes)/layout.tsx`.
 * Automatically suppresses the internal Header and Footer if the current
 * pathname is registered in `dashboardRoutes` in `lib/route-config.ts`.
 */
export function InternalRoutesShell({ children }: InternalRoutesShellProps) {
  const pathname = usePathname();
  const dashboardRoute = getDashboardRouteConfig(pathname);

  if (dashboardRoute) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-inter transition-colors">
      <div className="w-full bg-card border-b border-border/70 sticky top-0 z-40">
        <div className="container px-4 sm:px-6 lg:px-8">
          <Header
            variant="app"
            className="rounded-none border-0 shadow-none px-0 py-3.5"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">{children}</div>

      <Footer variant="app" className="mt-8" />
    </div>
  );
}

