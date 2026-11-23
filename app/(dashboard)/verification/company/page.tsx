import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { CompanyVerificationOverviewView } from "@/features/verification/company-verification-overview-view";
import { CompanyVerificationOverviewPageSkeleton } from "@/skeletons/(dashboard)/verification/company/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.companyVerificationOverview;

export default function CompanyVerificationOverviewPage() {
  return (
    <Suspense fallback={<CompanyVerificationOverviewPageSkeleton />}>
      <CompanyVerificationOverviewView />
    </Suspense>
  );
}
