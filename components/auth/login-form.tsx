"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Input, Label, PasswordInput } from "@/components/ui/form-fields";
import { AuthAltAction, AuthCard } from "./auth-card";
import { mockLogin } from "./mock-handlers";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { setActivePerspective } from "@/store/slices/uiSlice";
import { getRedirectAfterLogin, setAuthCookies } from "@/lib/cookies";
import { getDefaultDashboard } from "@/lib/default-dashboard";
import type { UserRole } from "@/types/user";

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await mockLogin({ identifier, password });
    setLoading(false);
    if (res.ok) {
      const inferredRole: UserRole = identifier
        .toLowerCase()
        .includes("pro")
        ? "professional"
        : "consumer";
      const mockAccessToken = `mk_access_${Date.now()}`;
      const mockRefreshToken = `mk_refresh_${Date.now()}`;

      dispatch(
        setCredentials({
          user: {
            id: `usr_${Date.now()}`,
            fullName: identifier.split("@")[0] || "Alex Morgan",
            identifier,
            role: inferredRole,
            roles: [inferredRole],
            verified: true,
            active: true,
          },
          tokens: {
            accessToken: mockAccessToken,
            refreshToken: mockRefreshToken,
          },
        })
      );
      dispatch(setActivePerspective(inferredRole));
      setAuthCookies(mockAccessToken, mockRefreshToken, inferredRole);

      const redirectPath =
        getRedirectAfterLogin() ?? getDefaultDashboard(inferredRole);
      router.push(redirectPath);
    }
  };

  return (
    <AuthCard title="Welcome back" subtitle="Enter your credentials to access your account.">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-6">
        <FormField id="login-identifier" label="Email or Phone">
          <Input
            id="login-identifier"
            placeholder="Enter email or phone"
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        </div>
        <Button type="submit" className="w-full" loading={loading} trailingIcon={<ArrowRight />}>
          Log In
        </Button>
      </form>

      <AuthAltAction text="Don't have an account?" linkText="Register" href="/register" />
    </AuthCard>
  );
}
