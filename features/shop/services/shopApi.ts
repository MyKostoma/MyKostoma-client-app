"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addOrderLocal } from "@/store/slices/ordersSlice";
import {
  placeDirectOrderLocal,
  selectPlacedShopOrders,
  selectSavedServiceIds,
  selectShopServices,
  toggleSavedServiceLocal,
  useCreateDirectOrderMutation,
  useGetShopServicesQuery,
  useToggleSavedShopServiceMutation,
} from "@/store/slices/shopSlice";
import type {
  ShopDeliveryWindow,
  ShopFilterState,
  ShopProviderLevel,
  ShopServiceItem,
  ShopSortOption,
} from "@/components/shop/types";
import {
  DEFAULT_SHOP_SERVICES,
  INITIAL_SHOP_FILTERS,
  SHOP_CATEGORIES,
  SHOP_TOP_RATED_PROVIDERS,
} from "../data";
import {
  buildOrderConfirmation,
  buildOrderFromConfirmation,
  buildProfileHref,
  buildShopCategoryHref,
  buildShopCheckoutHref,
  buildShopHomeHref,
  buildShopServiceHref,
  buildShopSuccessHref,
  calculatePaymentSummary,
  countActiveShopFilters,
  filterShopServices,
  findShopCategoryById,
  findShopServiceById,
  generateOrderCode,
  mapShopCategoriesWithHandlers,
  mapSpotlightProvidersWithHandlers,
  sortShopServices,
  toggleListValue,
} from "./shopHelpers";

function useShopCatalog() {
  const storeServices = useAppSelector(selectShopServices);
  const { data: apiServices } = useGetShopServicesQuery(undefined, {
    skip: true,
  });
  return apiServices ?? storeServices ?? DEFAULT_SHOP_SERVICES;
}

function useSavedServices() {
  const dispatch = useAppDispatch();
  const savedServiceIds = useAppSelector(selectSavedServiceIds);
  const [toggleSavedMutation] = useToggleSavedShopServiceMutation();

  const handleToggleSave = useCallback(
    async (serviceId: string) => {
      const wasSaved = savedServiceIds.includes(serviceId);
      try {
        await toggleSavedMutation({ id: serviceId }).unwrap();
      } catch {
        // Local state keeps the UI responsive until the API is available
      }
      dispatch(toggleSavedServiceLocal(serviceId));
      toast.success(wasSaved ? "Removed from saved services" : "Service saved");
    },
    [dispatch, savedServiceIds, toggleSavedMutation]
  );

  return { savedServiceIds, handleToggleSave };
}

export function useShopHomeService() {
  const router = useRouter();
  const services = useShopCatalog();
  const { savedServiceIds, handleToggleSave } = useSavedServices();

  const handleSelectCategory = useCallback(
    (categoryId: string) => router.push(buildShopCategoryHref(categoryId)),
    [router]
  );
  const handleOpenService = useCallback(
    (serviceId: string) => router.push(buildShopServiceHref(serviceId)),
    [router]
  );
  const handleSelectProvider = useCallback(
    (providerId: string) => router.push(buildProfileHref(providerId)),
    [router]
  );
  const handleBrowsePros = useCallback(() => router.push("/search"), [router]);
  const handleBrowseAllCategories = useCallback(
    () => router.push(buildShopCategoryHref("all")),
    [router]
  );

  const mappedCategories = useMemo(
    () => mapShopCategoriesWithHandlers(SHOP_CATEGORIES, handleSelectCategory, 6),
    [handleSelectCategory]
  );
  const spotlightProviders = useMemo(
    () =>
      mapSpotlightProvidersWithHandlers(
        SHOP_TOP_RATED_PROVIDERS,
        handleSelectProvider
      ),
    [handleSelectProvider]
  );
  const featuredServices = useMemo(
    () => services.filter((service) => service.featured).slice(0, 4),
    [services]
  );

  return {
    categoriesCount: SHOP_CATEGORIES.length,
    mappedCategories,
    featuredServices,
    spotlightProviders,
    savedServiceIds,
    handleBrowsePros,
    handleBrowseAllCategories,
    handleOpenService,
    handleToggleSave,
  };
}

