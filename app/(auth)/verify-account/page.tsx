import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { VerifyAccountForm } from "@/components/auth/verify-account-form";
import { VerifyAccountPageSkeleton } from "@/skeletons/(auth)/verify-account/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.verifyAccount;

export default function VerifyAccountPage() {
  return (
    <Suspense fallback={<VerifyAccountPageSkeleton />}>
      <VerifyAccountForm />
    </Suspense>
  );
}
