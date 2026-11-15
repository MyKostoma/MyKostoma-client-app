"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export interface ChartConfigItem {
  label: string;
  color?: string;
}

export type ChartConfig = Record<string, ChartConfigItem>;

export interface ChartContainerProps {
  config?: ChartConfig;
  children: ReactNode;
  className?: string;
}

export function ChartContainer({
  children,
  className,
}: ChartContainerProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={60}>
      <div
        className={cn(
          "relative w-full select-none text-xs",
          className
        )}
      >
        {children}
      </div>
    </TooltipPrimitive.Provider>
  );
}

export interface AreaLineChartPoint {
  label: string;
  value: number;
}

export interface AreaLineChartProps {
  data: AreaLineChartPoint[];
  seriesLabel?: string;
  formatValue?: (value: number) => string;
  formatYAxis?: (value: number) => string;
  yTickCount?: number;
  height?: number;
  className?: string;
}

function calculateNiceScale(values: number[], tickCount = 4) {
  const rawMax = Math.max(...values, 0);
  if (rawMax <= 0) {
    return {
      maxVal: 800,
      ticks: [200, 400, 600, 800],
    };
  }

  const roughStep = rawMax / tickCount;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const normalized = roughStep / magnitude;

  let niceNormalized = 1;
  if (normalized <= 1) niceNormalized = 1;
  else if (normalized <= 2) niceNormalized = 2;
  else if (normalized <= 2.5) niceNormalized = 2.5;
  else if (normalized <= 5) niceNormalized = 5;
  else niceNormalized = 10;

  const step = niceNormalized * magnitude;
  const maxVal = Math.max(step * tickCount, Math.ceil(rawMax / step) * step);

  const ticks: number[] = [];
  for (let val = step; val <= maxVal; val += step) {
    ticks.push(val);
  }

  return { maxVal, ticks };
}

