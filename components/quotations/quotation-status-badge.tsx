import { cn } from "@/lib/utils";
import type { QuotationStatus } from "./types";

export interface QuotationStatusBadgeProps {
  status: QuotationStatus;
  variant?: "card" | "detail";
  customLabel?: string;
  className?: string;
}

const CARD_LABELS: Record<QuotationStatus, string> = {
  pending: "PENDING",
  updated: "UPDATED",
  accepted: "ACCEPTED",
  rejected: "REJECTED",
};

const DETAIL_LABELS: Record<QuotationStatus, string> = {
  pending: "PENDING REVIEW",
  updated: "REVISED (V3)",
  accepted: "ACCEPTED",
  rejected: "REJECTED",
};

export function QuotationStatusBadge({
  status,
  variant = "card",
  customLabel,
  className,
}: QuotationStatusBadgeProps) {
  const label =
    customLabel ||
    (variant === "detail" ? DETAIL_LABELS[status] : CARD_LABELS[status]);

  if (variant === "detail") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider select-none border",
          status === "pending" &&
            "bg-secondary text-muted-foreground border-border",
          status === "updated" &&
            "bg-accent text-primary border-primary/20",
          status === "accepted" &&
            "bg-success-bg text-success border-success/20",
          status === "rejected" &&
            "bg-error-bg text-error border-error/20",
          className
        )}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider select-none",
        status === "pending" &&
          "bg-secondary text-muted-foreground border border-border/80",
        status === "updated" && "bg-foreground text-background shadow-2xs",
        status === "accepted" &&
          "bg-success-bg text-success border border-success/20",
        status === "rejected" &&
          "bg-secondary/60 text-muted-foreground border border-border/60",
        className
      )}
    >
      {label}
    </span>
  );
}

