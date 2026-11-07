import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export const metadata: Metadata = PAGE_METADATA.dashboard;

export default function DashboardPage() {
  return <DashboardView />;
}