export function useShopCategoryService(categoryId: string) {
  const router = useRouter();
  const services = useShopCatalog();
  const { savedServiceIds, handleToggleSave } = useSavedServices();

  const category = useMemo(
    () => findShopCategoryById(categoryId),
    [categoryId]
  );
  const [draftFilters, setDraftFilters] =
    useState<ShopFilterState>(INITIAL_SHOP_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<ShopFilterState>(INITIAL_SHOP_FILTERS);
  const [sortBy, setSortBy] = useState<ShopSortOption>("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const visibleServices = useMemo(
    () =>
      sortShopServices(
        filterShopServices(services, category.id, appliedFilters),
        sortBy
      ),
    [services, category.id, appliedFilters, sortBy]
  );

  const handleToggleSubCategory = (id: string) =>
    setDraftFilters((prev) => ({
      ...prev,
      subCategories: toggleListValue(prev.subCategories, id),
    }));

  const handlePriceChange = (
    field: "minPrice" | "maxPrice",
    value: string
  ) =>
    setDraftFilters((prev) => ({
      ...prev,
      [field]: value.replace(/[^0-9]/g, ""),
    }));

  const handleToggleDelivery = (window: ShopDeliveryWindow) =>
    setDraftFilters((prev) => ({
      ...prev,
      deliveryWindows: toggleListValue(prev.deliveryWindows, window),
    }));

  const handleToggleLevel = (level: ShopProviderLevel) =>
    setDraftFilters((prev) => ({
      ...prev,
      levels: toggleListValue(prev.levels, level),
    }));

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    setMobileFiltersOpen(false);
  };

  const handleResetFilters = () => {
    setDraftFilters(INITIAL_SHOP_FILTERS);
    setAppliedFilters(INITIAL_SHOP_FILTERS);
  };

  const handleNavigate = (href: string) => router.push(href);
  const handleOpenService = (serviceId: string) =>
    router.push(buildShopServiceHref(serviceId));

  return {
    category,
    draftFilters,
    activeFilterCount: countActiveShopFilters(appliedFilters),
    sortBy,
    setSortBy,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    visibleServices,
    savedServiceIds,
    shopHomeHref: buildShopHomeHref(),
    handleToggleSubCategory,
    handlePriceChange,
    handleToggleDelivery,
    handleToggleLevel,
    handleApplyFilters,
    handleResetFilters,
    handleNavigate,
    handleOpenService,
    handleToggleSave,
  };
}

export function useShopServiceDetailService(serviceId: string) {
  const router = useRouter();
  const services = useShopCatalog();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const service: ShopServiceItem =
    findShopServiceById(services, serviceId) ??
    findShopServiceById(DEFAULT_SHOP_SERVICES, serviceId) ??
    DEFAULT_SHOP_SERVICES[0];

  const category = findShopCategoryById(service.categoryId);
  const subCategory = category.subCategories.find(
    (item) => item.id === service.subCategoryId
  );

  const handleNavigate = (href: string) => router.push(href);
  const handleDirectOrder = () => router.push(buildShopCheckoutHref(service.id));
  const handleViewProfile = () =>
    router.push(buildProfileHref(service.provider.id));
  const handleContactProvider = () => router.push("/messages");

  return {
    service,
    category,
    subCategory,
    activeImageIndex,
    setActiveImageIndex,
    handleNavigate,
    handleDirectOrder,
    handleViewProfile,
    handleContactProvider,
  };
}

export function useShopCheckoutService(serviceId: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const services = useShopCatalog();
  const [createDirectOrderMutation] = useCreateDirectOrderMutation();

  const service: ShopServiceItem =
    findShopServiceById(services, serviceId) ??
    findShopServiceById(DEFAULT_SHOP_SERVICES, serviceId) ??
    DEFAULT_SHOP_SERVICES[0];

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [scopeAccepted, setScopeAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const summary = useMemo(
    () => calculatePaymentSummary(service.price),
    [service.price]
  );
  const canConfirm = termsAccepted && scopeAccepted;

  const handleNavigate = (href: string) => router.push(href);

  const handleConfirmOrder = async () => {
    if (!canConfirm || isSubmitting) return;
    setIsSubmitting(true);

    const fallbackConfirmation = buildOrderConfirmation(
      service,
      summary,
      generateOrderCode()
    );

    let confirmation = fallbackConfirmation;
    try {
      confirmation = await createDirectOrderMutation({
        serviceId: service.id,
        acceptedTerms: termsAccepted,
        acceptedScope: scopeAccepted,
      }).unwrap();
    } catch {
      // Simulated order creation until the API is available
    }

    dispatch(placeDirectOrderLocal(confirmation));
    dispatch(addOrderLocal(buildOrderFromConfirmation(service, confirmation)));
    toast.success("Order created and funds secured in escrow.");
    router.push(buildShopSuccessHref(confirmation.orderCode));
  };

  return {
    service,
    summary,
    termsAccepted,
    setTermsAccepted,
    scopeAccepted,
    setScopeAccepted,
    canConfirm,
    isSubmitting,
    handleNavigate,
    handleConfirmOrder,
  };
}

export function useShopOrderSuccessService(orderCode: string) {
  const router = useRouter();
  const placedOrders = useAppSelector(selectPlacedShopOrders);

  const confirmation = useMemo(() => {
    const placed = placedOrders.find((order) => order.orderCode === orderCode);
    if (placed) return placed;

    const demoService = DEFAULT_SHOP_SERVICES.find(
      (service) => service.id === "svc-instagram-growth"
    ) as ShopServiceItem;
    return buildOrderConfirmation(
      demoService,
      calculatePaymentSummary(demoService.price),
      orderCode
    );
  }, [placedOrders, orderCode]);

  const handleViewOrder = () =>
    router.push(`/orders/${encodeURIComponent(confirmation.orderCode)}`);
  const handleBackToShop = () => router.push(buildShopHomeHref());

  return { confirmation, handleViewOrder, handleBackToShop };
}

