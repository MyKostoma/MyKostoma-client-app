"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addOrderLocal } from "@/store/slices/ordersSlice";
import {
  addProShopServiceLocal,
  deleteProShopServiceLocal,
  placeDirectOrderLocal,
  selectPlacedShopOrders,
  selectProShopActiveTab,
  selectProShopProfile,
  selectProShopSearchQuery,
  selectProShopServices,
  selectProShopStatusFilter,
  selectSavedServiceIds,
  selectShopServices,
  setProShopActiveTab,
  setProShopSearchQuery,
  setProShopStatusFilter,
  toggleProShopServiceStatusLocal,
  toggleSavedServiceLocal,
  updateProShopServiceLocal,
  useCreateDirectOrderMutation,
  useCreateProShopServiceMutation,
  useDeleteProShopServiceMutation,
  useGetProShopServicesQuery,
  useGetShopServicesQuery,
  useToggleProShopServicePublishMutation,
  useToggleSavedShopServiceMutation,
  useUpdateProShopServiceMutation,
} from "@/store/slices/shopSlice";
import type {
  ProShopMainTab,
  ProShopServiceFormValues,
  ProShopServiceItem,
  ProShopServiceStatus,
  ProShopStatusFilter,
  ShopDeliveryWindow,
  ShopFilterState,
  ShopProviderLevel,
  ShopServiceItem,
  ShopSortOption,
} from "@/components/shop/types";
import {
  DEFAULT_PRO_SHOP_SERVICES,
  DEFAULT_SHOP_SERVICES,
  INITIAL_SHOP_FILTERS,
  SHOP_CATEGORIES,
  SHOP_TOP_RATED_PROVIDERS,
} from "../data";
import {
  INITIAL_PRO_SERVICE_FORM_VALUES,
  buildOrderConfirmation,
  buildOrderFromConfirmation,
  buildProShopServiceFromForm,
  buildProfileHref,
  buildShopCategoryHref,
  buildShopCheckoutHref,
  buildShopHomeHref,
  buildShopServiceHref,
  buildShopSuccessHref,
  calculatePaymentSummary,
  countActiveShopFilters,
  filterProShopServices,
  filterShopServices,
  findProShopServiceById,
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

// ============================================================================
// PROFESSIONAL SHOP SERVICE HOOKS
// ============================================================================

export function useProShopHomeService() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const shopProfile = useAppSelector(selectProShopProfile);
  const storeServices = useAppSelector(selectProShopServices);
  const activeTab = useAppSelector(selectProShopActiveTab);
  const searchQuery = useAppSelector(selectProShopSearchQuery);
  const statusFilter = useAppSelector(selectProShopStatusFilter);

  const { data: apiServices } = useGetProShopServicesQuery(
    { search: searchQuery, status: statusFilter },
    { skip: false }
  );
  const [deleteServiceMutation] = useDeleteProShopServiceMutation();

  const allServices = apiServices ?? storeServices;

  const filteredServices = useMemo(
    () => filterProShopServices(allServices, searchQuery, statusFilter),
    [allServices, searchQuery, statusFilter]
  );

  const activeServicesCount = useMemo(
    () => allServices.filter((s) => s.status === "active").length,
    [allServices]
  );

  const [deletingService, setDeletingService] =
    useState<ProShopServiceItem | null>(null);

  const setActiveTab = (tab: ProShopMainTab) => {
    dispatch(setProShopActiveTab(tab));
  };

  const setSearchQuery = (query: string) => {
    dispatch(setProShopSearchQuery(query));
  };

  const setStatusFilter = (status: ProShopStatusFilter) => {
    dispatch(setProShopStatusFilter(status));
  };

  const handleEditShop = () => {
    router.push("/settings");
  };

  const handleCreateService = () => {
    router.push("/shop/new");
  };

  const handleOpenService = (service: ProShopServiceItem) => {
    router.push(`/shop/service/${encodeURIComponent(service.id)}`);
  };

  const handleEditService = (service: ProShopServiceItem) => {
    router.push(`/shop/service/${encodeURIComponent(service.id)}/edit`);
  };

  const handleConfirmDeleteService = async () => {
    if (!deletingService) return;
    try {
      await deleteServiceMutation({ id: deletingService.id }).unwrap();
    } catch {
      // Fallback to local state removal
    }
    dispatch(deleteProShopServiceLocal(deletingService.id));
    toast.success(`"${deletingService.title}" has been deleted from your shop.`);
    setDeletingService(null);
  };

  return {
    shopProfile,
    allServices,
    filteredServices,
    activeServicesCount,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    deletingService,
    setDeletingService,
    handleEditShop,
    handleCreateService,
    handleOpenService,
    handleEditService,
    handleConfirmDeleteService,
  };
}

