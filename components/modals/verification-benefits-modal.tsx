"use client";

import { useEffect } from "react";
import {
  BadgeCheck,
  Briefcase,
  Lock,
  ShieldCheck,
  TrendingUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VERIFICATION_BENEFITS } from "@/features/verification/data";
import type { VerificationBenefitsModalProps } from "./types";

export type { VerificationBenefitsModalProps } from "./types";

const BENEFIT_ICONS: Record<string, typeof BadgeCheck> = {
  badge: BadgeCheck,
  requests: TrendingUp,
  contracts: Briefcase,
  privacy: Lock,
};

export function VerificationBenefitsModal({
  isOpen,
  isVerified = false,
  ctaLabel = "Get Verified Now",
  onClose,
  onStartVerification,
}: VerificationBenefitsModalProps) {
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
      aria-labelledby="verification-benefits-dialog-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h2
                id="verification-benefits-dialog-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                Why Get Verified on MyKostoma?
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Build instant client trust and unlock higher-value work.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close verification benefits modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {VERIFICATION_BENEFITS.map((item) => {
            const Icon = BENEFIT_ICONS[item.id] ?? ShieldCheck;
            return (
              <div
                key={item.id}
                className="rounded-xl border border-border bg-secondary/35 p-3.5 flex items-start gap-3"
              >
                <div className="size-8 rounded-lg bg-card border border-border/70 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="size-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3 pt-1">
          {isVerified ? (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onClose}
              className="h-9 px-5 rounded-lg text-xs font-semibold"
            >
              Done
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClose}
                className="h-9 px-4 rounded-lg text-xs font-semibold"
              >
                Close
              </Button>
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => {
                  onClose();
                  onStartVerification();
                }}
                className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
              >
                {ctaLabel}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
