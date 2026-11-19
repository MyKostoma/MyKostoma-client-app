"use client";

import { CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerificationTrustFooterProps } from "./types";

export function VerificationTrustFooter({
  className,
}: VerificationTrustFooterProps) {
  return (
    <div
      className={cn(
        "border-t border-border/80 pt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] sm:text-xs text-muted-foreground",
        className
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <Lock className="size-3.5 shrink-0" />
        <span>Secure 256-bit encryption</span>
      </span>

      <span className="inline-flex items-center gap-1.5">
        <ShieldCheck className="size-3.5 shrink-0" />
        <span>Privacy Compliant (NDPR)</span>
      </span>

      <span className="inline-flex items-center gap-1.5">
        <CheckCircle2 className="size-3.5 shrink-0" />
        <span>Identity Partner Verified</span>
      </span>
    </div>
  );
}
