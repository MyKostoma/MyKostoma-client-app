import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { VerificationStatusView } from "@/features/verification/verification-status-view";
import { VerificationStatusPageSkeleton } from "@/skeletons/(dashboard)/verification/status/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.verificationStatus;

export default function VerificationStatusPage() {
  return (
    <Suspense fallback={<VerificationStatusPageSkeleton />}>
      <VerificationStatusView />
    </Suspense>
  );
}