export function AreaLineChart({
  data,
  seriesLabel = "Earnings",
  formatValue = (v) => v.toLocaleString(),
  formatYAxis = (v) => v.toLocaleString(),
  yTickCount = 4,
  height = 200,
  className,
}: AreaLineChartProps) {
  const gradientId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const width = 440;
  const paddingLeft = 40;
  const paddingRight = 14;
  const paddingTop = 14;
  const paddingBottom = 26;

  const geometry = useMemo(() => {
    const plotW = width - paddingLeft - paddingRight;
    const plotH = height - paddingTop - paddingBottom;
    const baselineY = paddingTop + plotH;

    const values = data.map((d) => d.value);
    const { maxVal, ticks } = calculateNiceScale(values, yTickCount);

    const coords = data.map((item, idx) => {
      const x =
        data.length <= 1
          ? paddingLeft + plotW / 2
          : paddingLeft + (idx / (data.length - 1)) * plotW;
      const ratio = maxVal > 0 ? Math.min(Math.max(item.value / maxVal, 0), 1) : 0;
      const y = paddingTop + plotH * (1 - ratio);

      return {
        index: idx,
        label: item.label,
        value: item.value,
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
      };
    });

    const linePoints = coords.map((c) => `${c.x},${c.y}`).join(" ");
    const areaPoints =
      coords.length > 0
        ? `${coords[0].x},${baselineY} ${linePoints} ${coords[coords.length - 1].x},${baselineY}`
        : "";

    const yGridTicks = ticks.map((tickVal) => {
      const ratio = maxVal > 0 ? tickVal / maxVal : 0;
      const y = Number((paddingTop + plotH * (1 - ratio)).toFixed(2));
      return { value: tickVal, y };
    });

    return {
      plotW,
      plotH,
      baselineY,
      maxVal,
      coords,
      linePoints,
      areaPoints,
      yGridTicks,
    };
  }, [data, height, yTickCount]);

  return (
    <ChartContainer className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
        role="img"
        aria-label={`${seriesLabel} chart`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Vertical Grid Lines */}
        {geometry.coords.map((pt) => (
          <line
            key={`vgrid-${pt.label}`}
            x1={pt.x}
            y1={paddingTop}
            x2={pt.x}
            y2={geometry.baselineY}
            stroke="var(--border)"
            strokeWidth="1"
            opacity="0.6"
          />
        ))}

        {/* Horizontal Grid Lines & Y-Axis Tick Numbers */}
        {geometry.yGridTicks.map((tick) => (
          <g key={`hgrid-${tick.value}`}>
            <line
              x1={paddingLeft}
              y1={tick.y}
              x2={paddingLeft + geometry.plotW}
              y2={tick.y}
              stroke="var(--border)"
              strokeWidth="1"
              opacity="0.75"
            />
            <text
              x={paddingLeft - 10}
              y={tick.y + 3}
              textAnchor="end"
              className="fill-muted-foreground text-[10px] font-medium"
            >
              {formatYAxis(tick.value)}
            </text>
          </g>
        ))}

        {/* Baseline X-Axis */}
        <line
          x1={paddingLeft}
          y1={geometry.baselineY}
          x2={paddingLeft + geometry.plotW}
          y2={geometry.baselineY}
          stroke="var(--muted-foreground)"
          strokeWidth="1.25"
          opacity="0.65"
        />

        {/* Shaded Area Under Curve */}
        {geometry.areaPoints && (
          <polygon
            points={geometry.areaPoints}
            fill={`url(#${gradientId})`}
          />
        )}

        {/* Active Hover Crosshair Line */}
        {activeIndex !== null && geometry.coords[activeIndex] && (
          <line
            x1={geometry.coords[activeIndex].x}
            y1={paddingTop}
            x2={geometry.coords[activeIndex].x}
            y2={geometry.baselineY}
            stroke="var(--primary)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.6"
          />
        )}

        {/* Data Trend Polyline */}
        {geometry.linePoints && (
          <polyline
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={geometry.linePoints}
          />
        )}

        {/* Interactive Data Nodes with Radix Tooltip */}
        {geometry.coords.map((pt) => {
          const isHovered = activeIndex === pt.index;

          return (
            <g key={`node-${pt.label}`}>
              {/* X-Axis Day Label */}
              <text
                x={pt.x}
                y={geometry.baselineY + 15}
                textAnchor="middle"
                className={cn(
                  "text-[10px] transition-colors",
                  isHovered
                    ? "fill-foreground font-bold"
                    : "fill-muted-foreground font-medium"
                )}
              >
                {pt.label}
              </text>

              <TooltipPrimitive.Root
                open={isHovered}
                onOpenChange={(open) =>
                  setActiveIndex(open ? pt.index : null)
                }
              >
                <TooltipPrimitive.Trigger asChild>
                  <g
                    tabIndex={0}
                    role="button"
                    aria-label={`${pt.label}: ${formatValue(pt.value)}`}
                    onMouseEnter={() => setActiveIndex(pt.index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onFocus={() => setActiveIndex(pt.index)}
                    onBlur={() => setActiveIndex(null)}
                    className="cursor-pointer outline-none"
                  >
                    {/* Invisible larger hit target for smooth hover */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="12"
                      fill="transparent"
                    />
                    {/* Visible data node */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? "5" : "3.5"}
                      fill="var(--primary)"
                      stroke="var(--card)"
                      strokeWidth="1.5"
                      className="transition-all duration-150"
                    />
                  </g>
                </TooltipPrimitive.Trigger>

                <TooltipPrimitive.Portal>
                  <TooltipPrimitive.Content
                    side="top"
                    sideOffset={8}
                    className="z-50 rounded-xl border border-border bg-popover px-3 py-2 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span className="size-2 rounded-full bg-primary shrink-0" />
                      <span className="font-semibold text-muted-foreground">
                        {pt.label}:
                      </span>
                      <span className="font-bold text-foreground">
                        {formatValue(pt.value)}
                      </span>
                    </div>
                    <TooltipPrimitive.Arrow className="fill-border" />
                  </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
              </TooltipPrimitive.Root>
            </g>
          );
        })}
      </svg>
    </ChartContainer>
  );
}
