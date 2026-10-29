export type VerificationType = "company" | "individual";

export type SearchCardLayout = "horizontal" | "studio";

export interface SearchFilterCategoryOption {
  id: string;
  label: string;
}

export interface SearchFilterState {
  categories: string[];
  location: string;
  verifications: VerificationType[];
  minRating: number | null;
}

export interface SearchProfessionalItem {
  id: string;
  name: string;
  subtitle: string;
  categoryIds: string[];
  location: string;
  cityGroup: string;
  rating: number;
  reviewCount?: number;
  verification: VerificationType;
  isTopRated?: boolean;
  isFavorite?: boolean;
  imageUrl: string;
  cardVariant?: SearchCardLayout;
}
