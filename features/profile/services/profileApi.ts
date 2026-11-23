"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import {
  toggleFollowedProfessional,
  useSendProfessionalInquiryMutation,
  useToggleFollowProfessionalMutation,
} from "@/store/slices/discoverSlice";
import {
  selectIsCompanyVerified,
  selectIsProfessionalVerified,
} from "@/store/slices/verificationSlice";
import {
  addCustomerReviewLocal,
  addPortfolioProjectLocal,
  deletePortfolioProjectLocal,
  replyToReviewLocal,
  selectCustomReviewsByProfileId,
  selectHelpfulReviewIds,
  selectOwnProfessionalProfile,
  selectResponsesByReviewId,
  toggleReviewHelpfulLocal,
  updateOwnProfileLocal,
  updateOwnProfilePhotoLocal,
  useRequestContactUpdateMutation,
  useSubmitCustomerReviewMutation,
  useSubmitReviewResponseMutation,
  useUpdateOwnProfessionalProfileMutation,
  useUpdateOwnProfilePhotoMutation,
} from "@/store/slices/profileSlice";
import type {
  ProfessionalProfileData,
  ProfilePortfolioItem,
  ProfileReviewFilter,
  ProfileReviewItem,
  ProfileServiceItem,
  ProfileSortPortfolio,
  ProfileSortReview,
  ProfileTabId,
} from "@/components/profile/types";
import type {
  AddPortfolioProjectPayload,
  RequestContactUpdatePayload,
} from "../types";
import { DEFAULT_PROFESSIONAL_PROFILE } from "../data";
import {
  buildEditProfileHref,
  buildProfileHref,
  buildProfilePhotoHref,
  buildServiceInquiryPrefill,
  extractPortfolioCategories,
  filterAndSortPortfolioItems,
  filterAndSortReviews,
  formatProfileDisplayDate,
  mergeProfileWithOverrides,
  normalizeProfileTab,
  paginateItems,
  validateProfilePhotoFile,
} from "./profileHelpers";

const PORTFOLIO_PAGE_SIZE = 4;
const REVIEWS_PAGE_SIZE = 4;

