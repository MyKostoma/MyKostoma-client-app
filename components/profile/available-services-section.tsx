"use client";

import type { HTMLAttributes } from "react";
import { Briefcase, PieChart, Sparkles, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/consumer-home/section-header";
import { cn } from "@/lib/utils";
import type { ProfileServiceItem, ServiceIconVariant } from "./types";

const SERVICE_ICON_MAP = {
  "pie-chart": PieChart,
  store: Store,
  briefcase: Briefcase,
  sparkles: Sparkles,
};

const ICON_VARIANT_STYLES: Record<ServiceIconVariant, string> = {
  info: "bg-info-bg text-info",
  warning: "bg-warning-bg text-warning",
  primary: "bg-accent text-primary",
  success: "bg-success-bg text-success",
};

export interface AvailableServiceCardProps {
  service: ProfileServiceItem;
  onActionClick?: (service: ProfileServiceItem) => void;
  className?: string;
}

export function AvailableServiceCard({
  service,
  onActionClick,
  className,
}: AvailableServiceCardProps) {
  const Icon = SERVICE_ICON_MAP[service.iconName] ?? PieChart;

  return (
    <article
      className={cn(
        "w-full rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5",
        className
      )}
    >
      {/* Left Side: Icon + Service Details */}
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 min-w-0">
        <div
          className={cn(
            "size-10 sm:size-14 rounded-lg sm:rounded-2xl flex items-center justify-center shrink-0",
            ICON_VARIANT_STYLES[service.iconVariant]
          )}
        >
          <Icon className="size-4 sm:size-6" />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
            {service.title}
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed max-w-md mt-1">
            {service.description}
          </p>

          {service.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-secondary text-foreground text-[10px] font-semibold select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Price & Action CTA */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3.5 sm:pt-0 border-t sm:border-t-0 border-border/60 shrink-0">
        <div className="text-left sm:text-right">
          <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {service.priceLabel}
          </span>
          <span className="block text-base sm:text-xl font-bold text-foreground tracking-tight mt-0.5">
            {service.priceValue}
          </span>
        </div>

        <Button
          type="button"
          variant={service.ctaVariant ?? "default"}
          size="sm"
          onClick={() => onActionClick?.(service)}
          className="h-8 px-4 rounded-lg text-[10px] font-bold uppercase tracking-wider mt-0.5"
        >
          {service.ctaLabel}
        </Button>
      </div>
    </article>
  );
}

export interface AvailableServicesSectionProps
  extends HTMLAttributes<HTMLElement> {
  title?: string;
  services: ProfileServiceItem[];
  onServiceAction?: (service: ProfileServiceItem) => void;
}

export function AvailableServicesSection({
  title = "Available Services",
  services,
  onServiceAction,
  className,
  ...props
}: AvailableServicesSectionProps) {
  return (
    <section
      id="services"
      className={cn("w-full space-y-5 scroll-mt-32 sm:scroll-mt-36", className)}
      {...props}
    >
      <SectionHeader title={title} />

      <div className="space-y-4">
        {services.map((service) => (
          <AvailableServiceCard
            key={service.id}
            service={service}
            onActionClick={onServiceAction}
          />
        ))}
      </div>
    </section>
  );
}
