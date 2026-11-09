import type { ConsumerCategoryItem, SpotlightProviderItem } from "@/components/consumer-home/types";
import type { ConsumerOrderItem } from "@/components/orders/types";
import type {
  ShopCategory,
  ShopFilterState,
  ShopOrderConfirmation,
  ShopPaymentSummary,
  ShopServiceItem,
  ShopSortOption,
} from "@/components/shop/types";
import {
  SHOP_ALL_CATEGORY,
  SHOP_CATEGORIES,
  SHOP_DELIVERY_WINDOW_DAYS,
  SHOP_PLATFORM_FEE_RATE,
} from "../data";

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDelivery(days: number): string {
  if (days <= 0) return "Same Day";
  return days === 1 ? "1 Day" : `${days} Days`;
}

export function buildShopHomeHref(): string {
  return "/shop";
}

export function buildShopCategoryHref(categoryId: string): string {
  return `/shop/category/${encodeURIComponent(categoryId)}`;
}

export function buildShopServiceHref(serviceId: string): string {
  return `/shop/service/${encodeURIComponent(serviceId)}`;
}

export function buildShopCheckoutHref(serviceId: string): string {
  return `/shop/checkout/${encodeURIComponent(serviceId)}`;
}

export function buildShopSuccessHref(orderCode: string): string {
  return `/shop/success/${encodeURIComponent(orderCode)}`;
}

export function buildProfileHref(providerId: string): string {
  return `/profile/${encodeURIComponent(providerId)}`;
}

export function findShopCategoryById(categoryId: string): ShopCategory {
  return (
    SHOP_CATEGORIES.find((category) => category.id === categoryId) ??
    SHOP_ALL_CATEGORY
  );
}

export function findShopServiceById(
  services: ShopServiceItem[],
  serviceId: string
): ShopServiceItem | undefined {
  return services.find((service) => service.id === serviceId);
}

export function toggleListValue<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function countActiveShopFilters(filters: ShopFilterState): number {
  return (
    filters.subCategories.length +
    filters.deliveryWindows.length +
    filters.levels.length +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0)
  );
}

export function filterShopServices(
  services: ShopServiceItem[],
  categoryId: string,
  filters: ShopFilterState
): ShopServiceItem[] {
  const minPrice = filters.minPrice ? Number(filters.minPrice) : null;
  const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : null;
  const maxDeliveryDays = filters.deliveryWindows.length
    ? Math.max(
        ...filters.deliveryWindows.map(
          (window) => SHOP_DELIVERY_WINDOW_DAYS[window]
        )
      )
    : null;

  return services.filter((service) => {
    if (categoryId !== "all" && service.categoryId !== categoryId) return false;
    if (
      filters.subCategories.length > 0 &&
      !filters.subCategories.includes(service.subCategoryId)
    ) {
      return false;
    }
    if (minPrice !== null && service.price < minPrice) return false;
    if (maxPrice !== null && service.price > maxPrice) return false;
    if (maxDeliveryDays !== null && service.deliveryDays > maxDeliveryDays) {
      return false;
    }
    if (
      filters.levels.length > 0 &&
      !filters.levels.includes(service.provider.level)
    ) {
      return false;
    }
    return true;
  });
}

export function sortShopServices(
  services: ShopServiceItem[],
  sortBy: ShopSortOption
): ShopServiceItem[] {
  const sorted = [...services];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "delivery":
      return sorted.sort((a, b) => a.deliveryDays - b.deliveryDays);
    case "rating":
      return sorted.sort((a, b) => b.provider.rating - a.provider.rating);
    default:
      return sorted;
  }
}

export function mapShopCategoriesWithHandlers(
  categories: ShopCategory[],
  onSelectCategory: (categoryId: string) => void,
  limit = 6
): ConsumerCategoryItem[] {
  return categories.slice(0, limit).map((category) => ({
    id: category.id,
    name: category.name,
    countLabel: `${category.professionalsCount} Professionals`,
    icon: category.icon,
    onClick: onSelectCategory,
  }));
}

