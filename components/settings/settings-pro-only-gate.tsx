"use client";

import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SettingsProOnlyGateProps } from "./types";

export function SettingsProOnlyGate({
  featureTitle,
  description,
  secondaryLabel,
  onBackToSettings,
  onSecondaryAction,
}: SettingsProOnlyGateProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-2xs text-center space-y-5 max-w-lg mx-auto my-4">
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

      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onBackToSettings}
          className="h-9 px-5 rounded-xl text-xs font-bold shadow-xs"
        >
          Back to Settings
        </Button>

        {secondaryLabel && onSecondaryAction && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onSecondaryAction}
            className="h-9 px-5 rounded-xl text-xs font-semibold"
          >
            {secondaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
