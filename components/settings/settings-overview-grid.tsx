"use client";

import {
  Award,
  CreditCard,
  Scale,
  ShieldCheck,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SettingsOverviewGridProps } from "./types";

export function SettingsOverviewGrid({
  isProfessional,
  verificationPercent,
  isVerified,
  walletBalanceFormatted,
  openDisputesCount,
  onNavigate,
}: SettingsOverviewGridProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Settings Overview
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {isProfessional
            ? "Manage your professional profile, security, verification, and payout preferences."
            : "Manage your personal profile, security, notification preferences, and support tools."}
        </p>
      </div>

      {/* 2-Column Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Personal Information */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="size-9 rounded-lg bg-secondary text-foreground flex items-center justify-center">
              <CreditCard className="size-4" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Personal Information
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isProfessional
                  ? "Update your name, bio, and contact details visible to clients."
                  : "Update your name, contact details, location, and account photo."}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onNavigate("/settings/profile")}
            className="w-full h-9 rounded-lg text-xs font-bold"
          >
            Manage Profile
          </Button>
        </div>

        {/* Security & Access */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="size-9 rounded-lg bg-secondary text-foreground flex items-center justify-center">
              <ShieldCheck className="size-4" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Security &amp; Access
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Change your password and manage account protection credentials.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onNavigate("/settings/password")}
            className="w-full h-9 rounded-lg text-xs font-bold"
          >
            Manage Security
          </Button>
        </div>

        {/* Professional Verification (Professionals Only) */}
        {isProfessional && (
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="size-9 rounded-lg bg-secondary text-foreground flex items-center justify-center">
                  <Award className="size-4" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-extrabold uppercase tracking-wider">
                  PROFESSIONAL
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  Professional Verification
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Submit documents to verify your expertise and earn a trust
                  badge.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      isVerified ? "bg-success" : "bg-primary"
                    )}
                    style={{ width: `${verificationPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-foreground shrink-0">
                  {verificationPercent}% Complete
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => onNavigate("/settings/verification")}
              className="w-full h-9 rounded-lg text-xs font-bold shadow-xs"
            >
              {isVerified ? "View Verification" : "Continue Verification"}
            </Button>
          </div>
        )}

        {/* Wallet & Payouts (Pro) OR Wallet & Balance (Consumer) */}
        {isProfessional ? (
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="size-9 rounded-lg bg-secondary text-foreground flex items-center justify-center">
                  <Wallet className="size-4" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[9px] font-extrabold uppercase tracking-wider">
                  PROFESSIONAL
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  Wallet &amp; Payouts
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Manage your earnings, linked bank accounts, and payout
                  schedules.
                </p>
              </div>

              <div className="pt-0.5">
                <p className="text-[11px] text-muted-foreground">
                  Available Balance
                </p>
                <p className="text-lg font-extrabold text-foreground tracking-tight">
                  {walletBalanceFormatted}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onNavigate("/settings/wallet")}
              className="w-full h-9 rounded-lg text-xs font-bold"
            >
              Configure Payouts
            </Button>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="size-9 rounded-lg bg-secondary text-foreground flex items-center justify-center">
                <Wallet className="size-4" />
              </div>

              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  Wallet &amp; Escrow Balance
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Fund your wallet for fast bookings and track escrow payments.
                </p>
              </div>

              <div className="pt-0.5">
                <p className="text-[11px] text-muted-foreground">
                  Available Balance
                </p>
                <p className="text-lg font-extrabold text-foreground tracking-tight">
                  {walletBalanceFormatted}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onNavigate("/wallet")}
              className="w-full h-9 rounded-lg text-xs font-bold"
            >
              Open My Wallet
            </Button>
          </div>
        )}

        {/* Preferences / Notifications */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="size-9 rounded-lg bg-secondary text-foreground flex items-center justify-center">
              <SlidersHorizontal className="size-4" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Preferences
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Set up email, push, and SMS notification alerts for orders and
                messages.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onNavigate("/settings/notifications")}
            className="w-full h-9 rounded-lg text-xs font-bold"
          >
            Manage Notifications
          </Button>
        </div>

        {/* Conflict Resolution / Disputes */}
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="size-9 rounded-lg bg-secondary text-foreground flex items-center justify-center">
                <Scale className="size-4" />
              </div>
              {openDisputesCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-warning-bg text-warning text-[10px] font-bold">
                  {openDisputesCount} Active
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Conflict Resolution
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Review ongoing disputes or contact our support team for help.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onNavigate("/settings/disputes")}
            className="w-full h-9 rounded-lg text-xs font-bold"
          >
            View Disputes
          </Button>
        </div>
      </div>

      {/* Bottom Deactivate Account Danger Banner */}
      <div className="rounded-2xl border border-error/25 bg-error-bg/60 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-foreground">
            Deactivate Account
          </h3>
          <p className="text-xs text-muted-foreground">
            Temporarily hide your profile or permanently delete your account
            data.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onNavigate("/settings/delete-account")}
          className="h-9 px-4 rounded-lg text-xs font-bold border-error/40 bg-card text-error hover:bg-error-bg hover:text-error shrink-0"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}
