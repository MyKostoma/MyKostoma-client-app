"use client";

import { Download, Eye, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  ProfessionalQuotationItem,
  ProfessionalQuotationVersionItem,
} from "../types";

export interface ProQuotationHistoryTimelineProps {
  quotation: ProfessionalQuotationItem;
  onViewVersion: (version: ProfessionalQuotationVersionItem) => void;
  onExportAuditLog: () => void;
}

export function ProQuotationHistoryTimeline({
  quotation,
  onViewVersion,
  onExportAuditLog,
}: ProQuotationHistoryTimelineProps) {
  const versions = quotation.versions;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
            Quotation History - #{quotation.code}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            View all previous versions and modifications of this quotation.
          </p>
        </div>

        <span className="self-start px-3 py-1 rounded-full bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-wider shrink-0">
          {versions.length} REVISIONS
        </span>
      </div>

      <div className="relative pl-5 sm:pl-7 space-y-6">
        <div
          aria-hidden="true"
          className="absolute left-[7px] sm:left-[9px] top-3 bottom-3 w-0.5 bg-border"
        />

        {versions.map((version) => {
          const isCurrent = Boolean(version.isCurrent);

          return (
            <div key={version.id} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-5 sm:-left-7 top-6 size-4 rounded-full border-2 bg-card flex items-center justify-center",
                  isCurrent
                    ? "border-primary ring-4 ring-accent"
                    : "border-border"
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    isCurrent ? "bg-primary" : "bg-muted-foreground/60"
                  )}
                />
              </span>

              <div
                className={cn(
                  "rounded-xl border bg-card p-5 sm:p-6 shadow-2xs space-y-5 transition-colors",
                  isCurrent ? "border-border" : "border-border/80 opacity-90"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm sm:text-base font-extrabold text-foreground">
                        {version.versionTitle}
                      </h2>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider",
                          isCurrent
                            ? "bg-accent text-primary"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {version.badgeLabel}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {version.timestampLabel}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onViewVersion(version)}
                    leadingIcon={<Eye className="size-3.5" />}
                    className="h-8 px-3 rounded-lg text-xs font-semibold self-start sm:self-center shrink-0"
                  >
                    {isCurrent ? "View Full Details" : "View Snapshot"}
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border/70">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                      CHANGE SUMMARY
                    </p>
                    <p className="text-xs font-medium text-foreground">
                      {version.changeSummaryTitle}
                    </p>
                    <p
                      className={cn(
                        "text-xs font-extrabold",
                        isCurrent ? "text-primary" : "text-foreground"
                      )}
                    >
                      {version.totalLabel}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                      PROFESSIONAL&apos;S NOTE
                    </p>
                    <p className="text-xs italic text-muted-foreground leading-relaxed">
                      &ldquo;{version.professionalNote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="size-5" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-xs sm:text-sm font-bold text-foreground">
              Immutable Records
            </h3>
            <p className="text-xs text-muted-foreground">
              Quotation history is preserved for audit purposes. Previous
              versions cannot be modified or deleted.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onExportAuditLog}
          leadingIcon={<Download className="size-3.5" />}
          className="h-9 px-4 rounded-lg text-xs font-semibold shrink-0 self-end sm:self-center"
        >
          Export Audit Log
        </Button>
      </div>
    </div>
  );
}
