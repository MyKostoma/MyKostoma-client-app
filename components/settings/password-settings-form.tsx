"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Input } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { PasswordSettingsFormProps } from "./types";

export function PasswordSettingsForm({
  currentPassword,
  newPassword,
  confirmPassword,
  showCurrent,
  showNew,
  showConfirm,
  strength,
  currentError,
  newError,
  confirmError,
  isSaving = false,
  onCurrentChange,
  onNewChange,
  onConfirmChange,
  onToggleShowCurrent,
  onToggleShowNew,
  onToggleShowConfirm,
  onForgotPassword,
  onCancel,
  onSubmit,
}: PasswordSettingsFormProps) {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const requirements = [
    { label: "Minimum 8 characters long", met: strength.hasMinLength },
    { label: "Include at least one number", met: strength.hasNumber },
    { label: "Include at least one special character", met: strength.hasSpecial },
  ];

  const getSegmentClass = (index: number) => {
    if (strength.score === 0 || index > strength.score) return "bg-border";
    if (strength.level === "weak") return "bg-error";
    if (strength.level === "fair") return "bg-warning";
    return "bg-success";
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Breadcrumb & Heading */}
      <div className="space-y-1.5">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link href="/settings" className="hover:text-foreground">
            Settings
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="font-semibold text-foreground">Password</span>
        </nav>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Change Password
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Please ensure your password is secure and at least 8 characters long.
        </p>
      </div>

      {/* Security Credentials Split */}
      <div className="pt-4 border-t border-border/80 grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        <div className="md:col-span-4 space-y-1">
          <h3 className="text-sm font-bold text-foreground">
            Security Credentials
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Update your password regularly to maintain account security.
          </p>
        </div>

        <div className="md:col-span-8 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-5">
          {/* Current Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="settings-current-password"
                className="text-xs font-semibold text-foreground"
              >
                Current Password
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs font-semibold text-primary hover:underline underline-offset-4 cursor-pointer"
              >
                Forgot your password?
              </button>
            </div>

            <div className="relative">
              <Input
                id="settings-current-password"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => onCurrentChange(e.target.value)}
                placeholder="Enter current password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={onToggleShowCurrent}
                aria-label={showCurrent ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showCurrent ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {currentError && (
              <p className="text-xs font-medium text-error">{currentError}</p>
            )}
          </div>

          <div className="border-t border-border/80 pt-4 space-y-4">
            {/* New Password + Strength */}
            <FormField
              id="settings-new-password"
              label="New Password"
              state={newError ? "error" : "default"}
              errorMessage={newError}
            >
              <div className="relative">
                <Input
                  id="settings-new-password"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => onNewChange(e.target.value)}
                  placeholder="Enter new password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={onToggleShowNew}
                  aria-label={showNew ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {showNew ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <div className="flex-1 grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((segment) => (
                    <span
                      key={segment}
                      className={cn(
                        "h-1 rounded-full transition-colors",
                        getSegmentClass(segment)
                      )}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-muted-foreground shrink-0">
                  Strength: {strength.label}
                </span>
              </div>
            </FormField>

            {/* Confirm New Password */}
            <FormField
              id="settings-confirm-password"
              label="Confirm New Password"
              state={confirmError ? "error" : "default"}
              errorMessage={confirmError}
            >
              <div className="relative">
                <Input
                  id="settings-confirm-password"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => onConfirmChange(e.target.value)}
                  placeholder="Confirm new password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={onToggleShowConfirm}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {showConfirm ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </FormField>

            {/* Password Requirements Checklist */}
            <div className="rounded-xl border border-border bg-secondary/45 p-4 space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-foreground">
                PASSWORD REQUIREMENTS:
              </p>
              <ul className="space-y-1.5">
                {requirements.map((req) => (
                  <li
                    key={req.label}
                    className={cn(
                      "flex items-center gap-2 text-xs transition-colors",
                      req.met ? "text-success font-medium" : "text-muted-foreground"
                    )}
                  >
                    <CheckCircle2 className="size-3.5 shrink-0" />
                    <span>{req.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-border/80 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="h-9 px-5 rounded-lg text-xs font-semibold"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="default"
          size="sm"
          loading={isSaving}
          loadingText="Updating..."
          className="h-9 px-5 rounded-lg text-xs font-bold shadow-xs"
        >
          Update Password
        </Button>
      </div>
    </form>
  );
}
