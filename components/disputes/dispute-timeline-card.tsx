"use client";

import { cn } from "@/lib/utils";
import type { DisputeTimelineCardProps } from "./types";

export function DisputeTimelineCard({ timeline }: DisputeTimelineCardProps) {
  return (
    <section
      aria-labelledby="dispute-timeline-heading"
      className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-5 shadow-2xs"
    >
      <h2
        id="dispute-timeline-heading"
        className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
      >
        Dispute Timeline
      </h2>

      <ol className="relative space-y-5">
        {timeline.map((step, idx) => {
          const isLast = idx === timeline.length - 1;
          const isCurrent = step.state === "current";

          return (
            <li key={step.id} className="relative pl-6">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-[4.5px] top-3 -bottom-6 w-px bg-border"
                />
              )}

              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-1.5 size-2.5 rounded-full transition-colors",
                  isCurrent
                    ? "bg-foreground ring-4 ring-secondary"
                    : step.state === "completed"
                    ? "bg-muted-foreground/50"
                    : "border border-border bg-background"
                )}
              />

              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {step.title}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {step.timestampLabel}
                </p>
                {step.note && (
                  <div className="mt-2 rounded-xl border border-border bg-secondary/45 px-3.5 py-2.5 text-xs text-muted-foreground leading-relaxed">
                    {step.note}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
