"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReelUploadFailedProps } from "./types";

export function ReelUploadFailed({
  errorCode,
  errorMessage,
  onTryAgain,
  onCancel,
}: ReelUploadFailedProps) {
  return (
    <div className="max-w-lg mx-auto py-8">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-2xs text-center space-y-5">
        <div className="flex justify-center">
          <div className="size-12 rounded-full bg-error-bg text-error flex items-center justify-center">
            <AlertCircle className="size-6" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
            Upload Failed
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
            {errorMessage}
          </p>
        </div>

        <div className="rounded-lg border border-error/25 bg-error-bg/70 px-4 py-2.5 text-[11px] font-mono font-semibold text-error">
          Error Code: {errorCode}
        </div>

        <div className="space-y-2.5 pt-1">
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onTryAgain}
            className="w-full h-10 rounded-xl text-xs font-bold shadow-xs"
          >
            Try Again
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="w-full h-10 rounded-xl text-xs font-semibold"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
