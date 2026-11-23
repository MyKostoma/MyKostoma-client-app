"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentUser,
  selectUserRole,
} from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import {
  selectFollowedProIds,
  toggleFollowedProfessional,
  useToggleFollowProfessionalMutation,
} from "@/store/slices/discoverSlice";
import {
  addUploadedReelLocal,
  deleteManagedReelLocal,
  reportReelLocal,
  selectFeedReels,
  selectFollowedCreatorIds,
  selectLikedReelIds,
  selectManagedReelById,
  selectMyReels,
  selectReelCreatorById,
  selectReportedReelIds,
  setFollowCreatorLocal,
  toggleLikeReelLocal,
  updateManagedReelLocal,
  useDeleteReelMutation,
  useReportReelMutation,
  useToggleLikeReelMutation,
  useUpdateReelMutation,
  useUploadReelMutation,
} from "@/store/slices/reelsSlice";
import type {
  CreatorProfileTabId,
  ManagedReelItem,
  MyReelsFilterTab,
  ReelItem,
  ReelsViewMode,
  ReelUploadPhase,
  ReelVisibility,
} from "@/components/reels/types";
import {
  DEFAULT_MY_REELS,
  DEFAULT_REEL_CREATORS,
  REEL_COVER_PRESETS,
} from "../data";
import {
  formatFileSize,
  formatReelDate,
  normalizeMyReelsTab,
  normalizeReelsViewMode,
  parseHashtagsInput,
  validateReelVideoFile,
} from "./reelsHelpers";

