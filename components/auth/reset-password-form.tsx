"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, PasswordInput } from "@/components/ui/form-fields";
import { AuthCard, AuthErrorAlert } from "./auth-card";
import { useAuthService } from "@/features/auth/services/authApi";

export function ResetPasswordForm() {
  const { loading, handleResetPassword } = useAuthService();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const tooShort = password.length > 0 && password.length < 8;
  const mismatch = confirm.length > 0 && confirm !== password;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (tooShort || mismatch || !password) return;
    setError(null);
    const res = await handleResetPassword(password);
    if (!res.ok) {
      setError(res.message);
    }
  };

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your new security credentials below."
    >
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-6">
          <FormField
            id="reset-password"
            label="New Password"
            state={tooShort ? "error" : "default"}
            errorMessage="Must be at least 8 characters long."
          >
            <PasswordInput
              id="reset-password"
              placeholder="••••••••"
              autoComplete="new-password"
              state={tooShort ? "error" : "default"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormField>

          <FormField
            id="reset-confirm-password"
            label="Confirm New Password"
            state={mismatch ? "error" : "default"}
            errorMessage="Passwords do not match."
          >
            <PasswordInput
              id="reset-confirm-password"
              placeholder="••••••••"
              autoComplete="new-password"
              state={mismatch ? "error" : "default"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </FormField>
        </div>
        <AuthErrorAlert message={error} />
        <Button
          type="submit"
          className="w-full"
          loading={loading}
          trailingIcon={<ArrowRight />}
        >
          Reset Password
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
