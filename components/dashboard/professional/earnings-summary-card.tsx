"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { AreaLineChart } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import {
  formatEarningsAxisTick,
  formatNaira,
  mapWeeklyEarningsToChartData,
} from "@/features/professional-dashboard/services/professionalDashboardHelpers";
import type { EarningsSummaryCardProps } from "./types";

export function EarningsSummaryCard({
  weeklyEarnings,
  transactions,
}: EarningsSummaryCardProps) {
  const chartData = useMemo(
    () => mapWeeklyEarningsToChartData(weeklyEarnings),
    [weeklyEarnings]
  );

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-1 h-5 rounded-full bg-primary shrink-0" />
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
            Earnings Summary
          </h3>
        </div>

        <Link
          href="/wallet"
          className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-5 shadow-2xs">
        <AreaLineChart
          data={chartData}
          seriesLabel="Weekly Earnings"
          formatValue={formatNaira}
          formatYAxis={formatEarningsAxisTick}
          yTickCount={4}
        />

        <div className="divide-y divide-border/60 border-t border-border/60 pt-2">
          {transactions.map((tx) => {
            const isCredit = tx.type === "credit";
            return (
              <div
                key={tx.id}
                className="py-3.5 first:pt-2 last:pb-0 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={cn(
                      "size-9 rounded-full flex items-center justify-center shrink-0",
                      isCredit
                        ? "bg-success-bg text-success"
                        : "bg-error-bg text-error"
                    )}
                  >
                    {isCredit ? (
                      <ArrowDown className="size-4" />
                    ) : (
                      <ArrowUp className="size-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                      {tx.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {tx.date}
                    </p>
                  </div>
                </div>

                <span
                  className={cn(
                    "text-xs sm:text-sm font-bold shrink-0",
                    isCredit ? "text-success" : "text-foreground"
                  )}
                >
                  {isCredit ? "+" : "-"}
                  {formatNaira(tx.amount)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
