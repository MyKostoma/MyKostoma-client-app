"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CloseRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmClose: () => void;
}

export function CloseRequestModal({
  isOpen,
  onClose,
  onConfirmClose,
}: CloseRequestModalProps) {
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
      aria-labelledby="close-request-dialog-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="size-11 rounded-full bg-secondary text-foreground flex items-center justify-center">
          <AlertCircle className="size-5" />
        </div>

        <div className="space-y-2">
          <h2
            id="close-request-dialog-title"
            className="text-base sm:text-lg font-bold text-foreground tracking-tight"
          >
            Close Request?
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to close this request? This action will notify
            any professionals who have provided quotes and the request will no
            longer be active.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-5 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onConfirmClose}
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Confirm Close
          </Button>
        </div>
      </div>
    </div>
  );
}
