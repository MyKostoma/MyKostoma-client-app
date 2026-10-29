"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/ui/headers";
import { AppFooter } from "@/components/ui/footers";
import {
  ConsumerHeroBanner,
  ServiceCategoriesSection,
  FeaturedProfessionalsSection,
  TopRatedSpotlightSection,
  type ConsumerCategoryItem,
  type FeaturedProItem,
  type SpotlightProviderItem,
} from "@/components/consumer-home";
import {
  DEFAULT_CONSUMER_CATEGORIES,
  DEFAULT_FEATURED_PROFESSIONALS,
  DEFAULT_SPOTLIGHT_PROVIDERS,
} from "./data";
import { useMemo } from "react";

export interface ConsumerHomeViewProps {
  categories?: ConsumerCategoryItem[];
  featuredProfessionals?: FeaturedProItem[];
  spotlightProviders?: SpotlightProviderItem[];
}

export function ConsumerHomeView({
  categories = DEFAULT_CONSUMER_CATEGORIES,
  featuredProfessionals = DEFAULT_FEATURED_PROFESSIONALS,
  spotlightProviders = DEFAULT_SPOTLIGHT_PROVIDERS,
}: ConsumerHomeViewProps) {
  const router = useRouter();

  const handleBrowsePros = () => {
    router.push("/search");
  };

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/search?category=${encodeURIComponent(categoryId)}`);
  };

  const handleBookPro = (proId: string) => {
    router.push(`/search?pro=${encodeURIComponent(proId)}`);
  };

  const mappedCategories = useMemo(
    () =>
      categories.slice(0,6).map((cat) => ({
        ...cat,
        onClick: cat.onClick ?? handleCategorySelect,
      })),
    [categories]
  );

  const mappedProfessionals = useMemo(
    () =>
      featuredProfessionals.slice(0,12).map((pro) => ({
        ...pro,
        onBookClick: pro.onBookClick ?? handleBookPro,
      })),
    [featuredProfessionals]
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="w-full bg-card border-b border-border/70 sticky top-0 z-40">
        <div className="container px-4 sm:px-6 lg:px-8">
          <AppHeader
            className="rounded-none border-0 shadow-none px-0 py-3.5"
          />
        </div>
      </div>

      <main className="flex-1 container px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-12 sm:space-y-16 lg:space-y-24">
        <ConsumerHeroBanner onPrimaryClick={handleBrowsePros} />

        <ServiceCategoriesSection
          categories={mappedCategories}
          onActionClick={handleBrowsePros}
        />

        <FeaturedProfessionalsSection professionals={mappedProfessionals} />

        <TopRatedSpotlightSection providers={spotlightProviders} />
      </main>

      <AppFooter className="mt-8" />
    </div>
  );
}
