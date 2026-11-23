import type {
  ProfessionalProfileData,
  ProfilePhotoGuidelineItem,
  ProfilePortfolioItem,
  ProfileReviewFilter,
  ProfileReviewItem,
  ProfileServiceItem,
  ProfileSortPortfolio,
  ProfileSortReview,
  ProfileTabId,
} from "@/components/profile/types";

export type {
  ProfessionalProfileData,
  ProfilePhotoGuidelineItem,
  ProfilePortfolioItem,
  ProfileReviewFilter,
  ProfileReviewItem,
  ProfileServiceItem,
  ProfileSortPortfolio,
  ProfileSortReview,
  ProfileTabId,
};

export interface ProfileViewProps {
  profile?: ProfessionalProfileData;
  forcePerspective?: "owner" | "customer";
  initialTab?: ProfileTabId;
  initialMessagingOpen?: boolean;
  initialFollowing?: boolean;
}

export interface EditProfileFormValues {
  fullName: string;
  category: string;
  location: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
}

export interface AddPortfolioProjectPayload {
  title: string;
  filterCategory: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

export interface SubmitReviewPayload {
  profileId: string;
  rating: number;
  comment: string;
}

export interface RequestContactUpdatePayload {
  email?: string;
  phone?: string;
  reason: string;
}
