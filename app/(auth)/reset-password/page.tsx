import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = PAGE_METADATA.resetPassword;

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
