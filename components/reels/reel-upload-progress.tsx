"use client";

import { Loader2 } from "lucide-react";
import type { ReelUploadProgressProps } from "./types";

export function ReelUploadProgress({
  fileName,
  progress,
  onCancelUpload,
}: ReelUploadProgressProps) {
  return (
    <div className="max-w-lg mx-auto py-8">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <h2 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
              Uploading...
            </h2>
            <p className="text-xs text-muted-foreground truncate">{fileName}</p>
          </div>

          <span className="text-sm font-extrabold text-foreground shrink-0">
            {progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 w-full rounded-full bg-secondary overflow-hidden"
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Loader2 className="size-3.5 animate-spin shrink-0" />
          <span>PROCESSING VIDEO FOR HIGH QUALITY...</span>
        </div>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onCancelUpload}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Cancel Upload
          </button>
        </div>
      </div>
    </div>
  );
}