export function useReelsHubService() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const feedReels = useAppSelector(selectFeedReels);
  const myReels = useAppSelector(selectMyReels);
  const likedReelIds = useAppSelector(selectLikedReelIds);
  const followedCreatorIds = useAppSelector(selectFollowedCreatorIds);
  const followedProIds = useAppSelector(selectFollowedProIds);
  const reportedReelIds = useAppSelector(selectReportedReelIds);

  const effectiveRole = userRole || activePerspective || "consumer";
  const isProfessional = effectiveRole === "professional";

  const viewParam = searchParams.get("view");
  const tabParam = searchParams.get("tab");

  const [viewMode, setViewMode] = useState<ReelsViewMode>(() =>
    normalizeReelsViewMode(viewParam, isProfessional)
  );
  const [myReelsTab, setMyReelsTab] = useState<MyReelsFilterTab>(() =>
    normalizeMyReelsTab(tabParam)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeHashtag, setActiveHashtag] = useState<string | null>(null);
  const [playingReelId, setPlayingReelId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [reportTarget, setReportTarget] = useState<ReelItem | null>(null);
  const [previewManagedReel, setPreviewManagedReel] =
    useState<ManagedReelItem | null>(null);

  const prevViewParamRef = useRef<string | null>(viewParam);
  const prevIsProfessionalRef = useRef<boolean>(isProfessional);

  const [toggleLikeMutation] = useToggleLikeReelMutation();
  const [toggleFollowProMutation] = useToggleFollowProfessionalMutation();
  const [reportReelMutation] = useReportReelMutation();

  useEffect(() => {
    const viewParamChanged = prevViewParamRef.current !== viewParam;
    const roleChanged = prevIsProfessionalRef.current !== isProfessional;
    prevViewParamRef.current = viewParam;
    prevIsProfessionalRef.current = isProfessional;

    if (viewParamChanged || roleChanged) {
      setViewMode((prev) =>
        viewParamChanged
          ? normalizeReelsViewMode(viewParam, isProfessional)
          : normalizeReelsViewMode(prev, isProfessional)
      );
      setPlayingReelId(null);
    }
  }, [isProfessional, viewParam]);

  useEffect(() => {
    if (tabParam) {
      setMyReelsTab(normalizeMyReelsTab(tabParam));
    }
  }, [tabParam]);

  const combinedFollowedIds = useMemo(() => {
    const merged = new Set<string>([
      ...followedCreatorIds.map((id) => id.toLowerCase()),
      ...followedProIds.map((id) => id.toLowerCase()),
    ]);
    return Array.from(merged);
  }, [followedCreatorIds, followedProIds]);

  const filteredFeedReels = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const tag = activeHashtag?.trim().toLowerCase();

    return feedReels.filter((reel) => {
      if (
        viewMode === "following" &&
        !combinedFollowedIds.includes(reel.creatorId.toLowerCase())
      ) {
        return false;
      }

      if (tag) {
        const hasTag = reel.hashtags.some(
          (item) => item.toLowerCase() === tag
        );
        if (!hasTag) return false;
      }

      if (q) {
        const hay = [
          reel.title,
          reel.caption,
          reel.creatorName,
          reel.creatorRole,
          ...reel.hashtags,
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });
  }, [activeHashtag, combinedFollowedIds, feedReels, searchQuery, viewMode]);

  const filteredMyReels = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return myReels.filter((reel) => {
      if (myReelsTab === "draft" && reel.status !== "draft") return false;
      if (myReelsTab === "scheduled" && reel.status !== "scheduled") return false;
      if (q) {
        const hay = [reel.title, reel.caption, ...reel.hashtags]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [myReels, myReelsTab, searchQuery]);

  const draftsCount = useMemo(
    () => myReels.filter((item) => item.status === "draft").length,
    [myReels]
  );

  const scheduledCount = useMemo(
    () => myReels.filter((item) => item.status === "scheduled").length,
    [myReels]
  );

  const handleModeChange = useCallback(
    (nextMode: ReelsViewMode) => {
      const safeMode = normalizeReelsViewMode(nextMode, isProfessional);
      setViewMode(safeMode);
      setPlayingReelId(null);
      router.replace(`/reels?view=${safeMode}`, { scroll: false });
    },
    [isProfessional, router]
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setPlayingReelId(null);
  }, []);

  const handleTogglePlay = useCallback((reelId: string) => {
    setPlayingReelId((prev) => (prev === reelId ? null : reelId));
  }, []);

  const handleToggleLike = useCallback(
    async (reelId: string) => {
      const nextLiked = !likedReelIds.includes(reelId);
      dispatch(toggleLikeReelLocal({ reelId }));
      try {
        await toggleLikeMutation({ reelId, liked: nextLiked }).unwrap();
      } catch {
        // Fallback already applied
      }
    },
    [dispatch, likedReelIds, toggleLikeMutation]
  );

  const handleToggleFollow = useCallback(
    async (creatorId: string, creatorName: string) => {
      const normalized = creatorId.trim().toLowerCase();
      const currentlyFollowing = combinedFollowedIds.includes(normalized);
      const nextFollowing = !currentlyFollowing;

      dispatch(setFollowCreatorLocal({ creatorId, following: nextFollowing }));

      const isFollowedInDiscover = followedProIds.some(
        (id) => id.trim().toLowerCase() === normalized
      );
      if (isFollowedInDiscover !== nextFollowing) {
        dispatch(toggleFollowedProfessional(creatorId));
      }

      try {
        await toggleFollowProMutation({
          id: creatorId,
          following: nextFollowing,
        }).unwrap();
      } catch {
        // Fallback already applied
      }
      toast.success(
        nextFollowing
          ? `Following ${creatorName}`
          : `Unfollowed ${creatorName}`
      );
    },
    [combinedFollowedIds, dispatch, followedProIds, toggleFollowProMutation]
  );

  const handleShareReel = useCallback(async (reel: ReelItem) => {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/reels/creator/${encodeURIComponent(reel.creatorId)}`
        : `/reels/creator/${encodeURIComponent(reel.creatorId)}`;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      toast.success(`Link to "${reel.title}" copied to clipboard!`);
    } catch {
      toast.success("Reel link ready to share!");
    }
  }, []);

  const handleConfirmReport = useCallback(
    async (payload: { reason: string; details: string }) => {
      if (!reportTarget) return;
      const targetId = reportTarget.id;
      try {
        await reportReelMutation({
          reelId: targetId,
          reason: payload.reason,
          details: payload.details,
        }).unwrap();
      } catch {
        // Fallback persists in Redux
      }
      dispatch(reportReelLocal({ reelId: targetId }));
      setReportTarget(null);
      toast.success("Reel reported to MyKostoma Trust & Safety.");
    },
    [dispatch, reportReelMutation, reportTarget]
  );

  const handleHashtagClick = useCallback((tag: string) => {
    setPlayingReelId(null);
    setActiveHashtag((prev) =>
      prev?.toLowerCase() === tag.toLowerCase() ? null : tag
    );
  }, []);

  const handleOpenCreator = useCallback(
    (creatorId: string) => {
      router.push(`/reels/creator/${encodeURIComponent(creatorId)}`);
    },
    [router]
  );

  const handleOpenFullProfile = useCallback(
    (creatorId: string) => {
      router.push(`/profile/${encodeURIComponent(creatorId)}`);
    },
    [router]
  );

  const handleOpenManageReel = useCallback(
    (reelId: string) => {
      router.push(`/reels/manage/${encodeURIComponent(reelId)}`);
    },
    [router]
  );

  const handleOpenUploadReel = useCallback(() => {
    router.push("/reels/upload");
  }, [router]);

  const handleClearFeedFilters = useCallback(() => {
    setSearchQuery("");
    setActiveHashtag(null);
  }, []);

  return {
    isProfessional,
    viewMode,
    myReelsTab,
    setMyReelsTab,
    searchQuery,
    setSearchQuery: handleSearchChange,
    mobileSearchOpen,
    setMobileSearchOpen,
    activeHashtag,
    setActiveHashtag,
    playingReelId,
    isMuted,
    setIsMuted,
    likedReelIds,
    combinedFollowedIds,
    reportedReelIds,
    filteredFeedReels,
    filteredMyReels,
    allMyReelsCount: myReels.length,
    draftsCount,
    scheduledCount,
    reportTarget,
    setReportTarget,
    previewManagedReel,
    setPreviewManagedReel,
    handleModeChange,
    handleTogglePlay,
    handleToggleLike,
    handleToggleFollow,
    handleShareReel,
    handleConfirmReport,
    handleHashtagClick,
    handleOpenCreator,
    handleOpenFullProfile,
    handleOpenManageReel,
    handleOpenUploadReel,
    handleClearFeedFilters,
  };
}

export function useManageReelService(reelId: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const storedReel = useAppSelector(selectManagedReelById(reelId));

  const effectiveRole = userRole || activePerspective || "consumer";
  const isProfessional = effectiveRole === "professional";

  const reel = storedReel ?? DEFAULT_MY_REELS[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progressPercent, setProgressPercent] = useState(28);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [updateReelMutation] = useUpdateReelMutation();
  const [deleteReelMutation] = useDeleteReelMutation();

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setProgressPercent((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 350);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const handleBack = useCallback(() => {
    router.push("/reels?view=my-reels");
  }, [router]);

  const handleSaveEdit = useCallback(
    async (payload: {
      reelId: string;
      title: string;
      caption: string;
      hashtags: string[];
      status: ReelVisibility;
      audioLabel: string;
    }) => {
      try {
        await updateReelMutation(payload).unwrap();
      } catch {
        // Fallback persists locally
      }
      dispatch(updateManagedReelLocal(payload));
      toast.success("Reel changes saved!");
    },
    [dispatch, updateReelMutation]
  );

  const handleShareLink = useCallback(async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/reels/creator/${encodeURIComponent(reel.creatorId)}`
        : `/reels/creator/${encodeURIComponent(reel.creatorId)}`;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      toast.success(`Share link for "${reel.title}" copied!`);
    } catch {
      toast.success("Share link copied!");
    }
  }, [reel.creatorId, reel.title]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await deleteReelMutation(reel.id).unwrap();
    } catch {
      // Fallback persists locally
    }
    dispatch(deleteManagedReelLocal({ reelId: reel.id }));
    toast.success(`"${reel.title}" was deleted.`);
    router.push("/reels?view=my-reels");
  }, [deleteReelMutation, dispatch, reel.id, reel.title, router]);

  return {
    isProfessional,
    reel,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
    progressPercent,
    setProgressPercent,
    editModalOpen,
    setEditModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    handleBack,
    handleSaveEdit,
    handleShareLink,
    handleConfirmDelete,
  };
}

