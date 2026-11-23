"use client";

import {
  BookOpen,
  Car,
  Check,
  CreditCard,
  IdCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  VerificationDocumentSelectorProps,
  VerificationDocumentType,
} from "./types";

const DOCUMENT_ICONS: Record<VerificationDocumentType, typeof IdCard> = {
  nin: IdCard,
  pvc: CreditCard,
  drivers_licence: Car,
  passport: BookOpen,
};

export function VerificationDocumentSelector({
  options,
  selectedType,
  onSelect,
  disabled = false,
}: VerificationDocumentSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Identity document type"
      className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4"
    >
      {options.map((option) => {
        const isSelected = option.id === selectedType;
        const Icon = DOCUMENT_ICONS[option.id] ?? IdCard;

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onSelect(option.id)}
            className={cn(
              "relative rounded-xl border p-4 sm:p-5 text-left transition-all flex items-center gap-3.5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
              isSelected
                ? "border-primary ring-1 ring-primary bg-card shadow-2xs"
                : "border-border bg-card hover:border-muted-foreground/40 hover:bg-secondary/20",
              disabled && "opacity-60 cursor-not-allowed"
            )}
          >
            <div
              className={cn(
                "size-11 rounded-xl flex items-center justify-center shrink-0 border transition-colors",
                isSelected
                  ? "bg-secondary text-foreground border-border/70"
                  : "bg-secondary/70 text-muted-foreground border-border/50"
              )}
            >
              <Icon className="size-5" />
            </div>

            <div className="min-w-0 flex-1 pr-6">
              <p className="text-sm font-bold text-foreground truncate">
                {option.title}
              </p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {option.subtitle}
              </p>
            </div>

            {isSelected && (
              <span
                aria-hidden="true"
                className="absolute top-3 right-3 size-5 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xs"
              >
                <Check className="size-3 stroke-[3]" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
