import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { LoginForm } from "@/components/auth/login-form";
import { LoginPageSkeleton } from "@/skeletons/(auth)/login/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.login;

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}