export function useUploadReelService() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const currentUser = useAppSelector(selectCurrentUser);

  const effectiveRole = userRole || activePerspective || "consumer";
  const isProfessional = effectiveRole === "professional";

  const [phase, setPhase] = useState<ReelUploadPhase>("form");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSizeLabel, setFileSizeLabel] = useState("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [visibility, setVisibility] = useState<ReelVisibility>("public");
  const [selectedCoverUrl, setSelectedCoverUrl] = useState<string>(
    REEL_COVER_PRESETS[0]
  );
  const [customCovers, setCustomCovers] = useState<string[]>([]);
  const [titleError, setTitleError] = useState<string | undefined>(undefined);
  const [fileError, setFileError] = useState<string | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [errorCode, setErrorCode] = useState("ERR_NETWORK_TIMEOUT_502");
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong while processing your video. Please check your internet connection and try again."
  );
  const [createdReel, setCreatedReel] = useState<ManagedReelItem | null>(null);

  const uploadTimerRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  const createdObjectUrlsRef = useRef<string[]>([]);
  const committedUrlsRef = useRef<Set<string>>(new Set());

  const creatorRecord = useAppSelector(selectReelCreatorById("alex-rivera"));
  const [uploadReelMutation] = useUploadReelMutation();

  const clearUploadTimer = useCallback(() => {
    if (uploadTimerRef.current !== null) {
      window.clearInterval(uploadTimerRef.current);
      uploadTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const objectUrls = createdObjectUrlsRef.current;
    const committed = committedUrlsRef.current;
    return () => {
      clearUploadTimer();
      for (const url of objectUrls) {
        if (!committed.has(url)) {
          URL.revokeObjectURL(url);
        }
      }
    };
  }, [clearUploadTimer]);

  const coverOptions = useMemo(
    () => [...customCovers, ...REEL_COVER_PRESETS],
    [customCovers]
  );

  const handleFileSelect = useCallback((file: File) => {
    const check = validateReelVideoFile(file);
    if (!check.valid) {
      setFileError(check.errorMessage);
      toast.error(check.errorMessage || "Invalid video file.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    createdObjectUrlsRef.current.push(previewUrl);

    setSelectedFile(file);
    setFileName(file.name);
    setFileSizeLabel(formatFileSize(file.size));
    setVideoPreviewUrl(previewUrl);
    setFileError(undefined);

    if (!title.trim()) {
      const cleanedName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[_-]+/g, " ")
        .trim();
      if (cleanedName) {
        setTitle(
          cleanedName.replace(/\b\w/g, (ch) => ch.toUpperCase()).slice(0, 80)
        );
      }
    }
  }, [title]);

  const handleUseSampleClip = useCallback(() => {
    setSelectedFile(null);
    setFileName("workflow_v2_final.mp4");
    setFileSizeLabel("48.2 MB");
    setVideoPreviewUrl("");
    setFileError(undefined);
    if (!title.trim()) setTitle("Morning Workflow");
    if (!caption.trim()) {
      setCaption(
        "My typical morning workflow before heading to site consultations."
      );
    }
    if (!hashtags.trim()) setHashtags("#designlife #productivity");
  }, [caption, hashtags, title]);

  const handleClearFile = useCallback(() => {
    setSelectedFile(null);
    setFileName("");
    setFileSizeLabel("");
    setVideoPreviewUrl("");
    setFileError(undefined);
  }, []);

  const handleCustomCoverSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a PNG or JPG image for the reel cover.");
      return;
    }
    const url = URL.createObjectURL(file);
    createdObjectUrlsRef.current.push(url);
    setCustomCovers((prev) => [url, ...prev]);
    setSelectedCoverUrl(url);
  }, []);

  const beginUploadProgress = useCallback(
    (allowSimulatedFailCheck: boolean) => {
      clearUploadTimer();
      progressRef.current = 12;
      setPhase("uploading");
      setProgress(12);

      const resolvedTitle = title.trim() || "Morning Workflow";
      const parsedHashtags = parseHashtagsInput(hashtags);
      const effectiveCover = selectedCoverUrl || REEL_COVER_PRESETS[0];

      uploadTimerRef.current = window.setInterval(() => {
        const next = Math.min(100, progressRef.current + 16);
        progressRef.current = next;
        setProgress(next);

        if (
          allowSimulatedFailCheck &&
          next >= 64 &&
          fileName.toLowerCase().includes("fail")
        ) {
          clearUploadTimer();
          setErrorCode("ERR_NETWORK_TIMEOUT_502");
          setErrorMessage(
            "Something went wrong while processing your video. Please check your internet connection and try again."
          );
          setPhase("failed");
          return;
        }

        if (next >= 100) {
          clearUploadTimer();

          if (videoPreviewUrl) {
            committedUrlsRef.current.add(videoPreviewUrl);
          }
          if (effectiveCover.startsWith("blob:")) {
            committedUrlsRef.current.add(effectiveCover);
          }

          const now = new Date();
          const newReel: ManagedReelItem = {
            id: `my-reel-${Date.now()}`,
            creatorId: "alex-rivera",
            creatorName: currentUser?.fullName || "Alex Rivera",
            creatorRole: "UI/UX DESIGNER & CONTENT CREATOR",
            creatorAvatarUrl:
              currentUser?.avatarUrl ||
              DEFAULT_REEL_CREATORS[0].avatarUrl,
            creatorVerified: true,
            title: resolvedTitle,
            caption:
              caption.trim() ||
              "Sharing a quick behind-the-scenes project showcase with the MyKostoma community.",
            hashtags:
              parsedHashtags.length > 0 ? parsedHashtags : ["#mykostoma"],
            thumbnailUrl: effectiveCover,
            videoUrl: videoPreviewUrl || undefined,
            durationSeconds: 42,
            likesCount: 0,
            viewsCount: 1,
            commentsCount: 0,
            audioLabel: "Original Audio",
            uploadedAtLabel: formatReelDate(now),
            createdAtISO: now.toISOString().slice(0, 10),
            status: visibility,
            viewsTrendLabel: "Just uploaded",
            engagementRateLabel: "Collecting metrics",
            commentsTodayLabel: "0 today",
            fileName: fileName || "reel_upload.mp4",
          };

          void uploadReelMutation({
            title: newReel.title,
            caption: newReel.caption,
            hashtags: newReel.hashtags,
            visibility,
            thumbnailUrl: newReel.thumbnailUrl,
            fileName: newReel.fileName || "reel_upload.mp4",
          }).catch(() => {});

          dispatch(addUploadedReelLocal({ reel: newReel }));
          setCreatedReel(newReel);
          setPhase("success");
        }
      }, 220);
    },
    [
      caption,
      clearUploadTimer,
      currentUser?.avatarUrl,
      currentUser?.fullName,
      dispatch,
      fileName,
      hashtags,
      selectedCoverUrl,
      title,
      uploadReelMutation,
      videoPreviewUrl,
      visibility,
    ]
  );

  const handleSubmit = useCallback(() => {
    if (!fileName) {
      setFileError("Please select a video file (or load the sample clip).");
      return;
    }
    if (!title.trim()) {
      setTitleError("Please enter a title for your reel.");
      return;
    }

    setTitleError(undefined);
    setFileError(undefined);
    beginUploadProgress(true);
  }, [beginUploadProgress, fileName, title]);

  const handleCancelUpload = useCallback(() => {
    clearUploadTimer();
    setProgress(0);
    setPhase("form");
    toast.info("Upload cancelled.");
  }, [clearUploadTimer]);

  const handleTryAgain = useCallback(() => {
    beginUploadProgress(false);
  }, [beginUploadProgress]);

  const handleBack = useCallback(() => {
    clearUploadTimer();
    router.push("/reels?view=my-reels");
  }, [clearUploadTimer, router]);

  const handleViewUploadedReel = useCallback(() => {
    if (createdReel) {
      router.push(`/reels/manage/${encodeURIComponent(createdReel.id)}`);
    } else {
      router.push("/reels?view=my-reels");
    }
  }, [createdReel, router]);

  const handleShareUploadedPlatform = useCallback(
    async (platform: string) => {
      const shareTitle = createdReel?.title || title || "Morning Workflow";
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(
            `${typeof window !== "undefined" ? window.location.origin : ""}/reels`
          );
        }
      } catch {
        // Ignore clipboard unavailability
      }
      toast.success(`Prepared "${shareTitle}" to share on ${platform}!`);
    },
    [createdReel?.title, title]
  );

  const activeCreator = creatorRecord ?? DEFAULT_REEL_CREATORS[0];
  const followersCountLabel = `${activeCreator.followersCount.toLocaleString("en-US")} followers`;

  return {
    isProfessional,
    phase,
    selectedFile,
    fileName,
    fileSizeLabel,
    videoPreviewUrl,
    title,
    setTitle: (val: string) => {
      setTitle(val);
      setTitleError(undefined);
    },
    caption,
    setCaption,
    hashtags,
    setHashtags,
    visibility,
    setVisibility,
    coverOptions,
    selectedCoverUrl,
    setSelectedCoverUrl,
    titleError,
    fileError,
    progress,
    errorCode,
    errorMessage,
    createdReel,
    followersCountLabel,
    handleFileSelect,
    handleUseSampleClip,
    handleClearFile,
    handleCustomCoverSelect,
    handleSubmit,
    handleCancelUpload,
    handleTryAgain,
    handleBack,
    handleViewUploadedReel,
    handleShareUploadedPlatform,
  };
}

