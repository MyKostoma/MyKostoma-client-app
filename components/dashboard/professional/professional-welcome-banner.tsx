"use client";

import { CheckCircle2, Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import type { ProfessionalWelcomeBannerProps } from "./types";

export function ProfessionalWelcomeBanner({
  firstName,
  fullName,
  avatarUrl,
  isVerified,
  verificationLabel,
  newRequestsCount,
  pendingQuotationsCount,
  onNewProduct,
  onCreateQuote,
}: ProfessionalWelcomeBannerProps) {
  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className="size-14 sm:size-16 rounded-2xl overflow-hidden border border-border bg-card shadow-2xs shrink-0">
          <FallbackImage
            src={avatarUrl}
            alt={fullName}
            fallbackType="user"
            variant="avatar"
            className="size-full object-cover"
          />
        </div>

        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
              Welcome back, {firstName}
            </h2>

            {isVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-warning-bg text-warning text-[11px] font-semibold border border-warning/20 shrink-0">
                <CheckCircle2 className="size-3.5" />
                <span>{verificationLabel}</span>
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground">
            You have{" "}
            <span className="font-semibold text-foreground">
              {newRequestsCount} new service requests
            </span>{" "}
            and{" "}
            <span className="font-semibold text-foreground">
              {pendingQuotationsCount} pending quotations
            </span>
            .
          </p>
        </div>
      </div>

      {/* Desktop & Mobile Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onNewProduct}
          leadingIcon={<Plus className="size-4" />}
          className="h-9 px-4 rounded-lg text-xs font-semibold flex-1 sm:flex-none"
        >
          New Product
        </Button>

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onCreateQuote}
          leadingIcon={<Send className="size-3.5" />}
          className="h-9 px-4 rounded-lg text-xs font-semibold shadow-xs flex-1 sm:flex-none"
        >
          Create Quote
        </Button>
      </div>
    </section>
  );
}
