"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReviewSuccessStateProps } from "./types";

export function ReviewSuccessState({
  title = "Review Submitted Successfully!",
  description = "Thank you for your feedback. It has been shared with the community and recorded on the profile.",
  backLabel = "Back to Reviews",
  redirectSeconds = 5,
  onBackToReviews,
}: ReviewSuccessStateProps) {
  const [secondsLeft, setSecondsLeft] = useState(redirectSeconds);

  useEffect(() => {
    setSecondsLeft(redirectSeconds);

    const intervalId = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timeoutId = window.setTimeout(() => {
      onBackToReviews();
    }, redirectSeconds * 1000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [onBackToReviews, redirectSeconds]);

  return (
    <div className="max-w-lg mx-auto py-6 sm:py-10">
      <div className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-3">
          <span className="text-xs font-extrabold tracking-tight text-foreground">
            Review Confirmation
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            STATUS: SUCCESS
          </span>
        </div>

        <div className="px-6 py-12 sm:px-10 sm:py-14 flex flex-col items-center text-center space-y-5">
          <div className="size-16 rounded-full bg-success-bg flex items-center justify-center">
            <Check className="size-7 text-success stroke-[2.75]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
              {description}
            </p>
          </div>

          <div className="pt-2 space-y-3 w-full flex flex-col items-center">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onBackToReviews}
              className="h-11 px-8 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
            >
              {backLabel}
            </Button>

            <p className="text-xs text-muted-foreground">
              Redirecting in {secondsLeft}{" "}
              {secondsLeft === 1 ? "second" : "seconds"}...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
