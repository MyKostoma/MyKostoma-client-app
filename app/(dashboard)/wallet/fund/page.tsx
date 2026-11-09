import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { WalletFundView } from "@/features/wallet/wallet-fund-view";
import type { WalletFundingStep } from "@/features/wallet/types";
import { WalletFundPageSkeleton } from "@/skeletons/(dashboard)/wallet/fund/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.walletFund;

interface WalletFundPageProps {
  searchParams: Promise<{ step?: string; amount?: string }>;
}

export default async function WalletFundPage({
  searchParams,
}: WalletFundPageProps) {
  const { step, amount } = await searchParams;
  const initialStep: WalletFundingStep =
    step === "transfer" || step === "transfer-instructions"
      ? "transfer-instructions"
      : "amount-method";
  const initialAmount = amount ? Number(amount) : undefined;

  return (
    <Suspense fallback={<WalletFundPageSkeleton />}>
      <WalletFundView
        initialStep={initialStep}
        initialAmount={
          initialAmount && Number.isFinite(initialAmount)
            ? initialAmount
            : undefined
        }
      />
    </Suspense>
  );
}

