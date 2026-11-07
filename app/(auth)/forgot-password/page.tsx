import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = PAGE_METADATA.forgotPassword;

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
