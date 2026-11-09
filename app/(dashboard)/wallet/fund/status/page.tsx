import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { WalletFundingStatusView } from "@/features/wallet/wallet-funding-status-view";
import type { WalletFundingStatusState } from "@/features/wallet/types";
import { WalletFundingStatusPageSkeleton } from "@/skeletons/(dashboard)/wallet/fund/status/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.walletFundingStatus;

interface WalletFundingStatusPageProps {
  searchParams: Promise<{ status?: string; ref?: string; amount?: string }>;
}

export default async function WalletFundingStatusPage({
  searchParams,
}: WalletFundingStatusPageProps) {
  const { status, ref, amount } = await searchParams;
  const initialStatus: WalletFundingStatusState | undefined =
    status === "pending" || status === "success" || status === "failed"
      ? status
      : undefined;
  const parsedAmount = amount ? Number(amount) : undefined;

  return (
    <Suspense fallback={<WalletFundingStatusPageSkeleton />}>
      <WalletFundingStatusView
        initialStatus={initialStatus}
        initialReference={ref}
        initialAmount={
          parsedAmount && Number.isFinite(parsedAmount)
            ? parsedAmount
            : undefined
        }
      />
    </Suspense>
  );
}

