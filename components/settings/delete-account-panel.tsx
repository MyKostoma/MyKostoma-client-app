"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ChevronRight,
  Database,
  Headphones,
  Trash2,
  Wallet,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, Textarea } from "@/components/ui/form-fields";
import type { DeleteAccountPanelProps } from "./types";

export function DeleteAccountPanel({
  isProfessional,
  walletBalanceFormatted,
  reason,
  details,
  acknowledged,
  reasonOptions,
  onReasonChange,
  onDetailsChange,
  onAcknowledgedChange,
  onKeepAccount,
  onOpenConfirmModal,
  onContactSupport,
}: DeleteAccountPanelProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb & Heading */}
      <div className="space-y-1.5">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link href="/settings" className="hover:text-foreground">
            Support
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="font-semibold text-foreground">Delete Account</span>
        </nav>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Delete Account
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          We&rsquo;re sorry to see you go. Please review the following
          information carefully before proceeding.
        </p>
      </div>

      {/* Consequences Card */}
      <div className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 bg-secondary/45 border-b border-border flex items-center gap-3.5">
          <div className="size-10 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shrink-0">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-foreground">
              This action is permanent
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Please read these consequences before confirming.
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex items-start gap-3">
            <XCircle className="size-4 text-foreground shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">
                Irreversible Process
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Deleting your account is permanent and cannot be undone. Once
                confirmed, all your data will be purged from our active
                databases.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Database className="size-4 text-foreground shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">Loss of Access</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isProfessional
                  ? "You will lose access to your professional profile, transaction history, invoices, client reviews, and active service orders."
                  : "You will lose access to your profile, transaction history, invoices, saved professionals, and active service orders."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Wallet className="size-4 text-foreground shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">
                Wallet &amp; Funds ({walletBalanceFormatted} available)
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Any remaining balance in your MyKostoma wallet must be withdrawn
                or settled before deletion. Unclaimed funds may be forfeit
                depending on regional regulations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Survey Card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4">
        <p className="text-xs sm:text-sm font-bold text-foreground">
          Why are you leaving? (Optional)
        </p>

        <Select
          value={reason}
          onChange={onReasonChange}
          placeholder="Select a reason"
          options={[...reasonOptions]}
        />

        <Textarea
          value={details}
          onChange={(e) => onDetailsChange(e.target.value)}
          placeholder="Tell us more about your experience..."
          className="min-h-24 resize-none text-xs sm:text-sm"
        />
      </div>

      {/* Acknowledgement Checkbox */}
      <label className="flex items-start gap-3 text-xs text-muted-foreground cursor-pointer select-none leading-relaxed">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => onAcknowledgedChange(e.target.checked)}
          className="size-4 mt-0.5 rounded accent-primary cursor-pointer shrink-0"
        />
        <span>
          I understand that my account will be permanently deleted and that this
          action cannot be undone. I have withdrawn all remaining funds from my
          wallet.
        </span>
      </label>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onKeepAccount}
          className="h-10 rounded-xl text-xs sm:text-sm font-bold"
        >
          Keep My Account
        </Button>

        <Button
          type="button"
          variant="destructive"
          size="sm"
          disabled={!acknowledged}
          onClick={onOpenConfirmModal}
          leadingIcon={<Trash2 className="size-4" />}
          className="h-10 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
        >
          Delete My Account
        </Button>
      </div>

      {/* Contact Support Footer */}
      <div className="pt-4 border-t border-border/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
            <Headphones className="size-4" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-foreground">Having trouble?</p>
            <p className="text-muted-foreground">
              Talk to our support team before you go.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onContactSupport}
          className="text-xs font-bold text-primary hover:underline underline-offset-4 cursor-pointer"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
}
