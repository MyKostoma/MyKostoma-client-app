"use client";

import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  buildEarningsChartGeometry,
  formatNaira,
} from "@/features/professional-dashboard/services/professionalDashboardHelpers";
import type { EarningsSummaryCardProps } from "./types";

export function EarningsSummaryCard({
  currentBalance,
  weeklyEarnings,
  transactions,
  onWithdrawFunds,
}: EarningsSummaryCardProps) {
  const width = 380;
  const height = 148;
  const { linePoints, areaPoints, coords, maxVal, paddingX, paddingTop, chartW, chartH } =
    buildEarningsChartGeometry(weeklyEarnings, width, height);

  const yTicks = [0, Math.round(maxVal * 0.25), Math.round(maxVal * 0.5), Math.round(maxVal * 0.75)];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-1 h-5 rounded-full bg-primary" />
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

      <div className="rounded-2xl border border-border bg-card p-5 space-y-5 shadow-2xs">
        {/* Current Balance Strip */}
        <div className="rounded-xl bg-primary text-primary-foreground p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary-foreground/15 flex items-center justify-center shrink-0">
              <Wallet className="size-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-85">
                Current Balance
              </p>
              <p className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {formatNaira(currentBalance)}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onWithdrawFunds}
            className="h-9 px-4 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0"
          >
            Withdraw Funds
          </Button>
        </div>

        {/* Weekly Earnings SVG Chart */}
        <div className="w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-36 overflow-visible"
            role="img"
            aria-label="Weekly earnings summary chart"
          >
            <defs>
              <linearGradient
                id="proEarningsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines & Y-Axis Labels */}
            {yTicks.map((tick) => {
              const ratio = maxVal > 0 ? tick / maxVal : 0;
              const y = Number(
                ((paddingTop ?? 14) + (chartH ?? 100) * (1 - ratio)).toFixed(1)
              );
              return (
                <g key={tick}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={(paddingX ?? 28) + (chartW ?? 320)}
                    y2={y}
                    stroke="var(--border)"
                    strokeWidth="1"
                  />
                  <text
                    x={(paddingX ?? 28) - 6}
                    y={y + 3}
                    textAnchor="end"
                    className="fill-muted-foreground text-[9px]"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            {areaPoints && (
              <polygon
                points={areaPoints}
                fill="url(#proEarningsGradient)"
              />
            )}

            {/* Trend Line */}
            {linePoints && (
              <polyline
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={linePoints}
              />
            )}

            {/* Data Points & X-Axis Labels */}
            {coords.map((point) => (
              <g key={point.day}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="3.5"
                  fill="var(--primary)"
                  stroke="var(--card)"
                  strokeWidth="1.5"
                />
                <text
                  x={point.x}
                  y={height - 6}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[9px] font-medium"
                >
                  {point.day}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Recent Transactions */}
        <div className="divide-y divide-border/60 border-t border-border/60 pt-2">
          {transactions.map((tx) => {
            const isCredit = tx.type === "credit";
            return (
              <div
                key={tx.id}
                className="py-3 first:pt-2 last:pb-0 flex items-center justify-between gap-3"
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
                      <ArrowDownLeft className="size-4" />
                    ) : (
                      <ArrowUpRight className="size-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
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
