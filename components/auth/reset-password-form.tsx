"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, PasswordInput } from "@/components/ui/form-fields";
import { AuthCard } from "./auth-card";
import { mockResetPassword } from "./mock-handlers";
import { useAppDispatch } from "@/store/hooks";
import { clearPendingVerification } from "@/store/slices/authSlice";

export function ResetPasswordForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const tooShort = password.length > 0 && password.length < 8;
  const mismatch = confirm.length > 0 && confirm !== password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tooShort || mismatch || !password) return;
    setLoading(true);
    const res = await mockResetPassword(password);
    setLoading(false);
    if (res.ok) {
      dispatch(clearPendingVerification());
      router.push("/login");
    }
  };

  return (
    <AuthCard title="Reset your password" subtitle="Enter your new security credentials below.">
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
        <Button type="submit" className="w-full" loading={loading} trailingIcon={<ArrowRight />}>
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
