import type { HTMLAttributes } from "react";

export type ProfileTabId = "overview" | "services" | "portfolio" | "reviews";

export type ProfileEntityMode = "individual" | "company" | "consumer";

export type ConsumerProfileTabId =
  | "overview"
  | "addresses"
  | "saved-pros"
  | "reviews";

export type ConsumerContactPreference =
  | "in-app"
  | "phone"
  | "whatsapp"
  | "email";

export type ConsumerAddressTag = "Home" | "Office" | "Other";

export type FollowInteractionState = "default" | "active" | "hover-unfollow";

export type ServiceIconVariant = "info" | "warning" | "primary" | "success";

export type ProfileSortPortfolio = "newest" | "oldest" | "title";

export type ProfileSortReview = "recent" | "highest" | "lowest";

export type ProfileReviewFilter =
  | "all"
  | "5"
  | "4"
  | "3"
  | "with-photos"
  | "needs-reply";

export interface ProfileTabOption {
  id: ProfileTabId;
  label: string;
}

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
  imageUrl?: string;
  deliveryTime?: string;
  revisionsLabel?: string;
  categoryTags?: string[];
}

export interface ProfilePortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  dateLabel?: string;
  createdAtISO?: string;
  description?: string;
  tags?: string[];
  filterCategory?: string;
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
  verifiedPurchase?: boolean;
  dateLabel?: string;
  createdAtISO?: string;
  professionalResponseDate?: string;
  photos?: string[];
  helpfulCount?: number;
}

export interface CompanyTrustCheckItem {
  id: string;
  label: string;
  verified: boolean;
}

export interface CompanyOperatingHourItem {
  day: string;
  hours: string;
  isClosed?: boolean;
}

export interface CompanySocialLinks {
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  website?: string;
}

export interface CompanyProfileDetails {
  coverImageUrl?: string;
  logoMonogram?: string;
  teamStrength: string;
  yearsActive: string;
  projectsCompleted: string;
  activeCoverageLabel: string;
  hqLabel: string;
  coverageZones: string[];
  cacNumber: string;
  cacStatusLabel: string;
  trustChecks: CompanyTrustCheckItem[];
  operatingHours: CompanyOperatingHourItem[];
  isCurrentlyOpen: boolean;
  socialLinks: CompanySocialLinks;
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
  category?: string;
  skills?: string[];
  companyDetails?: CompanyProfileDetails;
  services: ProfileServiceItem[];
  portfolio: ProfilePortfolioItem[];
  ratingBreakdown: ProfileRatingBarItem[];
  reviews: ProfileReviewItem[];
  quickActions: string[];
}

export interface ProfilePhotoGuidelineItem {
  id: string;
  title: string;
  description: string;
  icon: "requirements" | "safety" | "quality" | "visibility";
}

export interface ProfileTabsNavProps {
  tabs?: ProfileTabOption[];
  activeTab: ProfileTabId;
  onTabChange: (tab: ProfileTabId) => void;
  profile?: ProfessionalProfileData;
  isOwner?: boolean;
  onMessageClick?: () => void;
  onEditClick?: () => void;
  isStuck?: boolean;
  className?: string;
}

export interface ProfileHeaderCardProps {
  profile: ProfessionalProfileData;
  companyDetails?: CompanyProfileDetails;
  activeTab?: ProfileTabId;
  onTabChange?: (tab: ProfileTabId) => void;
  isOwner?: boolean;
  isPreviewingAsClient?: boolean;
  isFollowing: boolean;
  onToggleFollow: () => void;
  isMessagingOpen: boolean;
  onToggleMessaging: () => void;
  messageText: string;
  onMessageTextChange: (text: string) => void;
  onSendMessage: () => void;
  onEditProfileClick?: () => void;
  onEditPhotoClick?: () => void;
  onShareProfileClick?: () => void;
  onTogglePreviewAsClient?: () => void;
  showTabs?: boolean;
  className?: string;
}

export interface CompanyIdentitySectionProps {
  profile: ProfessionalProfileData;
  companyDetails: CompanyProfileDetails;
  onSocialClick?: (platform: string) => void;
}

export interface AvailableServiceCardProps {
  service: ProfileServiceItem;
  isOwner?: boolean;
  onActionClick?: (service: ProfileServiceItem) => void;
  className?: string;
}

export interface AvailableServicesSectionProps
  extends HTMLAttributes<HTMLElement> {
  title?: string;
  actionLabel?: string;
  isOwner?: boolean;
  services: ProfileServiceItem[];
  onViewAllClick?: () => void;
  onServiceAction?: (service: ProfileServiceItem) => void;
}