export function useProShopServiceManagement(serviceId: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeServices = useAppSelector(selectProShopServices);
  const [togglePublishMutation] = useToggleProShopServicePublishMutation();
  const [deleteServiceMutation] = useDeleteProShopServiceMutation();

  const service = useMemo<ProShopServiceItem>(() => {
    return (
      findProShopServiceById(storeServices, serviceId) ??
      findProShopServiceById(DEFAULT_PRO_SHOP_SERVICES, serviceId) ??
      DEFAULT_PRO_SHOP_SERVICES[DEFAULT_PRO_SHOP_SERVICES.length - 1]
    );
  }, [storeServices, serviceId]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleBackToShop = () => {
    router.push("/shop");
  };

  const handleEditService = () => {
    router.push(`/shop/service/${encodeURIComponent(service.id)}/edit`);
  };

  const handleTogglePublish = async () => {
    const nextStatus: ProShopServiceStatus =
      service.status === "active" ? "inactive" : "active";
    try {
      await togglePublishMutation({
        id: service.id,
        status: nextStatus,
      }).unwrap();
    } catch {
      // Local fallback
    }
    dispatch(toggleProShopServiceStatusLocal(service.id));
    toast.success(
      nextStatus === "active"
        ? `"${service.title}" is now published and visible to customers.`
        : `"${service.title}" has been unpublished.`
    );
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteServiceMutation({ id: service.id }).unwrap();
    } catch {
      // Local fallback
    }
    dispatch(deleteProShopServiceLocal(service.id));
    setDeleteModalOpen(false);
    toast.success(`"${service.title}" has been deleted.`);
    router.push("/shop");
  };

  const handleViewAnalytics = () => {
    toast.info(`Detailed analytics for "${service.title}" coming soon.`);
  };

  return {
    service,
    activeImageIndex,
    setActiveImageIndex,
    deleteModalOpen,
    setDeleteModalOpen,
    handleBackToShop,
    handleEditService,
    handleTogglePublish,
    handleConfirmDelete,
    handleViewAnalytics,
  };
}

export function useProShopServiceFormService(serviceId?: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeServices = useAppSelector(selectProShopServices);
  const [createMutation] = useCreateProShopServiceMutation();
  const [updateMutation] = useUpdateProShopServiceMutation();

  const existingService = useMemo(
    () =>
      serviceId
        ? findProShopServiceById(storeServices, serviceId) ??
          findProShopServiceById(DEFAULT_PRO_SHOP_SERVICES, serviceId)
        : undefined,
    [storeServices, serviceId]
  );

  const [values, setValues] = useState<ProShopServiceFormValues>(() => {
    if (existingService) {
      return {
        title: existingService.title,
        category: existingService.category,
        deliveryValue: existingService.deliveryValue,
        deliveryUnit: existingService.deliveryUnit,
        description: existingService.fullDescription,
        price: String(existingService.price),
        coverImageUrl: existingService.coverImageUrl,
        galleryImages: existingService.galleryImages,
      };
    }
    return INITIAL_PRO_SERVICE_FORM_VALUES;
  });

  const [publishedService, setPublishedService] =
    useState<ProShopServiceItem | null>(null);

  const handleCancel = () => {
    if (existingService) {
      router.push(`/shop/service/${encodeURIComponent(existingService.id)}`);
    } else {
      router.push("/shop");
    }
  };

  const handleSave = async (status: ProShopServiceStatus) => {
    if (!values.title.trim()) {
      toast.error("Please enter a service title.");
      return;
    }

    const builtService = buildProShopServiceFromForm(
      values,
      status,
      existingService
    );

    try {
      if (existingService) {
        await updateMutation({
          id: existingService.id,
          values,
          status,
        }).unwrap();
      } else {
        await createMutation({ values, status }).unwrap();
      }
    } catch {
      // Fallback to local state persistence
    }

    if (existingService) {
      dispatch(updateProShopServiceLocal(builtService));
    } else {
      dispatch(addProShopServiceLocal(builtService));
    }

    if (status === "draft") {
      toast.success(`"${builtService.title}" saved as draft.`);
      router.push("/shop");
      return;
    }

    setPublishedService(builtService);
    toast.success("Service published successfully!");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGoToMyShop = () => {
    router.push("/shop");
  };

  const handleViewPublishedService = () => {
    if (!publishedService) return;
    router.push(`/shop/service/${encodeURIComponent(publishedService.id)}`);
  };

  return {
    isEditing: Boolean(existingService),
    existingService,
    values,
    setValues,
    publishedService,
    handleCancel,
    handleSaveDraft: () => handleSave("draft"),
    handlePublishService: () => handleSave("active"),
    handleGoToMyShop,
    handleViewPublishedService,
  };
}


