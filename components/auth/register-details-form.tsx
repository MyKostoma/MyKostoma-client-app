"use client";

import * as React from "react";
import { Briefcase, ChevronLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Input, PasswordInput } from "@/components/ui/form-fields";
import { AuthAltAction, AuthCard } from "./auth-card";

export type Role = "consumer" | "professional";

export interface RegisterDetails {
  fullName: string;
  identifier: string;
  password: string;
}

export const ROLE_META: Record<
  Role,
  {
    label: string;
    icon: typeof User;
    title: string;
    subtitle: string;
    namePlaceholder: string;
    identifierPlaceholder: string;
  }
> = {
  consumer: {
    label: "Consumer",
    icon: User,
    title: "Register as a Consumer",
    subtitle: "Join to find and hire top professionals for your needs.",
    namePlaceholder: "John Doe",
    identifierPlaceholder: "name@example.com",
  },
  professional: {
    label: "Professional",
    icon: Briefcase,
    title: "Register as a Professional",
    subtitle: "Join to offer your services and grow your business.",
    namePlaceholder: "Jane Smith",
    identifierPlaceholder: "jane@business.com",
  },
};

export interface RegisterDetailsFormProps {
  role: Role;
  values: RegisterDetails;
  onChange: (values: RegisterDetails) => void;
  onSubmit: () => void;
  /** Optional: shows a "Back to Role Selection" link when provided. */
  onBack?: () => void;
  loading?: boolean;
}

const labelStyle = "[&_label]:uppercase [&_label]:text-muted-foreground [&_label]:tracking-wide";

export function RegisterDetailsForm({
  role,
  values,
  onChange,
  onSubmit,
  onBack,
  loading,
}: RegisterDetailsFormProps) {
  const meta = ROLE_META[role];
  const RoleIcon = meta.icon;
  const set = (key: keyof RegisterDetails) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...values, [key]: e.target.value });

  const passwordError = values.password.length > 0 && values.password.length < 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (values.password.length < 8) return;
    onSubmit();
  };

  return (
    <AuthCard title={meta.title} subtitle={meta.subtitle}>
      <div className="-mt-3 mb-6 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
          <RoleIcon className="size-3" aria-hidden />
          Role: {meta.label}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField id="register-name" label="Full Name" className={labelStyle}>
          <Input
            id="register-name"
            placeholder={meta.namePlaceholder}
            autoComplete="name"
            value={values.fullName}
            onChange={set("fullName")}
            required
          />
        </FormField>

        <FormField id="register-identifier" label="Email or Phone" className={labelStyle}>
          <Input
            id="register-identifier"
            placeholder={meta.identifierPlaceholder}
            autoComplete="username"
            value={values.identifier}
            onChange={set("identifier")}
            required
          />
        </FormField>

        <FormField
          id="register-password"
          label="Password"
          className={labelStyle}
          state={passwordError ? "error" : "default"}
          helperText="Must be at least 8 characters long."
          errorMessage="Must be at least 8 characters long."
        >
          <PasswordInput
            id="register-password"
            placeholder="••••••••"
            autoComplete="new-password"
            state={passwordError ? "error" : "default"}
            value={values.password}
            onChange={set("password")}
            required
          />
        </FormField>

        <Button type="submit" className="w-full" loading={loading}>
          Continue
        </Button>
      </form>

      {onBack && (
        <div className="mt-3 flex justify-center">
          <Button
            type="button"
            variant="link"
            size="sm"
            leadingIcon={<ChevronLeft />}
            onClick={onBack}
            disabled={loading}
          >
            Back to Role Selection
          </Button>
        </div>
      )}

      <AuthAltAction text="Already have an account?" linkText="Log In" href="/login" />

      {role === "professional" && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          By registering, you agree to our{" "}
          <a href="#" className="underline underline-offset-2 hover:text-foreground">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-2 hover:text-foreground">
            Privacy Policy
          </a>{" "}
          regarding professional services.
        </p>
      )}
    </AuthCard>
  );
}