export function mapSpotlightProvidersWithHandlers(
  providers: SpotlightProviderItem[],
  onSelectProvider: (providerId: string) => void
): SpotlightProviderItem[] {
  return providers.map((provider) => ({
    ...provider,
    onClick: provider.onClick ?? onSelectProvider,
  }));
}

export function calculatePaymentSummary(servicePrice: number): ShopPaymentSummary {
  const platformFee =
    Math.round(servicePrice * SHOP_PLATFORM_FEE_RATE * 100) / 100;
  return {
    servicePrice,
    platformFee,
    total: servicePrice + platformFee,
  };
}

export function generateOrderCode(now: Date = new Date()): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  const letters = Array.from({ length: 2 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
  return `ORD-${now.getFullYear()}-${digits}-${letters}`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

const formatShortDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatLongDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export function buildOrderConfirmation(
  service: ShopServiceItem,
  summary: ShopPaymentSummary,
  orderCode: string,
  now: Date = new Date()
): ShopOrderConfirmation {
  return {
    orderCode,
    serviceId: service.id,
    serviceTitle: service.title,
    packageLabel: service.packageLabel,
    providerName: service.provider.name,
    providerVerified: service.provider.verified,
    providerAvatarUrl: service.provider.avatarUrl,
    total: summary.total,
    estimatedDelivery: addDays(now, service.deliveryDays).toISOString().slice(0, 10),
    placedAt: now.toISOString(),
  };
}

export function buildOrderFromConfirmation(
  service: ShopServiceItem,
  confirmation: ShopOrderConfirmation
): ConsumerOrderItem {
  const placedAt = new Date(confirmation.placedAt);
  const estimated = addDays(placedAt, service.deliveryDays);
  const totalAmount = formatNaira(confirmation.total);
  const { provider } = service;

  return {
    id: confirmation.orderCode,
    code: confirmation.orderCode,
    title: service.title,
    serviceArea: service.tagLabel,
    status: "in-progress",
    providerId: provider.id,
    providerName: provider.name,
    providerVerified: provider.verified,
    providerAvatar: provider.avatarUrl,
    providerRating: provider.rating,
    providerReviewsCount: provider.reviewsCount,
    providerLocation: provider.location,
    providerMemberSince: provider.memberSince,
    providerResponseTime: provider.responseTime,
    workAddress: "Delivered remotely through MyKostoma",
    quoteId: service.id,
    requestId: service.id,
    totalAmount,
    escrowStatusLabel: "Funds in Escrow",
    orderedAt: formatShortDate(placedAt),
    startedAt: formatShortDate(placedAt),
    estimatedCompletionAt: formatLongDate(estimated),
    completionPercentage: 0,
    timelineSteps: [
      {
        id: "placed",
        label: "Order Placed",
        dateLabel: formatShortDate(placedAt),
        state: "completed",
      },
      {
        id: "in-progress",
        label: "In Progress",
        dateLabel: "Started",
        state: "current",
      },
      { id: "review", label: "Review", dateLabel: "Pending", state: "upcoming" },
      { id: "completed", label: "Completed", dateLabel: "-", state: "upcoming" },
    ],
    lifecycleSteps: [
      {
        id: "pending",
        label: "Pending",
        dateLabel: formatShortDate(placedAt),
        state: "completed",
        statusSublabel: "Confirmed",
      },
      {
        id: "in-progress",
        label: "In Progress",
        dateLabel: "Started today",
        state: "current",
        statusSublabel: "Current State",
      },
      {
        id: "completed",
        label: "Completed",
        dateLabel: `Est. ${formatShortDate(estimated)}`,
        state: "upcoming",
      },
    ],
    milestones: [
      {
        id: "ms-1",
        title: "Service Delivery",
        subtitle: "In Progress",
        amount: totalAmount,
        status: "in-escrow",
      },
    ],
    latestUpdate: {
      title: "Order placed successfully",
      description: `${provider.name} has been notified and your payment is secured in escrow until the work is approved.`,
      updatedAgo: "Just now",
    },
    escrowSummary: {
      totalAmount,
      fundsReleased: formatNaira(0),
      remainingInEscrow: totalAmount,
      nextMilestoneName: "Service Delivery",
    },
  };
}

