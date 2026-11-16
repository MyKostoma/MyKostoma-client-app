import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { DashboardPageSkeleton } from "@/skeletons/(dashboard)/dashboard/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.dashboard;

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardPageSkeleton />}>
      <DashboardView />
    </Suspense>
  );
}
