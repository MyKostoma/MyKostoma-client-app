"use client";

import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DeleteServiceCardModalProps } from "./types";

export type { DeleteServiceCardModalProps } from "./types";

export function DeleteServiceCardModal({
  isOpen,
  serviceTitle,
  onClose,
  onConfirmDelete,
}: DeleteServiceCardModalProps) {
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
      aria-labelledby="delete-service-card-dialog-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="size-11 rounded-full bg-error-bg text-error flex items-center justify-center">
          <Trash2 className="size-5" />
        </div>

        <div className="space-y-2">
          <h2
            id="delete-service-card-dialog-title"
            className="text-base sm:text-lg font-bold text-foreground tracking-tight"
          >
            Delete Service Card?
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to delete{" "}
            <strong className="font-semibold text-foreground">
              {serviceTitle}
            </strong>
            ? This action cannot be undone and the listing will be permanently
            removed from your shop.
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
            variant="destructive"
            size="sm"
            onClick={onConfirmDelete}
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Delete Service
          </Button>
        </div>
      </div>
    </div>
  );
}
