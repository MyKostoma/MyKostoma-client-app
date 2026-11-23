import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { CompanyVerificationSubmitView } from "@/features/verification/company-verification-submit-view";
import { CompanyVerificationSubmitPageSkeleton } from "@/skeletons/(dashboard)/verification/company/submit/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.companyVerificationSubmit;

export default function CompanyVerificationSubmitPage() {
  return (
    <Suspense fallback={<CompanyVerificationSubmitPageSkeleton />}>
      <CompanyVerificationSubmitView />
    </Suspense>
  );
}
