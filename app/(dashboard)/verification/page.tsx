import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { VerificationOverviewView } from "@/features/verification/verification-overview-view";
import { VerificationOverviewPageSkeleton } from "@/skeletons/(dashboard)/verification/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.verificationOverview;

export default function VerificationOverviewPage() {
  return (
    <Suspense fallback={<VerificationOverviewPageSkeleton />}>
      <VerificationOverviewView />
    </Suspense>
  );
}
