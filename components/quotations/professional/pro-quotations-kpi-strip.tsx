"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProfessionalQuotationKpiMetric } from "../types";

export interface ProQuotationsKpiStripProps {
  metrics: ProfessionalQuotationKpiMetric[];
  sectionTitle?: string;
  className?: string;
}

export function ProQuotationsKpiStrip({
  metrics,
  sectionTitle,
  className,
}: ProQuotationsKpiStripProps) {
  return (
    <section
      aria-label={sectionTitle || "Quotation KPI Summary"}
      className={cn("pt-6 border-t border-border/70 space-y-4", className)}
    >
      {sectionTitle && (
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {sectionTitle}
        </h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="rounded-xl border border-border bg-card p-5 shadow-2xs flex flex-col justify-between gap-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {metric.label}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                {metric.value}
              </span>
              {metric.showStar && (
                <Star className="size-4 text-warning fill-warning shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
