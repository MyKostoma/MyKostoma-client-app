export type {
  CreatorProfileTabId,
  ManagedReelItem,
  MyReelsFilterTab,
  ReelCreatorProfile,
  ReelCreatorServiceItem,
  ReelItem,
  ReelsFeedTabId,
  ReelsViewMode,
  ReelUploadPhase,
  ReelVisibility,
} from "@/components/reels/types";

export interface ManageReelViewProps {
  reelId: string;
}

export interface CreatorReelsProfileViewProps {
  creatorId: string;
}

export interface UploadReelPayload {
  title: string;
  caption: string;
  hashtags: string[];
  visibility: "public" | "draft" | "scheduled";
  thumbnailUrl: string;
  fileName: string;
}

export interface UpdateReelPayload {
  reelId: string;
  title: string;
  caption: string;
  hashtags: string[];
  status: "public" | "draft" | "scheduled";
  audioLabel: string;
}

export interface ReportReelPayload {
  reelId: string;
  reason: string;
  details?: string;
}
