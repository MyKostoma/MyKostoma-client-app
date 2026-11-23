import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { VerificationSubmitView } from "@/features/verification/verification-submit-view";
import { VerificationSubmitPageSkeleton } from "@/skeletons/(dashboard)/verification/submit/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.verificationSubmit;

export default function VerificationSubmitPage() {
  return (
    <Suspense fallback={<VerificationSubmitPageSkeleton />}>
      <VerificationSubmitView />
    </Suspense>
  );
}
