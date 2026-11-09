import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { ForgotPasswordPageSkeleton } from "@/skeletons/(auth)/forgot-password/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.forgotPassword;

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<ForgotPasswordPageSkeleton />}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