export function useProfileService(options?: {
  profile?: ProfessionalProfileData;
  forcePerspective?: "owner" | "customer";
  initialTab?: ProfileTabId;
  initialMessagingOpen?: boolean;
  initialFollowing?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const ownProfile = useAppSelector(selectOwnProfessionalProfile);
  const helpfulReviewIds = useAppSelector(selectHelpfulReviewIds);
  const customReviewsByProfileId = useAppSelector(
    selectCustomReviewsByProfileId
  );
  const responsesByReviewId = useAppSelector(selectResponsesByReviewId);
  const isIndividualVerified = useAppSelector(selectIsProfessionalVerified);
  const isCompanyVerified = useAppSelector(selectIsCompanyVerified);

  const effectiveRole = userRole || activePerspective || "consumer";
  const resolvedPerspective =
    options?.forcePerspective ??
    (effectiveRole === "professional" ? "owner" : "customer");
  const isOwnerRole = resolvedPerspective === "owner";

  const [isPreviewingAsClient, setIsPreviewingAsClient] = useState(false);
  const isOwner = isOwnerRole && !isPreviewingAsClient;

  const baseProfile = useMemo(() => {
    const raw =
      isOwnerRole && !options?.profile
        ? ownProfile
        : (options?.profile ?? DEFAULT_PROFESSIONAL_PROFILE);

    if (!isOwnerRole) return raw;

    if (isCompanyVerified) {
      return {
        ...raw,
        verificationType: "company" as const,
        verificationLabel: "BUSINESS VERIFIED",
      };
    }

    if (isIndividualVerified) {
      return {
        ...raw,
        verificationType: "individual" as const,
        verificationLabel: "INDIVIDUAL VERIFIED",
      };
    }

    return raw;
  }, [
    isCompanyVerified,
    isIndividualVerified,
    isOwnerRole,
    options?.profile,
    ownProfile,
  ]);

  const profile = useMemo(() => {
    const customReviews = customReviewsByProfileId[baseProfile.id] ?? [];
    return mergeProfileWithOverrides(
      baseProfile,
      customReviews,
      responsesByReviewId,
      helpfulReviewIds
    );
  }, [
    baseProfile,
    customReviewsByProfileId,
    helpfulReviewIds,
    responsesByReviewId,
  ]);

  const tabFromUrl = searchParams.get("tab");
  const initialResolvedTab = tabFromUrl
    ? normalizeProfileTab(tabFromUrl)
    : (options?.initialTab ?? "overview");

  const initialMessagingOpen = options?.initialMessagingOpen ?? false;
  const initialFollowing = options?.initialFollowing ?? false;

  const [activeTab, setActiveTab] = useState<ProfileTabId>(initialResolvedTab);
  const [isFollowing, setIsFollowing] = useState<boolean>(initialFollowing);
  const [isMessagingOpen, setIsMessagingOpen] =
    useState<boolean>(initialMessagingOpen);
  const [messageText, setMessageText] = useState<string>("");

  const [servicesSearchQuery, setServicesSearchQuery] = useState("");
  const [portfolioCategory, setPortfolioCategory] = useState("All Projects");
  const [portfolioSort, setPortfolioSort] =
    useState<ProfileSortPortfolio>("newest");
  const [portfolioPage, setPortfolioPage] = useState(1);

  const [reviewsSort, setReviewsSort] = useState<ProfileSortReview>("recent");
  const [reviewsFilter, setReviewsFilter] =
    useState<ProfileReviewFilter>("all");
  const [reviewsPage, setReviewsPage] = useState(1);

  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [portfolioModalMode, setPortfolioModalMode] = useState<
    "view" | "create"
  >("view");
  const [selectedPortfolioItem, setSelectedPortfolioItem] =
    useState<ProfilePortfolioItem | null>(null);
  const [writeReviewModalOpen, setWriteReviewModalOpen] = useState(false);

  const [toggleFollowMutation] = useToggleFollowProfessionalMutation();
  const [sendInquiryMutation] = useSendProfessionalInquiryMutation();
  const [submitReviewResponseMutation] = useSubmitReviewResponseMutation();
  const [submitCustomerReviewMutation] = useSubmitCustomerReviewMutation();

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(normalizeProfileTab(tabFromUrl));
    }
  }, [tabFromUrl]);

  useEffect(() => {
    setIsMessagingOpen(initialMessagingOpen);
    setIsFollowing(initialFollowing);
    setMessageText("");
    setPortfolioCategory("All Projects");
    setPortfolioPage(1);
    setReviewsPage(1);
    setServicesSearchQuery("");
  }, [profile.id, initialMessagingOpen, initialFollowing]);

  const filteredServices = useMemo(() => {
    const q = servicesSearchQuery.trim().toLowerCase();
    if (!q) return profile.services;
    return profile.services.filter((svc) => {
      const hay = [
        svc.title,
        svc.description,
        ...(svc.categoryTags ?? []),
        ...svc.tags,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [profile.services, servicesSearchQuery]);

  const portfolioCategories = useMemo(
    () => extractPortfolioCategories(profile.portfolio),
    [profile.portfolio]
  );

  const filteredPortfolio = useMemo(
    () =>
      filterAndSortPortfolioItems(
        profile.portfolio,
        portfolioCategory,
        portfolioSort
      ),
    [portfolioCategory, portfolioSort, profile.portfolio]
  );

  const paginatedPortfolio = useMemo(
    () =>
      paginateItems(filteredPortfolio, portfolioPage, PORTFOLIO_PAGE_SIZE),
    [filteredPortfolio, portfolioPage]
  );

  const filteredReviews = useMemo(
    () => filterAndSortReviews(profile.reviews, reviewsSort, reviewsFilter),
    [profile.reviews, reviewsFilter, reviewsSort]
  );

  const paginatedReviews = useMemo(
    () => paginateItems(filteredReviews, reviewsPage, REVIEWS_PAGE_SIZE),
    [filteredReviews, reviewsPage]
  );

  const repliedReviewsCount = useMemo(
    () => profile.reviews.filter((r) => Boolean(r.professionalResponse)).length,
    [profile.reviews]
  );

  const handleTabChange = useCallback((tab: ProfileTabId) => {
    setActiveTab(tab);
    setIsMessagingOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleToggleFollow = useCallback(async () => {
    const nextFollowing = !isFollowing;
    setIsFollowing(nextFollowing);
    dispatch(toggleFollowedProfessional(profile.id));
    try {
      await toggleFollowMutation({
        id: profile.id,
        following: nextFollowing,
      }).unwrap();
    } catch {
      // Fallback already updated local state
    }
  }, [dispatch, isFollowing, profile.id, toggleFollowMutation]);

  const handleToggleMessaging = useCallback(() => {
    setIsMessagingOpen((prev) => !prev);
  }, []);

  const handleServiceAction = useCallback(
    (service: ProfileServiceItem) => {
      if (isOwner) {
        router.push("/shop");
        return;
      }
      setMessageText(buildServiceInquiryPrefill(profile.name, service));
      setIsMessagingOpen(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [isOwner, profile.name, router]
  );

  const handleManageService = useCallback(() => {
    router.push("/shop");
  }, [router]);

  const handleAddNewService = useCallback(() => {
    router.push("/shop/new");
  }, [router]);

  const handleSendMessage = useCallback(async () => {
    const trimmed = messageText.trim();
    if (!trimmed) {
      toast.error("Please enter a message before sending.");
      return;
    }
    try {
      await sendInquiryMutation({
        recipientId: profile.id,
        message: trimmed,
      }).unwrap();
    } catch {
      // Fallback simulated success
    }
    toast.success(`Message sent to ${profile.name}!`);
    setMessageText("");
    setIsMessagingOpen(false);
  }, [messageText, profile.id, profile.name, sendInquiryMutation]);

  const handleEditProfileClick = useCallback(() => {
    router.push(buildEditProfileHref());
  }, [router]);

  const handleEditPhotoClick = useCallback(() => {
    router.push(buildProfilePhotoHref());
  }, [router]);

  const handleShareProfileClick = useCallback(async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/profile/${profile.id}`
        : `/profile/${profile.id}`;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      toast.success("Profile link copied to clipboard!");
    } catch {
      toast.success("Profile link ready to share!");
    }
  }, [profile.id]);

  const handleTogglePreviewAsClient = useCallback(() => {
    setIsPreviewingAsClient((prev) => !prev);
    setIsMessagingOpen(false);
  }, []);

  const handleOpenPortfolioItem = useCallback(
    (item: ProfilePortfolioItem) => {
      setSelectedPortfolioItem(item);
      setPortfolioModalMode("view");
      setPortfolioModalOpen(true);
    },
    []
  );

  const handleOpenAddProjectModal = useCallback(() => {
    setSelectedPortfolioItem(null);
    setPortfolioModalMode("create");
    setPortfolioModalOpen(true);
  }, []);

  const handleCreatePortfolioProject = useCallback(
    (payload: AddPortfolioProjectPayload) => {
      const now = new Date();
      const monthYear = now
        .toLocaleDateString("en-US", { month: "short", year: "numeric" })
        .toUpperCase();
      const newProject: ProfilePortfolioItem = {
        id: `proj-${Date.now()}`,
        title: payload.title,
        category: payload.filterCategory,
        filterCategory: payload.filterCategory,
        dateLabel: monthYear,
        createdAtISO: now.toISOString().slice(0, 10),
        description: payload.description,
        tags: payload.tags,
        imageUrl: payload.imageUrl,
      };
      dispatch(addPortfolioProjectLocal(newProject));
      setPortfolioCategory("All Projects");
      setPortfolioPage(1);
      toast.success("Portfolio project added!");
    },
    [dispatch]
  );

  const handleDeletePortfolioProject = useCallback(
    (projectId: string) => {
      dispatch(deletePortfolioProjectLocal({ projectId }));
      toast.success("Project removed from portfolio.");
    },
    [dispatch]
  );

  const handleReplyToReview = useCallback(
    async (reviewId: string, responseText: string) => {
      const trimmed = responseText.trim();
      if (!trimmed) {
        toast.error("Please enter a response before submitting.");
        return;
      }
      const date = formatProfileDisplayDate(new Date());
      try {
        await submitReviewResponseMutation({
          reviewId,
          response: trimmed,
        }).unwrap();
      } catch {
        // Fallback already persists locally
      }
      dispatch(replyToReviewLocal({ reviewId, text: trimmed, date }));
      toast.success("Response published!");
    },
    [dispatch, submitReviewResponseMutation]
  );

  const handleSubmitCustomerReview = useCallback(
    async (payload: { rating: number; comment: string }) => {
      const now = new Date();
      const review: ProfileReviewItem = {
        id: `rev-${Date.now()}`,
        authorName: "You (Verified Client)",
        authorRole: "Verified Purchase",
        timeAgo: "Just now",
        dateLabel: formatProfileDisplayDate(now),
        createdAtISO: now.toISOString().slice(0, 10),
        verifiedPurchase: true,
        avatarUrl: "",
        rating: payload.rating,
        helpfulCount: 0,
        comment: payload.comment,
      };
      try {
        await submitCustomerReviewMutation({
          profileId: profile.id,
          rating: payload.rating,
          comment: payload.comment,
        }).unwrap();
      } catch {
        // Fallback persists in Redux
      }
      dispatch(addCustomerReviewLocal({ profileId: profile.id, review }));
      setReviewsPage(1);
      toast.success("Thank you for your review!");
    },
    [dispatch, profile.id, submitCustomerReviewMutation]
  );

  const handleToggleReviewHelpful = useCallback(
    (reviewId: string) => {
      dispatch(toggleReviewHelpfulLocal({ reviewId }));
    },
    [dispatch]
  );

  const handleShareReview = useCallback(
    async (review: ProfileReviewItem) => {
      const url =
        typeof window !== "undefined"
          ? `${window.location.origin}/profile/${profile.id}?tab=reviews`
          : `/profile/${profile.id}?tab=reviews`;
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(url);
        }
        toast.success(`Link to ${review.authorName}'s review copied!`);
      } catch {
        toast.success("Review link ready to share!");
      }
    },
    [profile.id]
  );

  return {
    router,
    profile,
    isOwner,
    isOwnerRole,
    isPreviewingAsClient,
    activeTab,
    isFollowing,
    isMessagingOpen,
    setIsMessagingOpen,
    messageText,
    setMessageText,
    servicesSearchQuery,
    setServicesSearchQuery,
    filteredServices,
    portfolioCategories,
    portfolioCategory,
    setPortfolioCategory: (cat: string) => {
      setPortfolioCategory(cat);
      setPortfolioPage(1);
    },
    portfolioSort,
    setPortfolioSort: (sort: ProfileSortPortfolio) => {
      setPortfolioSort(sort);
      setPortfolioPage(1);
    },
    paginatedPortfolio,
    setPortfolioPage,
    reviewsSort,
    setReviewsSort: (sort: ProfileSortReview) => {
      setReviewsSort(sort);
      setReviewsPage(1);
    },
    reviewsFilter,
    setReviewsFilter: (filter: ProfileReviewFilter) => {
      setReviewsFilter(filter);
      setReviewsPage(1);
    },
    paginatedReviews,
    filteredReviewsCount: filteredReviews.length,
    setReviewsPage,
    repliedReviewsCount,
    helpfulReviewIds,
    portfolioModalOpen,
    setPortfolioModalOpen,
    portfolioModalMode,
    selectedPortfolioItem,
    writeReviewModalOpen,
    setWriteReviewModalOpen,
    handleTabChange,
    handleToggleFollow,
    handleToggleMessaging,
    handleServiceAction,
    handleManageService,
    handleAddNewService,
    handleSendMessage,
    handleEditProfileClick,
    handleEditPhotoClick,
    handleShareProfileClick,
    handleTogglePreviewAsClient,
    handleOpenPortfolioItem,
    handleOpenAddProjectModal,
    handleCreatePortfolioProject,
    handleDeletePortfolioProject,
    handleReplyToReview,
    handleSubmitCustomerReview,
    handleToggleReviewHelpful,
    handleShareReview,
  };
}

export function useEditProfileService() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const ownProfile = useAppSelector(selectOwnProfessionalProfile);
  const [updateMutation, { isLoading: isMutating }] =
    useUpdateOwnProfessionalProfileMutation();
  const [requestContactMutation] = useRequestContactUpdateMutation();

  const [fullName, setFullName] = useState(ownProfile.name);
  const [category, setCategory] = useState(
    ownProfile.category || "Interior Design"
  );
  const [location, setLocation] = useState(ownProfile.location);
  const [bio, setBio] = useState(ownProfile.bio);
  const [skills, setSkills] = useState<string[]>(ownProfile.skills ?? []);
  const [skillInput, setSkillInput] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(ownProfile.avatarUrl);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const [fullNameError, setFullNameError] = useState<string | undefined>(
    undefined
  );
  const [locationError, setLocationError] = useState<string | undefined>(
    undefined
  );
  const [bioError, setBioError] = useState<string | undefined>(undefined);
  const [isSavingLocal, setIsSavingLocal] = useState(false);

  useEffect(() => {
    setAvatarUrl(ownProfile.avatarUrl);
  }, [ownProfile.avatarUrl]);

  const handleFullNameChange = useCallback((value: string) => {
    setFullName(value);
    setFullNameError(undefined);
  }, []);

  const handleLocationChange = useCallback((value: string) => {
    setLocation(value);
    setLocationError(undefined);
  }, []);

  const handleBioChange = useCallback((value: string) => {
    if (value.length <= 500) {
      setBio(value);
      setBioError(undefined);
    }
  }, []);

  const handleSelectPresetLocation = useCallback((preset: string) => {
    setLocation(preset);
    setLocationError(undefined);
    setShowMapPicker(false);
  }, []);

  const handleAddSkill = useCallback(
    (explicit?: string) => {
      const candidate = (explicit ?? skillInput).replace(/,/g, "").trim();
      if (!candidate) return;

      if (skills.length >= 10) {
        toast.error("Maximum of 10 skills allowed.");
        return;
      }

      const duplicate = skills.some(
        (s) => s.toLowerCase() === candidate.toLowerCase()
      );
      if (duplicate) {
        setSkillInput("");
        return;
      }

      setSkills((prev) => [...prev, candidate]);
      setSkillInput("");
    },
    [skillInput, skills]
  );

  const handleRemoveSkill = useCallback((skillToRemove: string) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  }, []);

  const handleUploadPhotoClick = useCallback(() => {
    router.push(buildProfilePhotoHref());
  }, [router]);

  const handleRemovePhoto = useCallback(() => {
    setAvatarUrl("");
  }, []);

  const handleCancel = useCallback(() => {
    router.push(buildProfileHref());
  }, [router]);

  const handleSubmit = useCallback(async () => {
    const trimmedName = fullName.trim();
    const trimmedLocation = location.trim();
    const trimmedBio = bio.trim();

    let hasError = false;
    if (trimmedName.length < 2) {
      setFullNameError("Please enter your full name (at least 2 characters).");
      hasError = true;
    }
    if (trimmedLocation.length < 2) {
      setLocationError("Please provide your primary service location.");
      hasError = true;
    }
    if (trimmedBio.length > 500) {
      setBioError("Professional bio cannot exceed 500 characters.");
      hasError = true;
    }

    if (hasError) {
      toast.error("Please fix the highlighted profile fields.");
      return;
    }

    setIsSavingLocal(true);
    const payload = {
      fullName: trimmedName,
      category,
      location: trimmedLocation,
      bio: trimmedBio,
      skills,
      avatarUrl,
    };

    try {
      await updateMutation(payload).unwrap();
    } catch {
      // Mock fallback: persist local profile updates
    } finally {
      dispatch(updateOwnProfileLocal(payload));
      setIsSavingLocal(false);
    }

    toast.success("Profile changes saved!");
    router.push(buildProfileHref());
  }, [
    avatarUrl,
    bio,
    category,
    dispatch,
    fullName,
    location,
    router,
    skills,
    updateMutation,
  ]);

  const handleSubmitContactUpdate = useCallback(
    async (payload: RequestContactUpdatePayload) => {
      try {
        await requestContactMutation(payload).unwrap();
      } catch {
        // Fallback mock submission
      }
      toast.success(
        "Your contact information update request has been submitted for verification."
      );
    },
    [requestContactMutation]
  );

  return {
    fullName,
    fullNameError,
    category,
    setCategory,
    location,
    locationError,
    bio,
    bioError,
    skills,
    skillInput,
    setSkillInput,
    avatarUrl,
    showMapPicker,
    setShowMapPicker,
    contactModalOpen,
    setContactModalOpen,
    isSaving: isSavingLocal || isMutating,
    handleFullNameChange,
    handleLocationChange,
    handleBioChange,
    handleSelectPresetLocation,
    handleAddSkill,
    handleRemoveSkill,
    handleUploadPhotoClick,
    handleRemovePhoto,
    handleCancel,
    handleSubmit,
    handleSubmitContactUpdate,
  };
}

export function useProfilePhotoService() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const ownProfile = useAppSelector(selectOwnProfessionalProfile);
  const [updatePhotoMutation, { isLoading: isMutating }] =
    useUpdateOwnProfilePhotoMutation();

  const [previewUrl, setPreviewUrl] = useState(ownProfile.avatarUrl);
  const [pendingDataUrl, setPendingDataUrl] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<
    string | undefined
  >(undefined);
  const [isRemoved, setIsRemoved] = useState(false);
  const [fileError, setFileError] = useState<string | undefined>(undefined);
  const [dimensionWarning, setDimensionWarning] = useState<
    string | undefined
  >(undefined);
  const [isSavingLocal, setIsSavingLocal] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    const validation = validateProfilePhotoFile(file);
    if (!validation.valid) {
      setFileError(validation.error);
      toast.error(validation.error ?? "Invalid image file.");
      return;
    }

    setFileError(undefined);
    setDimensionWarning(undefined);
    setSelectedFileName(file.name);
    setIsRemoved(false);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (!dataUrl) return;
      setPreviewUrl(dataUrl);
      setPendingDataUrl(dataUrl);

      const probe = new Image();
      probe.onload = () => {
        if (probe.naturalWidth < 400 || probe.naturalHeight < 400) {
          setDimensionWarning(
            `Image is ${probe.naturalWidth}x${probe.naturalHeight}px. Minimum recommended size is 400x400px.`
          );
        }
      };
      probe.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleRemovePhoto = useCallback(() => {
    setPreviewUrl("");
    setPendingDataUrl("");
    setSelectedFileName(undefined);
    setFileError(undefined);
    setDimensionWarning(undefined);
    setIsRemoved(true);
  }, []);

  const handleCancel = useCallback(() => {
    router.push(buildProfileHref());
  }, [router]);

  const handleSubmit = useCallback(async () => {
    const nextAvatarUrl = isRemoved ? "" : (pendingDataUrl ?? previewUrl);

    setIsSavingLocal(true);
    try {
      await updatePhotoMutation({ avatarUrl: nextAvatarUrl }).unwrap();
    } catch {
      // Mock fallback: persist local photo update
    } finally {
      dispatch(updateOwnProfilePhotoLocal({ avatarUrl: nextAvatarUrl }));
      setIsSavingLocal(false);
    }

    toast.success(
      isRemoved ? "Profile photo removed." : "Profile photo updated!"
    );
    router.push(buildProfileHref());
  }, [
    dispatch,
    isRemoved,
    pendingDataUrl,
    previewUrl,
    router,
    updatePhotoMutation,
  ]);

  return {
    displayName: ownProfile.name,
    previewUrl,
    hasCustomPhoto: Boolean(previewUrl),
    selectedFileName,
    fileError,
    dimensionWarning,
    isSaving: isSavingLocal || isMutating,
    handleFileSelect,
    handleRemovePhoto,
    handleCancel,
    handleSubmit,
  };
}
