import type {
  ConsumerCategoryItem,
  FeaturedProItem,
} from "@/components/consumer-home/types";

export function buildCategorySearchHref(categoryId: string): string {
  return `/search?category=${encodeURIComponent(categoryId)}`;
}

export function buildBookProfessionalHref(proId: string): string {
  return `/search?pro=${encodeURIComponent(proId)}`;
}

export function mapHomeCategoriesWithHandlers(
  categories: ConsumerCategoryItem[],
  onSelectCategory: (categoryId: string) => void,
  limit = 6
): ConsumerCategoryItem[] {
  return categories.slice(0, limit).map((cat) => ({
    ...cat,
    onClick: cat.onClick ?? onSelectCategory,
  }));
}

export function mapFeaturedProfessionalsWithHandlers(
  professionals: FeaturedProItem[],
  onBookPro: (proId: string) => void,
  limit = 12
): FeaturedProItem[] {
  return professionals.slice(0, limit).map((pro) => ({
    ...pro,
    onBookClick: pro.onBookClick ?? onBookPro,
  }));
}

