"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import {
  selectFeaturedProfessionals,
  selectSpotlightProviders,
  useGetDiscoverHomeDataQuery,
} from "@/store/slices/discoverSlice";
import type {
  ConsumerCategoryItem,
  FeaturedProItem,
  SpotlightProviderItem,
} from "@/components/consumer-home/types";
import { DEFAULT_CONSUMER_CATEGORIES } from "../data";
import {
  buildBookProfessionalHref,
  buildCategorySearchHref,
  mapFeaturedProfessionalsWithHandlers,
  mapHomeCategoriesWithHandlers,
} from "./consumerHomeHelpers";

export function useConsumerHomeService(options?: {
  categories?: ConsumerCategoryItem[];
  featuredProfessionals?: FeaturedProItem[];
  spotlightProviders?: SpotlightProviderItem[];
}) {
  const router = useRouter();
  const storeFeatured = useAppSelector(selectFeaturedProfessionals);
  const storeSpotlight = useAppSelector(selectSpotlightProviders);

  const { data: apiData, isLoading } = useGetDiscoverHomeDataQuery(undefined, {
    skip: true,
  });

  const categories =
    options?.categories ?? apiData?.categories ?? DEFAULT_CONSUMER_CATEGORIES;
  const featuredProfessionals =
    options?.featuredProfessionals ??
    apiData?.featuredProfessionals ??
    storeFeatured;
  const spotlightProviders =
    options?.spotlightProviders ??
    apiData?.spotlightProviders ??
    storeSpotlight;

  const handleBrowsePros = useCallback(() => {
    router.push("/search");
  }, [router]);

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      router.push(buildCategorySearchHref(categoryId));
    },
    [router]
  );

  const handleBookPro = useCallback(
    (proId: string) => {
      router.push(buildBookProfessionalHref(proId));
    },
    [router]
  );

  const mappedCategories = useMemo(
    () => mapHomeCategoriesWithHandlers(categories, handleCategorySelect, 6),
    [categories, handleCategorySelect]
  );

  const mappedProfessionals = useMemo(
    () =>
      mapFeaturedProfessionalsWithHandlers(
        featuredProfessionals,
        handleBookPro,
        12
      ),
    [featuredProfessionals, handleBookPro]
  );

  return {
    categories,
    mappedCategories,
    mappedProfessionals,
    spotlightProviders,
    isLoading,
    handleBrowsePros,
    handleCategorySelect,
    handleBookPro,
  };
}

