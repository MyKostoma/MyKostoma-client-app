import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { ResetPasswordPageSkeleton } from "@/skeletons/(auth)/reset-password/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.resetPassword;

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordPageSkeleton />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
