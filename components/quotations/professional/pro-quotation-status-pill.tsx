"use client";

import { cn } from "@/lib/utils";
import type { ProfessionalQuotationStatus } from "../types";

export interface ProQuotationStatusPillProps {
  status: ProfessionalQuotationStatus;
  variant?: "table" | "detail";
  className?: string;
}

export function ProQuotationStatusPill({
  status,
  variant = "table",
  className,
}: ProQuotationStatusPillProps) {
  if (variant === "detail") {
    if (status === "pending") {
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-primary shrink-0",
            className
          )}
        >
          <span className="size-1.5 rounded-full bg-primary" />
          Pending
        </span>
      );
    }

    if (status === "approved") {
      return (
        <span
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-success-bg text-success shrink-0",
            className
          )}
        >
          HIRED
        </span>
      );
    }

    if (status === "rejected") {
      return (
        <span
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-error text-error-foreground shrink-0",
            className
          )}
        >
          REJECTED
        </span>
      );
    }

    return (
      <span
        className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-success-bg text-success shrink-0",
          className
        )}
      >
        COMPLETED
      </span>
    );
  }

  // Table variant
  if (status === "pending") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-semibold bg-accent text-primary",
          className
        )}
      >
        Pending
      </span>
    );
  }

  if (status === "approved") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-semibold bg-primary text-primary-foreground",
          className
        )}
      >
        Approved
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-semibold bg-error-bg text-error",
          className
        )}
      >
        Rejected
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-semibold bg-foreground text-background",
        className
      )}
    >
      Completed
    </span>
  );
}
