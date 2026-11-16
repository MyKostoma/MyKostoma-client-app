"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/form-fields";
import type {
  CancelOrderModalProps,
  RaiseDisputeModalProps,
  ReleaseMilestoneModalProps,
} from "./types";

export type {
  CancelOrderModalProps,
  RaiseDisputeModalProps,
  ReleaseMilestoneModalProps,
} from "./types";

export function ReleaseMilestoneModal({
  isOpen,
  orderCode,
  orderTitle,
  providerName,
  milestoneTitle,
  releaseAmount,
  onClose,
  onConfirmRelease,
}: ReleaseMilestoneModalProps) {
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
      aria-labelledby="release-milestone-dialog-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3.5">
          <div className="size-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="size-5" />
          </div>
          <div className="min-w-0">
            <h2
              id="release-milestone-dialog-title"
              className="text-base sm:text-lg font-bold text-foreground tracking-tight"
            >
              Confirm &amp; Release Escrow
            </h2>
            <p className="text-xs text-muted-foreground truncate">
              Order #{orderCode} — {orderTitle}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-secondary/45 border border-border/60 p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Professional</span>
            <span className="font-semibold text-foreground">{providerName}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Milestone</span>
            <span className="font-semibold text-foreground text-right">
              {milestoneTitle}
            </span>
          </div>
          <div className="border-t border-border/60 pt-2.5 flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">
              Amount to Release
            </span>
            <span className="text-base sm:text-lg font-extrabold text-primary tracking-tight">
              {releaseAmount}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-secondary/45 p-3.5 flex items-start gap-2.5">
          <ShieldCheck className="size-4 text-success shrink-0 mt-0.5" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Once funds are released to{" "}
            <span className="font-semibold text-foreground">{providerName}</span>
            , they are non-refundable through the platform. Ensure you have
            inspected the completed work.
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
            onClick={onConfirmRelease}
            className="flex-2 h-10 rounded-lg text-xs font-semibold shadow-xs"
          >
            Confirm &amp; Release {releaseAmount}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CancelOrderModal({
  isOpen,
  orderCode,
  providerName,
  onClose,
  onConfirmCancel,
}: CancelOrderModalProps) {
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

  const handleConfirm = () => {
    onConfirmCancel(reason.trim() || "Client requested cancellation");
    setReason("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-order-dialog-title"
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
            id="cancel-order-dialog-title"
            className="text-base sm:text-lg font-bold text-foreground tracking-tight"
          >
            Cancel Order #{orderCode}?
          </h2>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Are you sure you want to cancel this order with{" "}
            <span className="font-semibold text-foreground">{providerName}</span>
            ? Any deposited escrow funds will be refunded to your original
            payment method.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="cancel-order-reason"
            className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
          >
            Reason for Cancellation (Optional)
          </label>
          <Textarea
            id="cancel-order-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Schedule changed, artisan unavailable..."
            className="min-h-24 text-xs"
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="flex-1 h-10 rounded-lg text-xs font-semibold"
          >
            Keep Order
          </Button>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleConfirm}
            className="flex-1 h-10 rounded-lg text-xs font-semibold shadow-xs"
          >
            Confirm Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export function RaiseDisputeModal({
  isOpen,
  orderCode,
  providerName,
  escrowAmount,
  onClose,
  onSubmitDispute,
}: RaiseDisputeModalProps) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

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
    if (!description.trim()) return;
    onSubmitDispute(
      reason.trim() || "Scope / Quality Discrepancy",
      description.trim()
    );
    setReason("");
    setDescription("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="raise-dispute-dialog-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3.5">
          <div className="size-11 rounded-xl bg-warning-bg text-warning flex items-center justify-center shrink-0">
            <AlertTriangle className="size-5" />
          </div>
          <div className="min-w-0">
            <h2
              id="raise-dispute-dialog-title"
              className="text-base sm:text-lg font-bold text-foreground tracking-tight"
            >
              Open Resolution Ticket
            </h2>
            <p className="text-xs text-muted-foreground truncate">
              Order #{orderCode} • {providerName}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-secondary/45 p-3.5 flex items-start gap-2.5">
          <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Opening a dispute will freeze{" "}
            <span className="font-bold text-foreground">{escrowAmount}</span> in
            escrow while a MyKostoma resolution specialist reviews your evidence.
          </p>
        </div>

        <div className="space-y-3.5">
          <div className="space-y-1.5">
            <label
              htmlFor="dispute-reason-input"
              className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
            >
              Issue Category
            </label>
            <Input
              id="dispute-reason-input"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Incomplete work, material mismatch, delay..."
              className="h-9 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="dispute-description-input"
              className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
            >
              Describe the Issue
            </label>
            <Textarea
              id="dispute-description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details on what did not match the agreed scope..."
              className="min-h-24 text-xs"
            />
          </div>
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
            disabled={!description.trim()}
            onClick={handleSubmit}
            className="flex-1 h-10 rounded-lg text-xs font-semibold shadow-xs"
          >
            Submit Dispute
          </Button>
        </div>
      </div>
    </div>
  );
}