export interface PortfolioShowcaseSectionProps
  extends HTMLAttributes<HTMLElement> {
  title?: string;
  actionLabel?: string;
  isOwner?: boolean;
  items: ProfilePortfolioItem[];
  onViewAllClick?: () => void;
  onAddProjectClick?: () => void;
  onItemClick?: (item: ProfilePortfolioItem) => void;
}

export interface ProfileServicesTabProps {
  services: ProfileServiceItem[];
  searchQuery: string;
  isOwner?: boolean;
  onSearchChange: (value: string) => void;
  onBookService: (service: ProfileServiceItem) => void;
  onInquireService: (service: ProfileServiceItem) => void;
  onManageService: (service: ProfileServiceItem) => void;
  onAddNewService?: () => void;
}

export interface ProfilePortfolioTabProps {
  items: ProfilePortfolioItem[];
  categories: string[];
  selectedCategory: string;
  sortBy: ProfileSortPortfolio;
  currentPage: number;
  totalPages: number;
  isOwner?: boolean;
  onSelectCategory: (category: string) => void;
  onSortChange: (sort: ProfileSortPortfolio) => void;
  onPageChange: (page: number) => void;
  onItemClick: (item: ProfilePortfolioItem) => void;
  onAddProject?: () => void;
  onDeleteProject?: (projectId: string) => void;
}

export interface RatingSummaryCardProps {
  rating: number;
  reviewCount: number;
  breakdown: ProfileRatingBarItem[];
  isOwner?: boolean;
  repliedCount?: number;
  onWriteReview?: () => void;
  className?: string;
}

export interface ClientReviewCardProps {
  review: ProfileReviewItem;
  professionalName?: string;
  isOwner?: boolean;
  isHelpfulActive?: boolean;
  onToggleHelpful?: (reviewId: string) => void;
  onShareReview?: (review: ProfileReviewItem) => void;
  onSubmitReply?: (reviewId: string, responseText: string) => void;
  className?: string;
}

export interface ClientReviewsSectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  actionLabel?: string;
  professionalName?: string;
  isOwner?: boolean;
  rating: number;
  reviewCount: number;
  breakdown: ProfileRatingBarItem[];
  reviews: ProfileReviewItem[];
  helpfulReviewIds?: string[];
  onViewAllClick?: () => void;
  onToggleHelpful?: (reviewId: string) => void;
  onShareReview?: (review: ProfileReviewItem) => void;
  onSubmitReply?: (reviewId: string, responseText: string) => void;
  onWriteReview?: () => void;
}

export interface ProfileReviewsTabProps {
  professionalName: string;
  rating: number;
  reviewCount: number;
  breakdown: ProfileRatingBarItem[];
  reviews: ProfileReviewItem[];
  totalFilteredCount: number;
  repliedCount: number;
  sortBy: ProfileSortReview;
  filterBy: ProfileReviewFilter;
  currentPage: number;
  totalPages: number;
  isOwner?: boolean;
  helpfulReviewIds: string[];
  onSortChange: (sort: ProfileSortReview) => void;
  onFilterChange: (filter: ProfileReviewFilter) => void;
  onPageChange: (page: number) => void;
  onToggleHelpful: (reviewId: string) => void;
  onShareReview: (review: ProfileReviewItem) => void;
  onSubmitReply: (reviewId: string, responseText: string) => void;
  onWriteReview?: () => void;
}

