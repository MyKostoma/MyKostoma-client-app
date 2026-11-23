import type {
  CompanyOperatingHourItem,
  CompanyProfileDetails,
  CompanyTrustCheckItem,
  ConsumerAddressTag,
  ConsumerContactPreference,
  ConsumerProfileData,
  ConsumerProfileStats,
  ConsumerProfileTabId,
  ConsumerRecentActivityItem,
  ConsumerSavedAddress,
  ConsumerSavedProCardItem,
  ConsumerWrittenReview,
  ProfessionalProfileData,
  ProfileEntityMode,
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
  CompanyOperatingHourItem,
  CompanyProfileDetails,
  CompanyTrustCheckItem,
  ConsumerAddressTag,
  ConsumerContactPreference,
  ConsumerProfileData,
  ConsumerProfileStats,
  ConsumerProfileTabId,
  ConsumerRecentActivityItem,
  ConsumerSavedAddress,
  ConsumerSavedProCardItem,
  ConsumerWrittenReview,
  ProfessionalProfileData,
  ProfileEntityMode,
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
  entityMode?: ProfileEntityMode;
  forcePerspective?: "owner" | "customer";
  initialTab?: ProfileTabId;
  initialMessagingOpen?: boolean;
  initialFollowing?: boolean;
}

export interface EditProfileViewProps {
  mode?: ProfileEntityMode;
}

export interface ProfilePhotoViewProps {
  mode?: ProfileEntityMode;
}

export interface EditProfileFormValues {
  fullName: string;
  category: string;
  location: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
}

export interface ConsumerEditProfileFormValues {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  preferredContact: ConsumerContactPreference;
  serviceInterests: string[];
  avatarUrl: string;
}

export interface ConsumerAddressFormValues {
  id?: string;
  label: string;
  tag: ConsumerAddressTag;
  streetAddress: string;
  area: string;
  landmark?: string;
  phone: string;
  accessNotes?: string;
  isDefault: boolean;
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
