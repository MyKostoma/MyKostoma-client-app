import type { EarningsChartPoint } from "../types";

/**
 * Format numeric Naira amount cleanly with currency symbol.
 */
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

/**
 * Compute SVG polyline and polygon points for the weekly earnings chart.
 */
export function buildEarningsChartGeometry(
  points: EarningsChartPoint[],
  width = 360,
  height = 140,
  paddingX = 28,
  paddingTop = 14,
  paddingBottom = 26
) {
  if (points.length === 0) {
    return {
      linePoints: "",
      areaPoints: "",
      coords: [] as Array<{ x: number; y: number; day: string; amount: number }>,
      maxVal: 1000,
    };
  }

  const maxData = Math.max(...points.map((p) => p.amount), 100);
  const maxVal = Math.ceil(maxData / 200) * 200;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingTop - paddingBottom;

  const coords = points.map((point, index) => {
    const x =
      points.length === 1
        ? paddingX + chartW / 2
        : paddingX + (index / (points.length - 1)) * chartW;
    const y = paddingTop + chartH - (point.amount / maxVal) * chartH;
    return {
      x: Number(x.toFixed(1)),
      y: Number(y.toFixed(1)),
      day: point.day,
      amount: point.amount,
    };
  });

  const linePoints = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const baselineY = paddingTop + chartH;
  const areaPoints = `${coords[0].x},${baselineY} ${linePoints} ${coords[coords.length - 1].x},${baselineY}`;

  return { linePoints, areaPoints, coords, maxVal, baselineY, paddingX, paddingTop, chartW, chartH };
}
