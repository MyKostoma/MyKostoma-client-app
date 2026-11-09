import type {
  CreateDirectOrderPayload,
  ShopBadgeVariant,
  ShopBreadcrumbItem,
  ShopCategory,
  ShopFilterState,
  ShopOrderConfirmation,
  ShopPaymentSummary,
  ShopProviderInfo,
  ShopServiceItem,
  ShopSortOption,
} from "@/components/shop/types";

export type {
  CreateDirectOrderPayload,
  ShopBadgeVariant,
  ShopBreadcrumbItem,
  ShopCategory,
  ShopFilterState,
  ShopOrderConfirmation,
  ShopPaymentSummary,
  ShopProviderInfo,
  ShopServiceItem,
  ShopSortOption,
};

export interface ShopCategoryViewProps {
  categoryId: string;
}

export interface ShopServiceDetailViewProps {
  serviceId: string;
}

export interface ShopCheckoutViewProps {
  serviceId: string;
}

export interface ShopOrderSuccessViewProps {
  orderCode: string;
}

