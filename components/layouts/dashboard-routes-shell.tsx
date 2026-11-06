"use client";

import type { ReactNode } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export interface DashboardRoutesShellProps {
  children: ReactNode;
}

/**
 * Client layout wrapper for `app/(dashboard)/layout.tsx`.
 * Wraps all dashboard/workspace routes in the unified `<DashboardLayout>`.
 */
export function DashboardRoutesShell({ children }: DashboardRoutesShellProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

