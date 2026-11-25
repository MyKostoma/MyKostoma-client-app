"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { ChevronRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, Switch } from "@/components/ui/form-fields";
import type {
  NotificationCategoryKey,
  NotificationChannelKey,
  NotificationPreferencesPanelProps,
} from "./types";

const NOTIFICATION_ROWS: {
  key: NotificationCategoryKey;
  title: string;
  description: string;
}[] = [
  {
    key: "accountUpdates",
    title: "Account Updates",
    description: "Security alerts, password changes, and login attempts.",
  },
  {
    key: "newMessages",
    title: "New Messages",
    description: "Direct messages from clients or service professionals.",
  },
  {
    key: "transactionAlerts",
    title: "Transaction Alerts",
    description:
      "Payments received, payouts processed, and order status updates.",
  },
  {
    key: "marketingPromotions",
    title: "Marketing & Promotions",
    description: "Newsletters, special offers, and platform tips.",
  },
];

const CHANNELS: { key: NotificationChannelKey; label: string }[] = [
  { key: "email", label: "Email" },
  { key: "push", label: "Push" },
  { key: "sms", label: "SMS" },
];

export function NotificationPreferencesPanel({
  preferences,
  hasUnsavedChanges,
  isSaving = false,
  timeOptions,
  onToggleChannel,
  onToggleQuietHours,
  onQuietHoursFromChange,
  onQuietHoursToChange,
  onSave,
  onCancel,
  onNavigateProfile,
}: NotificationPreferencesPanelProps) {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave();
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
          <span className="font-semibold text-foreground">
            Notification Preferences
          </span>
        </nav>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Notification Preferences
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Manage how and when you receive notifications across different
          channels.
        </p>
      </div>

      {/* Channels Matrix Card */}
      <div className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden">
        {/* Desktop Matrix Header */}
        <div className="hidden md:grid md:grid-cols-12 items-center px-6 py-3.5 border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-6">NOTIFICATION TYPE</div>
          <div className="col-span-2 text-center">Email</div>
          <div className="col-span-2 text-center">Push</div>
          <div className="col-span-2 text-center">SMS</div>
        </div>

        <div className="divide-y divide-border/80">
          {NOTIFICATION_ROWS.map((row) => {
            const state = preferences.channels[row.key];
            return (
              <div
                key={row.key}
                className="px-5 py-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-4"
              >
                <div className="md:col-span-6 space-y-0.5">
                  <p className="text-sm font-bold text-foreground">
                    {row.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {row.description}
                  </p>
                </div>

                {/* Desktop Switches */}
                {CHANNELS.map((ch) => (
                  <div
                    key={ch.key}
                    className="hidden md:flex md:col-span-2 justify-center"
                  >
                    <Switch
                      checked={state[ch.key]}
                      aria-label={`${row.title} ${ch.label}`}
                      onCheckedChange={() => onToggleChannel(row.key, ch.key)}
                    />
                  </div>
                ))}

                {/* Mobile Compact Switch Row */}
                <div className="flex md:hidden flex-wrap items-center gap-5 pt-1">
                  {CHANNELS.map((ch) => (
                    <label
                      key={ch.key}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-foreground"
                    >
                      <Switch
                        checked={state[ch.key]}
                        aria-label={`${row.title} ${ch.label}`}
                        onCheckedChange={() => onToggleChannel(row.key, ch.key)}
                      />
                      <span>{ch.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiet Hours Card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-extrabold text-foreground tracking-tight">
          Quiet Hours
        </h3>

        <div className="flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={preferences.quietHours.enabled}
              onChange={(e) => onToggleQuietHours(e.target.checked)}
              className="size-4 rounded accent-primary cursor-pointer"
            />
            <span>Enable Quiet Hours</span>
          </label>

          <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              FROM
            </span>
            <div className="w-28">
              <Select
                value={preferences.quietHours.from}
                disabled={!preferences.quietHours.enabled}
                onChange={onQuietHoursFromChange}
                options={[...timeOptions]}
              />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider">
              TO
            </span>
            <div className="w-28">
              <Select
                value={preferences.quietHours.to}
                disabled={!preferences.quietHours.enabled}
                onChange={onQuietHoursToChange}
                options={[...timeOptions]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save & Cancel */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          variant="default"
          size="sm"
          loading={isSaving}
          loadingText="Saving..."
          disabled={!hasUnsavedChanges}
          className="h-10 px-6 rounded-xl text-xs font-bold shadow-xs"
        >
          Save Preferences
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!hasUnsavedChanges}
          onClick={onCancel}
          className="h-10 px-5 rounded-xl text-xs font-semibold"
        >
          Cancel
        </Button>
      </div>

      {/* Bottom Tip Callout */}
      <div className="pt-4 border-t border-border/80 flex items-start gap-3">
        <HelpCircle className="size-4 text-muted-foreground shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-xs">
          <p className="font-bold text-foreground">
            Not receiving notifications?
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Please check your spam folder or ensure that your browser/device
            permissions allow notifications for MyKostoma. For SMS alerts,
            verify your phone number in the{" "}
            <button
              type="button"
              onClick={onNavigateProfile}
              className="font-bold text-foreground underline underline-offset-4 hover:text-primary cursor-pointer"
            >
              Profile Settings
            </button>
            .
          </p>
        </div>
      </div>
    </form>
  );
}
