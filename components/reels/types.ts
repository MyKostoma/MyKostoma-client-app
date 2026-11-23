export type ReelsFeedTabId = "discover" | "following";

export type ReelsViewMode = "my-reels" | "discover" | "following";

export type MyReelsFilterTab = "all" | "draft" | "scheduled";

export type ReelVisibility = "public" | "draft" | "scheduled";

export type ReelUploadPhase = "form" | "uploading" | "success" | "failed";

export type CreatorProfileTabId = "reels" | "about" | "services";

export interface ReelCreatorServiceItem {
  id: string;
  title: string;
  description: string;
  priceFormatted: string;
  durationLabel: string;
}

export interface ReelCreatorProfile {
  id: string;
  name: string;
  roleTitle: string;
  categoryBadge: string;
  avatarUrl: string;
  verified: boolean;
  bio: string;
  location: string;
  websiteLabel?: string;
  websiteUrl?: string;
  reelsCount: number;
  followersCount: number;
  followingCount: number;
  services: ReelCreatorServiceItem[];
}

export interface ReelItem {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorRole: string;
  creatorAvatarUrl: string;
  creatorVerified: boolean;
  title: string;
  caption: string;
  hashtags: string[];
  thumbnailUrl: string;
  videoUrl?: string;
  durationSeconds: number;
  likesCount: number;
  viewsCount: number;
  commentsCount: number;
  audioLabel: string;
  uploadedAtLabel: string;
  createdAtISO: string;
}

export interface ManagedReelItem extends ReelItem {
  status: ReelVisibility;
  viewsTrendLabel: string;
  engagementRateLabel: string;
  commentsTodayLabel: string;
  fileName?: string;
}

export interface ReelsFeedTabsProps {
  activeTab: ReelsFeedTabId;
  onTabChange: (tab: ReelsFeedTabId) => void;
  className?: string;
}

export interface ReelFeedCardProps {
  reel: ReelItem;
  isLiked: boolean;
  isFollowing: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  isReported?: boolean;
  onTogglePlay: (reelId: string) => void;
  onToggleMute: () => void;
  onToggleLike: (reelId: string) => void;
  onToggleFollow: (creatorId: string, creatorName: string) => void;
  onShare: (reel: ReelItem) => void;
  onOpenCreator: (creatorId: string) => void;
  onHashtagClick: (tag: string) => void;
  onRequestReport: (reel: ReelItem) => void;
  onViewFullProfile: (creatorId: string) => void;
}

export interface MyReelsTabsProps {
  activeTab: MyReelsFilterTab;
  allCount: number;
  draftsCount: number;
  scheduledCount: number;
  onTabChange: (tab: MyReelsFilterTab) => void;
  className?: string;
}

export interface MyReelGridCardProps {
  reel: ManagedReelItem;
  onManage: (reelId: string) => void;
  onPreview: (reel: ManagedReelItem) => void;
}

export interface ManageReelWorkspaceProps {
  reel: ManagedReelItem;
  isPlaying: boolean;
  isMuted: boolean;
  progressPercent: number;
  onBack: () => void;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onScrub: (percent: number) => void;
  onOpenEdit: () => void;
  onShareLink: () => void;
  onOpenDelete: () => void;
}

export interface ReelUploadFormProps {
  selectedFile: File | null;
  fileName: string;
  fileSizeLabel: string;
  videoPreviewUrl: string;
  title: string;
  caption: string;
  hashtags: string;
  visibility: ReelVisibility;
  coverOptions: readonly string[];
  selectedCoverUrl: string;
  titleError?: string;
  fileError?: string;
  onFileSelect: (file: File) => void;
  onUseSampleClip: () => void;
  onClearFile: () => void;
  onTitleChange: (value: string) => void;
  onCaptionChange: (value: string) => void;
  onHashtagsChange: (value: string) => void;
  onVisibilityChange: (value: ReelVisibility) => void;
  onSelectCover: (url: string) => void;
  onCustomCoverSelect: (file: File) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export interface ReelUploadProgressProps {
  fileName: string;
  progress: number;
  onCancelUpload: () => void;
}

export interface ReelUploadSuccessProps {
  title: string;
  thumbnailUrl: string;
  followersCountLabel: string;
  onViewReel: () => void;
  onDone: () => void;
  onSharePlatform: (platform: string) => void;
}

export interface ReelUploadFailedProps {
  errorCode: string;
  errorMessage: string;
  onTryAgain: () => void;
  onCancel: () => void;
}

export interface CreatorProfileHeaderProps {
  creator: ReelCreatorProfile;
  isFollowing: boolean;
  onToggleFollow: () => void;
  onMessageCreator: () => void;
  onViewFullStorefront: () => void;
  onCopyProfileLink: () => void;
}

export interface CreatorReelsGridProps {
  reels: ReelItem[];
  onSelectReel: (index: number) => void;
}

export interface ReelsProOnlyGateProps {
  featureTitle?: string;
  description?: string;
  onBackToFeed: () => void;
}
