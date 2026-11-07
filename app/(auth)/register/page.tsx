import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { RegisterFlow } from "@/components/auth/register-flow";

export const metadata: Metadata = PAGE_METADATA.register;

export default function RegisterPage() {
  return <RegisterFlow />;
}
