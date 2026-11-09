"use client";

import { ConsumerHeroBanner } from "@/components/consumer-home/hero-banner";
import { SectionHeader } from "@/components/consumer-home/section-header";
import { ServiceCategoriesSection } from "@/components/consumer-home/service-categories-section";
import { TopRatedSpotlightSection } from "@/components/consumer-home/top-rated-spotlight-section";
import { ShopServiceGrid } from "@/components/shop/shop-service-grid";
import { useShopHomeService } from "./services/shopApi";

export function ShopHomeView() {
  const {
    categoriesCount,
    mappedCategories,
    featuredServices,
    spotlightProviders,
    savedServiceIds,
    handleBrowsePros,
    handleBrowseAllCategories,
    handleOpenService,
    handleToggleSave,
  } = useShopHomeService();

  return (
    <main className="flex-1 container px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-12 sm:space-y-16 lg:space-y-24">
      <ConsumerHeroBanner onPrimaryClick={handleBrowsePros} />

      <ServiceCategoriesSection
        categories={mappedCategories}
        actionLabel={`View all ${categoriesCount} categories`}
        onActionClick={handleBrowseAllCategories}
      />

      <section className="w-full space-y-6">
        <SectionHeader
          title="Featured Shop Services"
          subtitle="Fixed-price services from top-rated professionals."
        />
        <ShopServiceGrid
          services={featuredServices}
          savedServiceIds={savedServiceIds}
          actionIcon="plus"
          columns={4}
          onOpen={handleOpenService}
          onToggleSave={handleToggleSave}
        />
      </section>

      <TopRatedSpotlightSection
        title="Top Rated in Nigeria"
        description="We've identified the absolute best service providers across Nigeria based on over 10,000 community reviews and background checks."
        providers={spotlightProviders}
      />
    </main>
  );
}

