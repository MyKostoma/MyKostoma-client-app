import type { EarningsChartPoint } from "../types";
import type { AreaLineChartPoint } from "@/components/ui/chart";

/**
 * Format numeric Naira amount cleanly with currency symbol.
 */
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

/**
 * Format Y-axis tick values (e.g. 200000 -> "200k" or 400 -> "400").
 */
export function formatEarningsAxisTick(value: number): string {
  if (value >= 1000000) {
    const millions = value / 1000000;
    return `${Number.isInteger(millions) ? millions : millions.toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${Math.round(value / 1000)}k`;
  }
  return String(value);
}

/**
 * Map weekly earnings points into chart data items.
 */
export function mapWeeklyEarningsToChartData(
  points: EarningsChartPoint[]
): AreaLineChartPoint[] {
  return points.map((pt) => ({
    label: pt.day,
    value: pt.amount,
  }));
}
