"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Calendar,
  FileText,
  Info,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form-fields";
import type {
  AcceptQuotationModalProps,
  RejectQuotationModalProps,
} from "./types";

export type {
  AcceptQuotationModalProps,
  RejectQuotationModalProps,
} from "./types";

export function RejectQuotationModal({
  isOpen,
  providerName,
  onClose,
  onConfirmReject,
}: RejectQuotationModalProps) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onConfirmReject(reason.trim());
    setReason("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reject-quote-dialog-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-5 animate-in zoom-in-95 duration-150">
        <div className="text-center space-y-2.5">
          <div className="size-12 rounded-full bg-error-bg text-error flex items-center justify-center mx-auto">
            <AlertCircle className="size-5" />
          </div>

          <h2
            id="reject-quote-dialog-title"
            className="text-base sm:text-lg font-bold text-foreground tracking-tight"
          >
            Reject Quote?
          </h2>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Are you sure you want to reject this quote from{" "}
            <span className="font-semibold text-foreground">{providerName}</span>
            ? This action cannot be undone and the professional will be
            notified.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="reject-quote-reason"
            className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
          >
            Reason for Rejection (Optional)
          </label>
          <Textarea
            id="reject-quote-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Price too high, found another artisan..."
            className="min-h-24 text-xs"
          />
        </div>

        <div className="space-y-2.5 pt-1">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleSubmit}
            className="w-full h-10 rounded-lg text-xs font-semibold shadow-xs"
          >
            Reject Quote
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="w-full h-10 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AcceptQuotationModal({
  isOpen,
  quoteCode,
  requestTitle,
  providerName,
  estimatedDuration,
  totalAmount,
  onClose,
  onConfirmAccept,
}: AcceptQuotationModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accept-quote-dialog-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3.5">
          <div className="size-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-xs">
            <FileText className="size-5" />
          </div>
          <div className="min-w-0">
            <h2
              id="accept-quote-dialog-title"
              className="text-base sm:text-lg font-bold text-primary tracking-tight"
            >
              Accept &amp; Start Order
            </h2>
            <p className="text-xs text-muted-foreground truncate">
              Quote #{quoteCode} — {requestTitle}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-secondary/45 border border-border/60 p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Professional</span>
            <span className="font-semibold text-foreground">{providerName}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Estimated Duration</span>
            <span className="font-semibold text-foreground">
              {estimatedDuration}
            </span>
          </div>
          <div className="border-t border-border/60 pt-2.5 flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">
              Total Project Amount
            </span>
            <span className="text-base sm:text-lg font-extrabold text-primary tracking-tight">
              {totalAmount}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="size-7 rounded-lg bg-secondary text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="size-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">
                Secure Escrow Payment
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Accepting this quote will create an Order and initiate the
                escrow flow. Your funds are held safely until the work is
                completed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="size-7 rounded-lg bg-secondary text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
              <Calendar className="size-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">
                Booking Confirmed
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                The artisan will be notified immediately to lock in the agreed
                start date.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-secondary/45 p-3 flex items-start gap-2.5">
          <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            By clicking the button below, you agree to MyKostoma&apos;s Terms of
            Service and the artisan&apos;s specific scope of work outlined in
            the breakdown.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="flex-1 h-10 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onConfirmAccept}
            className="flex-2 h-10 rounded-lg text-xs font-semibold shadow-xs"
          >
            Accept Quote &amp; Create Order
          </Button>
        </div>
      </div>
    </div>
  );
}

