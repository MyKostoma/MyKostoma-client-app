"use client";

import Link from "next/link";
import { PieChart, Store, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProfessionalQuickStat } from "@/features/professional-dashboard/types";
import type { ProfessionalQuickStatsProps } from "./types";

const VARIANT_ICON_STYLES: Record<ProfessionalQuickStat["variant"], string> = {
  info: "bg-info-bg text-info",
  warning: "bg-warning-bg text-warning",
  primary: "bg-accent text-primary",
};

function renderStatIcon(iconName: ProfessionalQuickStat["iconName"]) {
  switch (iconName) {
    case "shop":
      return <PieChart className="size-5" />;
    case "orders":
      return <Store className="size-5" />;
    case "reviews":
      return <Star className="size-5 fill-current" />;
  }
}

export function ProfessionalQuickStats({
  stats,
}: ProfessionalQuickStatsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Link
          key={stat.id}
          href={stat.href}
          className="group rounded-2xl border border-border bg-card p-5 flex items-center justify-between gap-4 shadow-2xs hover:border-primary/40 hover:shadow-xs transition-all"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div
              className={cn(
                "size-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                VARIANT_ICON_STYLES[stat.variant]
              )}
            >
              {renderStatIcon(stat.iconName)}
            </div>

            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-foreground truncate">
                {stat.title}
              </h3>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {stat.subtitle}
              </p>
            </div>
          </div>

          <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
        </Link>
      ))}
    </section>
  );
}
