"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Input } from "@/components/ui/form-fields";
import { AuthCard } from "./auth-card";
import { mockSendResetCode } from "./mock-handlers";
import { useAppDispatch } from "@/store/hooks";
import { setPendingVerification } from "@/store/slices/authSlice";

export function ForgotPasswordForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [identifier, setIdentifier] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await mockSendResetCode(identifier);
    setLoading(false);
    if (res.ok) {
      dispatch(
        setPendingVerification({
          identifier,
          role: "consumer",
          flow: "reset-password",
        })
      );
      router.push("/reset-password");
    }
  };

  return (
    <AuthCard
      title="Forgot Password?"
      subtitle="Enter your registered email or phone number to reset your password."
    >
      <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
        <FormField id="forgot-identifier" label="Email or Phone">
          <Input
            id="forgot-identifier"
            placeholder="Enter email or phone"
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </FormField>

        <Button type="submit" className="w-full" loading={loading} trailingIcon={<Send />}>
          Send Reset Code
        </Button>
      </form>

      <div className="mt-4 flex justify-center">
        <Button asChild variant="link" size="sm">
          <Link href="/login">Back to Login</Link>
        </Button>
      </div>
    </AuthCard>
  );
}
