"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormField,
  Input,
  Label,
  PasswordInput,
} from "@/components/ui/form-fields";
import { AuthAltAction, AuthCard, AuthErrorAlert } from "./auth-card";
import { useAuthService } from "@/features/auth/services/authApi";
import {
  isMockAuthEnabled,
  MOCK_ACCOUNTS,
} from "@/features/auth/services/authHelpers";

export function LoginForm() {
  const { loading, handleLogin } = useAuthService();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const showMockAccounts = isMockAuthEnabled();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await handleLogin({ identifier, password });
    if (!res.ok) {
      setError(res.message);
    }
  };

  const fillMockAccount = (accountIdentifier: string, accountPassword: string) => {
    setError(null);
    setIdentifier(accountIdentifier);
    setPassword(accountPassword);
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Enter your credentials to access your account."
    >
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-6">
          <FormField id="login-identifier" label="Email or Phone">
            <Input
              id="login-identifier"
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

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password">Password</Label>
              <Link
                href="/forgot-password"
                className="mb-1.5 text-xs font-semibold text-primary hover:underline underline-offset-4"
              >
                Forgot Password?
              </Link>
            </div>
            <PasswordInput
              id="login-password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              required
            />
          </div>
        </div>

        <AuthErrorAlert message={error} />

        {showMockAccounts && (
          <div className="rounded-md border border-border bg-muted/40 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Demo Accounts (Local Mock Mode)
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {MOCK_ACCOUNTS.map((account) => (
                <Button
                  key={account.user.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    fillMockAccount(account.user.identifier, account.password)
                  }
                >
                  {account.user.role === "professional"
                    ? "Use Pro Account"
                    : "Use Consumer Account"}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          loading={loading}
          trailingIcon={<ArrowRight />}
        >
          Log In
        </Button>
      </form>

      <AuthAltAction
        text="Don't have an account?"
        linkText="Register"
        href="/register"
      />
    </AuthCard>
  );
}