export interface EditProfileFormProps {
  variant?: ProfileEntityMode;
  fullName: string;
  fullNameError?: string;
  category: string;
  categoryOptions: readonly string[];
  location: string;
  locationError?: string;
  locationPresets: readonly string[];
  showMapPicker: boolean;
  bio: string;
  bioError?: string;
  skills: string[];
  skillInput: string;
  avatarUrl: string;
  isSaving?: boolean;
  onFullNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onToggleMapPicker: () => void;
  onSelectPresetLocation: (loc: string) => void;
  onBioChange: (value: string) => void;
  onSkillInputChange: (value: string) => void;
  onAddSkill: (skill?: string) => void;
  onRemoveSkill: (skill: string) => void;
  onUploadPhotoClick: () => void;
  onRemovePhoto: () => void;
  onRequestContactUpdate: () => void;
  onBack: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export interface ProfilePhotoFormProps {
  variant?: ProfileEntityMode;
  displayName: string;
  previewUrl: string;
  hasCustomPhoto: boolean;
  selectedFileName?: string;
  fileError?: string;
  dimensionWarning?: string;
  guidelines: readonly ProfilePhotoGuidelineItem[];
  isSaving?: boolean;
  onFileSelect: (file: File) => void;
  onRemovePhoto: () => void;
  onBack: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export interface ConsumerSavedAddress {
  id: string;
  label: string;
  tag: ConsumerAddressTag;
  streetAddress: string;
  area: string;
  landmark?: string;
  phone: string;
  accessNotes?: string;
  isDefault: boolean;
}

export interface ConsumerWrittenReview {
  id: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar: string;
  professionalCategory: string;
  rating: number;
  dateLabel: string;
  comment: string;
  professionalResponse?: string;
}

export interface ConsumerProfileData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  memberSince: string;
  avatarUrl: string;
  bio: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  preferredContact: ConsumerContactPreference;
  serviceInterests: string[];
  savedAddresses: ConsumerSavedAddress[];
  savedProIds: string[];
  writtenReviews: ConsumerWrittenReview[];
}

export interface ConsumerProfileStats {
  activeOrdersCount: number;
  openRequestsCount: number;
  walletBalanceFormatted: string;
  savedProsCount: number;
}

export interface ConsumerSavedProCardItem {
  id: string;
  name: string;
  roleTitle: string;
  location: string;
  rating: number;
  reviewCount: number;
  avatarUrl: string;
  logoMonogram?: string;
  verificationLabel: string;
  verificationType: "individual" | "company";
}

export interface ConsumerRecentActivityItem {
  id: string;
  kind: "order" | "request";
  title: string;
  subtitle: string;
  statusLabel: string;
  statusVariant: "info" | "warning" | "success" | "muted";
  href: string;
}

export interface ConsumerProfileHeaderProps {
  profile: ConsumerProfileData;
  stats: ConsumerProfileStats;
  onEditProfileClick: () => void;
  onEditPhotoClick: () => void;
  onPostRequestClick: () => void;
  onStatTabJump: (tab: ConsumerProfileTabId) => void;
  onOpenWalletClick: () => void;
  onOpenOrdersClick: () => void;
  onOpenRequestsClick: () => void;
}

export interface ConsumerProfileTabsProps {
  activeTab: ConsumerProfileTabId;
  addressesCount: number;
  savedProsCount: number;
  reviewsCount: number;
  onTabChange: (tab: ConsumerProfileTabId) => void;
}

export interface ConsumerOverviewSectionProps {
  profile: ConsumerProfileData;
  defaultAddress?: ConsumerSavedAddress;
  recentActivity: ConsumerRecentActivityItem[];
  onManageAddresses: () => void;
  onAddAddress: () => void;
  onEditProfile: () => void;
  onViewAllOrders: () => void;
  onViewAllRequests: () => void;
}

export interface ConsumerAddressesSectionProps {
  addresses: ConsumerSavedAddress[];
  onAddAddress: () => void;
  onEditAddress: (address: ConsumerSavedAddress) => void;
  onDeleteAddress: (addressId: string) => void;
  onSetDefaultAddress: (addressId: string) => void;
}

export interface ConsumerSavedProsSectionProps {
  professionals: ConsumerSavedProCardItem[];
  onViewProfile: (proId: string) => void;
  onMessagePro: (proId: string) => void;
  onRemoveSavedPro: (proId: string) => void;
  onExplorePros: () => void;
}

export interface ConsumerReviewsGivenSectionProps {
  reviews: ConsumerWrittenReview[];
  onViewProfessional: (proId: string) => void;
  onEditReview: (reviewId: string, rating: number, comment: string) => void;
  onDeleteReview: (reviewId: string) => void;
  onBrowseOrders: () => void;
}

export interface ConsumerEditProfileFormProps {
  fullName: string;
  fullNameError?: string;
  email: string;
  emailError?: string;
  phone: string;
  phoneError?: string;
  location: string;
  locationError?: string;
  locationPresets: readonly string[];
  showMapPicker: boolean;
  bio: string;
  bioError?: string;
  preferredContact: ConsumerContactPreference;
  contactOptions: readonly {
    value: ConsumerContactPreference;
    label: string;
  }[];
  serviceInterests: string[];
  interestOptions: readonly string[];
  avatarUrl: string;
  isSaving?: boolean;
  onFullNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onToggleMapPicker: () => void;
  onSelectPresetLocation: (preset: string) => void;
  onBioChange: (value: string) => void;
  onPreferredContactChange: (pref: ConsumerContactPreference) => void;
  onToggleInterest: (interest: string) => void;
  onUploadPhotoClick: () => void;
  onRemovePhoto: () => void;
  onBack: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}
