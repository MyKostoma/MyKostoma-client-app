import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = PAGE_METADATA.login;

export default function LoginPage() {
  return <LoginForm />;
}
