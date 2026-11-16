export type ProfileTabId = "services" | "portfolio" | "reviews" | "about";

export type FollowInteractionState = "default" | "active" | "hover-unfollow";

export type ServiceIconVariant = "info" | "warning" | "primary" | "success";

export interface ProfileServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  priceLabel: string;
  priceValue: string;
  ctaLabel: string;
  ctaVariant?: "default" | "outline";
  iconName: "pie-chart" | "store" | "briefcase" | "sparkles";
  iconVariant: ServiceIconVariant;
}

export interface ProfilePortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface ProfileRatingBarItem {
  stars: number;
  percentage: number;
}

export interface ProfileReviewItem {
  id: string;
  authorName: string;
  authorRole: string;
  timeAgo: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  professionalResponse?: string;
}

export interface ProfessionalProfileData {
  id: string;
  name: string;
  roleTitle: string;
  verificationLabel: string;
  verificationType: "individual" | "company";
  location: string;
  rating: number;
  reviewCount: number;
  experienceLabel: string;
  avatarUrl: string;
  bio: string;
  responseTimeText: string;
  services: ProfileServiceItem[];
  portfolio: ProfilePortfolioItem[];
  ratingBreakdown: ProfileRatingBarItem[];
  reviews: ProfileReviewItem[];
  quickActions: string[];
}
