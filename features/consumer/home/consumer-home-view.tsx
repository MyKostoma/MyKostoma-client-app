"use client";

import { ConsumerHeroBanner } from "@/components/consumer-home/hero-banner";
import { ServiceCategoriesSection } from "@/components/consumer-home/service-categories-section";
import { FeaturedProfessionalsSection } from "@/components/consumer-home/featured-professionals-section";
import { TopRatedSpotlightSection } from "@/components/consumer-home/top-rated-spotlight-section";
import { useConsumerHomeService } from "./services/consumerHomeApi";
import type { ConsumerHomeViewProps } from "./types";

export type { ConsumerHomeViewProps };

export function ConsumerHomeView({
  categories,
  featuredProfessionals,
  spotlightProviders,
}: ConsumerHomeViewProps) {
  const {
    categories: resolvedCategories,
    mappedCategories,
    mappedProfessionals,
    spotlightProviders: resolvedSpotlight,
    handleBrowsePros,
  } = useConsumerHomeService({
    categories,
    featuredProfessionals,
    spotlightProviders,
  });

  return (
    <main className="flex-1 container px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-12 sm:space-y-16 lg:space-y-24">
      <ConsumerHeroBanner onPrimaryClick={handleBrowsePros} />

      <ServiceCategoriesSection
        categories={mappedCategories}
        actionLabel={`View all ${resolvedCategories.length} categories`}
        onActionClick={handleBrowsePros}
      />

      <FeaturedProfessionalsSection professionals={mappedProfessionals} />

      <TopRatedSpotlightSection providers={resolvedSpotlight} />
    </main>
  );
}

export default ConsumerHomeView;
