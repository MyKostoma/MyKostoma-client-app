"use client";

import * as React from "react";
import { BadgeCheck, Building2, MapPin, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";
import type { FeaturedProItem } from "./types";
import ProfessionalCard from "./professional-card";


export interface FeaturedProfessionalsSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  professionals: FeaturedProItem[];
}

export function FeaturedProfessionalsSection({
  title = "Featured Professionals",
  subtitle = "Top-rated and verified partners chosen for quality service.",
  actionLabel,
  actionHref,
  onActionClick,
  professionals,
  className,
  ...props
}: FeaturedProfessionalsSectionProps) {
  return (
    <section className={cn("w-full space-y-6", className)} {...props}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        actionLabel={actionLabel}
        actionHref={actionHref}
        onActionClick={onActionClick}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {professionals.map((pro) => (
          <ProfessionalCard key={pro.id} professional={pro} />
        ))}
      </div>
    </section>
  );
}
