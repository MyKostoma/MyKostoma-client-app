"use client";

import { Clapperboard, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReelsProOnlyGateProps } from "./types";

export function ReelsProOnlyGate({
  featureTitle = "Creator Studio for Professionals",
  description = "Uploading and managing video Reels is reserved for verified MyKostoma Professional accounts. As a customer, you can browse, like, follow creators, and explore reels in Discover & Following.",
  onBackToFeed,
}: ReelsProOnlyGateProps) {
  return (
    <div className="max-w-lg mx-auto py-10">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-2xs text-center space-y-5">
        <div className="mx-auto size-12 rounded-full bg-warning-bg text-warning flex items-center justify-center">
          <ShieldAlert className="size-6" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
            {featureTitle}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {description}
          </p>
        </div>

        <div className="pt-1">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onBackToFeed}
            leadingIcon={<Clapperboard className="size-4" />}
            className="h-10 px-6 rounded-xl text-xs font-bold shadow-xs"
          >
            Back to Reels Feed
          </Button>
        </div>
      </div>
    </div>
  );
}
