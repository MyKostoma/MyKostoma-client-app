import type * as React from "react";
import type { StaticImageData } from "next/image";

export interface ConsumerCategoryItem {
  id: string;
  name: string;
  countLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: (id: string) => void;
}

export type ProBadgeVariant = "verified" | "corporate";

export interface FeaturedProItem {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number | string;
  imageUrl: string;
  badgeText: string;
  badgeVariant?: ProBadgeVariant;
  showQuickAction?: boolean;
  statLabel: string;
  statValue: string;
  ctaText?: string;
  onBookClick?: (id: string) => void;
  onQuickActionClick?: (id: string) => void;
}

export interface SpotlightProviderItem {
  id: string;
  name: string;
  category: string;
  matchText: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: (id: string) => void;
}

export interface ConsumerHeroBannerProps
  extends React.HTMLAttributes<HTMLElement> {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  referenceId?: string;
  backgroundImage?: StaticImageData | string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}
