import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { VerifyAccountForm } from "@/components/auth/verify-account-form";

export const metadata: Metadata = PAGE_METADATA.verifyAccount;

export default function VerifyAccountPage() {
  return <VerifyAccountForm />;
}
