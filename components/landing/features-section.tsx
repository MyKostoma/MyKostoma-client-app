"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface FeaturesSectionProps extends React.HTMLAttributes<HTMLElement> {
  features: FeatureItem[];
}

function FeatureCard({ feature }: { feature: FeatureItem }) {
  const Icon = feature.icon;

  return (
    <div className="flex flex-col items-start space-y-3">
      <div className="size-8 rounded-lg flex items-center justify-center text-muted-foreground/80">
        <Icon className="size-5" />
      </div>

      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground tracking-tight">
        {feature.title}
      </h3>

      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export function FeaturesSection({
  features,
  className,
  ...props
}: FeaturesSectionProps) {
  return (
    <section
      className={cn(
        "w-full container px-6 py-14 sm:py-24",
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-10">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}
