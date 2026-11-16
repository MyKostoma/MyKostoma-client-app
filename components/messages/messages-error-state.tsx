"use client";

import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MessagesErrorStateProps } from "./types";

export function MessagesErrorState({
  title = "Failed to load messages",
  description = "We encountered a problem while fetching your conversations. Please check your internet connection and try again.",
  onRetry,
  onContactSupport,
  className,
}: MessagesErrorStateProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-[calc(100vh-8.5rem)] p-4 sm:p-8",
        className
      )}
    >
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 sm:p-10 text-center shadow-xs space-y-6">
        <div className="size-16 rounded-full bg-secondary flex items-center justify-center mx-auto">
          <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <AlertCircle className="size-5" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-2.5 pt-1">
          <Button
            type="button"
            variant="default"
            onClick={onRetry}
            leadingIcon={<RotateCcw className="size-4" />}
            className="w-full h-10 rounded-lg text-xs sm:text-sm font-semibold shadow-xs"
          >
            Retry
          </Button>

          {onContactSupport && (
            <Button
              type="button"
              variant="outline"
              onClick={onContactSupport}
              className="w-full h-10 rounded-lg text-xs sm:text-sm font-semibold"
            >
              Contact Support
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