export function useCreatorReelsProfileService(creatorId: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const creator =
    useAppSelector(selectReelCreatorById(creatorId)) ?? DEFAULT_REEL_CREATORS[0];
  const feedReels = useAppSelector(selectFeedReels);
  const myReels = useAppSelector(selectMyReels);
  const likedReelIds = useAppSelector(selectLikedReelIds);
  const followedCreatorIds = useAppSelector(selectFollowedCreatorIds);
  const followedProIds = useAppSelector(selectFollowedProIds);

  const [activeTab, setActiveTab] = useState<CreatorProfileTabId>("reels");
  const [playerIndex, setPlayerIndex] = useState<number | null>(null);

  const [toggleLikeMutation] = useToggleLikeReelMutation();
  const [toggleFollowProMutation] = useToggleFollowProfessionalMutation();

  const combinedFollowedIds = useMemo(() => {
    const merged = new Set<string>([
      ...followedCreatorIds.map((id) => id.toLowerCase()),
      ...followedProIds.map((id) => id.toLowerCase()),
    ]);
    return Array.from(merged);
  }, [followedCreatorIds, followedProIds]);

  const isFollowing = combinedFollowedIds.includes(creator.id.toLowerCase());

  const creatorReels = useMemo(() => {
    const combined = [...feedReels];
    for (const managed of myReels) {
      if (
        managed.status === "public" &&
        !combined.some((item) => item.id === managed.id)
      ) {
        combined.push(managed);
      }
    }
    const matching = combined.filter(
      (item) => item.creatorId.toLowerCase() === creator.id.toLowerCase()
    );
    return matching.length > 0 ? matching : feedReels;
  }, [creator.id, feedReels, myReels]);

  const handleBack = useCallback(() => {
    router.push("/reels?view=discover");
  }, [router]);

  const handleToggleFollow = useCallback(
    async (targetCreatorId = creator.id, targetCreatorName = creator.name) => {
      const normalized = targetCreatorId.trim().toLowerCase();
      const currentlyFollowing = combinedFollowedIds.includes(normalized);
      const nextFollowing = !currentlyFollowing;

      dispatch(
        setFollowCreatorLocal({
          creatorId: targetCreatorId,
          following: nextFollowing,
        })
      );

      const isFollowedInDiscover = followedProIds.some(
        (id) => id.trim().toLowerCase() === normalized
      );
      if (isFollowedInDiscover !== nextFollowing) {
        dispatch(toggleFollowedProfessional(targetCreatorId));
      }

      try {
        await toggleFollowProMutation({
          id: targetCreatorId,
          following: nextFollowing,
        }).unwrap();
      } catch {
        // Fallback persisted
      }
      toast.success(
        nextFollowing
          ? `Following ${targetCreatorName}`
          : `Unfollowed ${targetCreatorName}`
      );
    },
    [
      combinedFollowedIds,
      creator.id,
      creator.name,
      dispatch,
      followedProIds,
      toggleFollowProMutation,
    ]
  );

  const handleMessageCreator = useCallback(() => {
    toast.info(`Opening messages with ${creator.name}...`);
    router.push("/messages");
  }, [creator.name, router]);

  const handleViewFullStorefront = useCallback(() => {
    router.push(`/profile/${encodeURIComponent(creator.id)}`);
  }, [creator.id, router]);

  const handleCopyProfileLink = useCallback(async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/reels/creator/${encodeURIComponent(creator.id)}`
        : `/reels/creator/${encodeURIComponent(creator.id)}`;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
      toast.success(`Profile link for ${creator.name} copied!`);
    } catch {
      toast.success("Profile link copied!");
    }
  }, [creator.id, creator.name]);

  const handleToggleLike = useCallback(
    async (reelId: string) => {
      const nextLiked = !likedReelIds.includes(reelId);
      dispatch(toggleLikeReelLocal({ reelId }));
      try {
        await toggleLikeMutation({ reelId, liked: nextLiked }).unwrap();
      } catch {
        // Fallback persisted
      }
    },
    [dispatch, likedReelIds, toggleLikeMutation]
  );

  const handleShareReel = useCallback(async (reel: ReelItem) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(
          `${typeof window !== "undefined" ? window.location.origin : ""}/reels/creator/${encodeURIComponent(reel.creatorId)}`
        );
      }
      toast.success(`Link to "${reel.title}" copied!`);
    } catch {
      toast.success("Reel link copied!");
    }
  }, []);

  return {
    creator,
    creatorReels,
    activeTab,
    setActiveTab,
    isFollowing,
    likedReelIds,
    combinedFollowedIds,
    playerIndex,
    setPlayerIndex,
    handleBack,
    handleToggleFollow,
    handleMessageCreator,
    handleViewFullStorefront,
    handleCopyProfileLink,
    handleToggleLike,
    handleShareReel,
  };
}
