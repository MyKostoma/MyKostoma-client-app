import type { ComponentType } from "react";

export type ShopBadgeVariant = "verified" | "corporate" | "top-rated";
export type ShopCardActionIcon = "plus" | "bookmark";
export type ShopProviderLevel = "expert" | "professional";
export type ShopDeliveryWindow = "24h" | "3d" | "7d";
export type ShopSortOption =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "delivery"
  | "rating";
export type ShopProviderStripVariant = "detail" | "compact";
export type ShopOrderPanelVariant = "card" | "inline";

export interface ShopProviderInfo {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  level: ShopProviderLevel;
  memberSince: string;
  location: string;
  responseTime: string;
  lastDelivery: string;
}

export interface ShopServiceItem {
  id: string;
  title: string;
  categoryId: string;
  subCategoryId: string;
  tagLabel: string;
  imageUrl: string;
  gallery: string[];
  badgeText?: string;
  badgeVariant?: ShopBadgeVariant;
  provider: ShopProviderInfo;
  price: number;
  deliveryDays: number;
  revisions: number;
  packageLabel: string;
  summary: string[];
  deliverables: string[];
  featured?: boolean;
}

export interface ShopSubCategory {
  id: string;
  label: string;
  count: number;
}

export interface ShopCategory {
  id: string;
  name: string;
  description: string;
  professionalsCount: number;
  icon: ComponentType<{ className?: string }>;
  subCategories: ShopSubCategory[];
}

export interface ShopFilterState {
  subCategories: string[];
  minPrice: string;
  maxPrice: string;
  deliveryWindows: ShopDeliveryWindow[];
  levels: ShopProviderLevel[];
}

export interface ShopFilterOption<T extends string> {
  id: T;
  label: string;
}

export interface ShopTrustHighlight {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  tone: "success" | "warning" | "info";
}

export interface ShopPaymentSummary {
  servicePrice: number;
  platformFee: number;
  total: number;
}

export interface ShopOrderConfirmation {
  orderCode: string;
  serviceId: string;
  serviceTitle: string;
  packageLabel: string;
  providerName: string;
  providerVerified: boolean;
  providerAvatarUrl?: string;
  total: number;
  estimatedDelivery: string;
  placedAt: string;
}

export interface CreateDirectOrderPayload {
  serviceId: string;
  acceptedTerms: boolean;
  acceptedScope: boolean;
}

export interface ShopBreadcrumbItem {
  label: string;
  href?: string;
}

export interface ShopBreadcrumbProps {
  items: ShopBreadcrumbItem[];
  onNavigate: (href: string) => void;
  className?: string;
}

export interface ShopServiceCardProps {
  service: ShopServiceItem;
  isSaved: boolean;
  actionIcon?: ShopCardActionIcon;
  onOpen: (serviceId: string) => void;
  onToggleSave: (serviceId: string) => void;
  className?: string;
}

export interface ShopServiceGridProps {
  services: ShopServiceItem[];
  savedServiceIds: string[];
  actionIcon?: ShopCardActionIcon;
  columns?: 3 | 4;
  onOpen: (serviceId: string) => void;
  onToggleSave: (serviceId: string) => void;
  className?: string;
}

export interface ShopFiltersSidebarProps {
  filters: ShopFilterState;
  subCategories: ShopSubCategory[];
  deliveryOptions: ShopFilterOption<ShopDeliveryWindow>[];
  levelOptions: ShopFilterOption<ShopProviderLevel>[];
  onToggleSubCategory: (id: string) => void;
  onPriceChange: (field: "minPrice" | "maxPrice", value: string) => void;
  onToggleDelivery: (window: ShopDeliveryWindow) => void;
  onToggleLevel: (level: ShopProviderLevel) => void;
  onApply: () => void;
  onReset: () => void;
  onClose?: () => void;
  className?: string;
}

export interface ShopServiceGalleryProps {
  images: string[];
  title: string;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

export interface ShopProviderStripProps {
  provider: ShopProviderInfo;
  variant?: ShopProviderStripVariant;
  onViewProfile?: () => void;
  className?: string;
}

export interface ShopServiceAboutProps {
  paragraphs: string[];
  deliverables: string[];
  className?: string;
}

export interface ShopTrustCardsProps {
  items: ShopTrustHighlight[];
  className?: string;
}

export interface ShopOrderPanelProps {
  service: ShopServiceItem;
  variant?: ShopOrderPanelVariant;
  onDirectOrder: () => void;
  className?: string;
}

export interface ShopProfessionalAboutProps {
  provider: ShopProviderInfo;
  onContact: () => void;
  className?: string;
}

export interface ShopOrderSummaryCardProps {
  service: ShopServiceItem;
  className?: string;
}

export interface ShopConsentListProps {
  termsAccepted: boolean;
  scopeAccepted: boolean;
  onTermsChange: (checked: boolean) => void;
  onScopeChange: (checked: boolean) => void;
  className?: string;
}

export interface ShopPaymentSummaryCardProps {
  summary: ShopPaymentSummary;
  canConfirm: boolean;
  isSubmitting: boolean;
  onConfirm: () => void;
  className?: string;
}

export interface ShopOrderSuccessProps {
  confirmation: ShopOrderConfirmation;
  onViewOrder: () => void;
  onBackToShop: () => void;
  className?: string;
}

// ============================================================================
// PROFESSIONAL SHOP MODULE TYPES
// ============================================================================

export type ProShopMainTab = "services" | "products" | "reviews" | "about";
export type ProShopServiceStatus = "active" | "inactive" | "draft";
export type ProShopStatusFilter = "all" | "active" | "inactive" | "draft";

export interface ProShopServiceInsights {
  impressions: string;
  orders: number;
  avgRating: number;
}

export interface ProShopServiceReview {
  reviewerName: string;
  reviewerAvatarUrl?: string;
  rating: number;
  comment: string;
}

export interface ProShopServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  packageLabel: string;
  price: number;
  priceFormatted: string;
  priceUnitLabel: string;
  status: ProShopServiceStatus;
  deliveryValue: string;
  deliveryUnit: "Days" | "Weeks" | "Hours";
  deliveryLabel: string;
  revisionsLabel: string;
  coverImageUrl: string;
  galleryImages: string[];
  tags: string[];
  insights: ProShopServiceInsights;
  latestReview?: ProShopServiceReview;
}

export interface ProShopProfile {
  shopName: string;
  badgeLabel: string;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  coverBannerUrl: string;
  aboutBio: string;
  location: string;
  responseTime: string;
}

export interface ProShopServiceFormValues {
  title: string;
  category: string;
  deliveryValue: string;
  deliveryUnit: "Days" | "Weeks" | "Hours";
  description: string;
  price: string;
  coverImageUrl: string;
  galleryImages: string[];
}

