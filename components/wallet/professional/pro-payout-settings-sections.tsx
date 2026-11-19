"use client";

import { Bell, Landmark, Plus, Shield, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type {
  ProPayoutSchedule,
  ProPayoutSettingsSectionsProps,
} from "../types";

const SCHEDULE_OPTIONS: {
  id: ProPayoutSchedule;
  title: string;
  description: string;
  recommended?: boolean;
}[] = [
  {
    id: "daily",
    title: "Daily Payouts",
    description: "Earnings are sent to your bank account every business day.",
    recommended: true,
  },
  {
    id: "weekly",
    title: "Weekly Payouts",
    description: "Earnings are sent every Friday.",
  },
  {
    id: "monthly",
    title: "Monthly Payouts",
    description: "Earnings are sent on the last business day of the month.",
  },
];

export function ProPayoutSettingsSections({
  settings,
  bankAccounts,
  onAddBankAccount,
  onSelectSchedule,
  onEditBankAccount,
  onRequestDeleteBankAccount,
  onSetPrimaryBankAccount,
  onTogglePayoutAlerts,
  onToggleRequire2FA,
  onConfigure2FA,
  onContactSupport,
  className,
}: ProPayoutSettingsSectionsProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Payout Settings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage how you receive your earnings and connection status.
          </p>
        </div>

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onAddBankAccount}
          leadingIcon={<Plus className="size-4" />}
          className="h-10 px-4 rounded-xl text-xs font-bold shadow-xs self-start sm:self-auto"
        >
          Add New Bank Account
        </Button>
      </div>

      {/* Payout Schedule Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-2xs space-y-4">
        <div className="space-y-0.5">
          <h2 className="text-sm sm:text-base font-extrabold text-foreground">
            Payout Schedule
          </h2>
          <p className="text-xs text-muted-foreground">
            Choose how frequently you&apos;d like to receive your payouts.
          </p>
        </div>

        <div className="space-y-3">
          {SCHEDULE_OPTIONS.map((option) => {
            const isSelected = settings.schedule === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectSchedule(option.id)}
                className={cn(
                  "w-full rounded-xl border p-4 text-left flex items-center justify-between gap-4 transition-all cursor-pointer",
                  isSelected
                    ? "border-primary/40 bg-card shadow-2xs ring-1 ring-primary/15"
                    : "border-border bg-card hover:bg-secondary/35"
                )}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <span
                    className={cn(
                      "mt-0.5 size-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                      isSelected ? "border-primary" : "border-input"
                    )}
                  >
                    {isSelected && (
                      <span className="size-2 rounded-full bg-primary" />
                    )}
                  </span>

                  <div className="space-y-0.5">
                    <p className="text-xs sm:text-sm font-bold text-foreground">
                      {option.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>

                {option.recommended && (
                  <span className="px-2.5 py-0.5 rounded-md bg-success-bg text-success text-[10px] font-bold uppercase tracking-wider shrink-0">
                    RECOMMENDED
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Connected Bank Accounts */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          CONNECTED BANK ACCOUNTS
        </p>

        {bankAccounts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center space-y-3">
            <p className="text-xs sm:text-sm font-bold text-foreground">
              No bank accounts connected yet
            </p>
            <p className="text-xs text-muted-foreground">
              Connect a Nigerian bank account to receive automatic and manual
              payouts.
            </p>
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onAddBankAccount}
              leadingIcon={<Plus className="size-3.5" />}
              className="h-9 px-4 rounded-xl text-xs font-bold"
            >
              Add New Bank Account
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {bankAccounts.map((account) => (
              <div
                key={account.id}
                className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="size-11 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                    <Landmark className="size-5" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs sm:text-sm font-extrabold text-foreground">
                        {account.bankName}
                      </p>

                      {account.isPrimary && (
                        <span className="px-2 py-0.5 rounded bg-foreground text-background text-[9px] font-bold uppercase tracking-wider">
                          PRIMARY
                        </span>
                      )}

                      {account.isVerified && (
                        <span className="px-2 py-0.5 rounded bg-success-bg text-success text-[9px] font-bold uppercase tracking-wider">
                          VERIFIED
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground truncate">
                      **** {account.last4} • {account.accountName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                  {!account.isPrimary && onSetPrimaryBankAccount && (
                    <button
                      type="button"
                      onClick={() => onSetPrimaryBankAccount(account.id)}
                      className="text-xs font-semibold text-primary hover:underline cursor-pointer px-2"
                    >
                      Set Primary
                    </button>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onEditBankAccount(account)}
                    className="h-8 px-3.5 rounded-lg text-xs font-bold"
                  >
                    Edit
                  </Button>

                  <button
                    type="button"
                    aria-label={`Remove ${account.bankName}`}
                    onClick={() => onRequestDeleteBankAccount(account)}
                    className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-error hover:bg-error-bg/50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security & Notifications Card */}
      <div className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-border/70">
          <h2 className="text-sm sm:text-base font-extrabold text-foreground">
            Security &amp; Notifications
          </h2>
        </div>

        <div className="divide-y divide-border/60">
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="size-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
                <Bell className="size-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  Payout Alerts
                </p>
                <p className="text-xs text-muted-foreground">
                  Receive email and push notifications for every successful
                  payout.
                </p>
              </div>
            </div>

            <Switch
              checked={settings.payoutAlertsEnabled}
              onCheckedChange={onTogglePayoutAlerts}
              aria-label="Toggle Payout Alerts"
            />
          </div>

          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="size-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
                <Shield className="size-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  Require 2FA for manual withdrawals
                </p>
                <p className="text-xs text-muted-foreground">
                  An extra security step when you withdraw funds before the
                  scheduled date.
                </p>
              </div>
            </div>

            <Switch
              checked={settings.require2FAForWithdrawals}
              onCheckedChange={onToggleRequire2FA}
              aria-label="Toggle 2FA for manual withdrawals"
            />
          </div>
        </div>

        <div className="px-6 py-3 bg-secondary/40 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Highly recommended for accounts with large balances.
          </p>
          <button
            type="button"
            onClick={onConfigure2FA}
            className="text-[11px] font-bold uppercase tracking-wider text-primary hover:underline cursor-pointer self-start sm:self-auto"
          >
            CONFIGURE 2FA
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Having issues with your bank verification?{" "}
        <button
          type="button"
          onClick={onContactSupport}
          className="font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          Contact Support
        </button>
      </p>
    </div>
  );
}
