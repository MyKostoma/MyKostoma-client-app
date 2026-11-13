"use client";

import Link from "next/link";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import type { PendingQuotationStatus } from "@/features/professional-dashboard/types";
import type { PendingQuotationsTableProps } from "./types";

const QUOTATION_STATUS_MAP: Record<
  PendingQuotationStatus,
  { label: string; badgeClass: string }
> = {
  waiting: {
    label: "WAITING",
    badgeClass: "bg-warning-bg text-warning border-warning/20",
  },
  draft: {
    label: "DRAFT",
    badgeClass: "bg-info-bg text-info border-info/20",
  },
  sent: {
    label: "SENT",
    badgeClass: "bg-success-bg text-success border-success/20",
  },
};

export function PendingQuotationsTable({
  quotations,
}: PendingQuotationsTableProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-1 h-5 rounded-full bg-primary" />
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
            Pending Quotations
          </h3>
        </div>

        <Link
          href="/quotations"
          className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/30 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="py-3.5 px-5">Client</th>
              <th className="py-3.5 px-5">Service</th>
              <th className="py-3.5 px-5">Estimate</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {quotations.map((quote) => {
              const statusCfg = QUOTATION_STATUS_MAP[quote.status];
              return (
                <tr
                  key={quote.id}
                  className="hover:bg-secondary/20 transition-colors"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <FallbackImage
                        src={quote.clientAvatarUrl}
                        alt={quote.clientName}
                        fallbackType="user"
                        variant="avatar"
                        className="size-9 rounded-full object-cover border border-border shrink-0"
                      />
                      <span className="text-sm font-semibold text-foreground">
                        {quote.clientName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-muted-foreground">
                    {quote.service}
                  </td>
                  <td className="py-4 px-5 text-sm font-bold text-foreground">
                    {quote.estimate}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                        statusCfg.badgeClass
                      )}
                    >
                      {statusCfg.label}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <Link
                      href={quote.href}
                      className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors"
                    >
                      {quote.actionLabel}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {quotations.map((quote) => {
          const statusCfg = QUOTATION_STATUS_MAP[quote.status];
          return (
            <div
              key={quote.id}
              className="rounded-2xl border border-border bg-card p-4 space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <FallbackImage
                    src={quote.clientAvatarUrl}
                    alt={quote.clientName}
                    fallbackType="user"
                    variant="avatar"
                    className="size-9 rounded-full object-cover border border-border shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">
                      {quote.clientName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {quote.service}
                    </p>
                  </div>
                </div>

                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border shrink-0",
                    statusCfg.badgeClass
                  )}
                >
                  {statusCfg.label}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <span className="text-sm font-bold text-foreground">
                  {quote.estimate}
                </span>
                <Link
                  href={quote.href}
                  className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors"
                >
                  {quote.actionLabel}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
