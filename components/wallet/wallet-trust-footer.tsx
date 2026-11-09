"use client";

import { DashboardFooter } from "@/components/layouts/footers/dashboard-footer";
import type { WalletTrustFooterProps } from "./types";

export function WalletTrustFooter(props: WalletTrustFooterProps) {
  return <DashboardFooter {...props} />;
}
