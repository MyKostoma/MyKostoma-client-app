import { cn } from "@/lib/utils";
import type { OrderStatusBadgeProps } from "./types";

export type { OrderStatusBadgeProps } from "./types";

const BADGE_LABELS: Record<OrderStatusBadgeProps["status"], string> = {
  "in-progress": "IN PROGRESS",
  pending: "PENDING",
  "awaiting-confirmation": "AWAITING CONFIRMATION",
  "awaiting-feedback": "AWAITING FEEDBACK",
  completed: "COMPLETED",
  cancelled: "CANCELLED",
  released: "RELEASED",
  "in-escrow": "IN ESCROW",
  secured: "SECURED",
};

export function OrderStatusBadge({
  status,
  variant = "card",
  customLabel,
  className,
}: OrderStatusBadgeProps) {
  const label = customLabel || BADGE_LABELS[status];

  if (variant === "milestone") {
    return (
      <span
        className={cn(
          "text-[10px] font-bold uppercase tracking-wider select-none",
          status === "released" && "text-success",
          status === "in-escrow" && "text-muted-foreground",
          status === "pending" && "text-muted-foreground",
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
        "inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider select-none",
        status === "in-progress" &&
          "bg-success-bg text-success border border-success/20",
        status === "pending" &&
          "bg-secondary text-muted-foreground border border-border/80",
        status === "awaiting-confirmation" &&
          "bg-warning-bg text-warning border border-warning/25",
        status === "awaiting-feedback" &&
          "bg-card text-foreground border border-foreground/70",
        status === "completed" &&
          "bg-secondary/70 text-foreground border border-border",
        status === "cancelled" &&
          "bg-error-bg text-error border border-error/20",
        status === "secured" &&
          "rounded-full bg-success text-white px-3 py-1 shadow-2xs",
        className
      )}
    >
      {label}
    </span>
  );
}

