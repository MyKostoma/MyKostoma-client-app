"use client";

import type { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { DashboardLayout } from "@/components/layouts/dashboard/dashboard-layout";
import { persistor } from "@/store/index";

export interface DashboardRoutesShellProps {
  children: ReactNode;
}

/**
 * Client layout wrapper for `app/(dashboard)/layout.tsx`.
 * Wraps all dashboard/workspace routes in `<PersistGate>` and `<DashboardLayout>`.
 */
export function DashboardRoutesShell({ children }: DashboardRoutesShellProps) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <DashboardLayout>{children}</DashboardLayout>
    </PersistGate>
  );
}

