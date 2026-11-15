"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Input } from "@/components/ui/form-fields";
import { AuthCard, AuthErrorAlert } from "./auth-card";
import { useAuthService } from "@/features/auth/services/authApi";

export function ForgotPasswordForm() {
  const { loading, handleForgotPassword } = useAuthService();
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await handleForgotPassword(identifier);
    if (!res.ok) {
      setError(res.message);
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
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (error) setError(null);
            }}
            required
          />
        </FormField>

        <AuthErrorAlert message={error} />

        <Button
          type="submit"
          className="w-full"
          loading={loading}
          trailingIcon={<Send />}
        >
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
