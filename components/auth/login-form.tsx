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
import { AuthAltAction, AuthCard } from "./auth-card";
import { useAuthService } from "@/features/auth/services/authApi";

export function LoginForm() {
  const { loading, handleLogin } = useAuthService();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleLogin({ identifier, password });
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
