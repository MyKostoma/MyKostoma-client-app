import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { RegisterFlow } from "@/components/auth/register-flow";
import { RegisterPageSkeleton } from "@/skeletons/(auth)/register/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.register;

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterPageSkeleton />}>
      <RegisterFlow />
    </Suspense>
  );
}
