import type { Metadata } from "next";
import { DashboardRoutesShell } from "@/components/layouts/dashboard/dashboard-routes-shell";

export const metadata: Metadata = {
  title: "Dashboard | MyKostoma",
  description: "Manage your bookings, requests, and workspace on MyKostoma.",
};

export const instant = false;

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardRoutesShell>{children}</DashboardRoutesShell>;
}

