import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { CompanyVerificationStatusView } from "@/features/verification/company-verification-status-view";
import { CompanyVerificationStatusPageSkeleton } from "@/skeletons/(dashboard)/verification/company/status/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.companyVerificationStatus;

export default function CompanyVerificationStatusPage() {
  return (
    <Suspense fallback={<CompanyVerificationStatusPageSkeleton />}>
      <CompanyVerificationStatusView />
    </Suspense>
  );
}
