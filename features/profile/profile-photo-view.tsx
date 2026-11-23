"use client";

import { useSearchParams } from "next/navigation";
import { ProfilePhotoForm } from "@/components/profile/profile-photo-form";
import { useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import { PROFILE_PHOTO_GUIDELINES } from "./data";
import { useProfilePhotoService } from "./services/profileApi";
import type { ProfileEntityMode, ProfilePhotoViewProps } from "./types";

export function ProfilePhotoView({ mode }: ProfilePhotoViewProps) {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  const resolvedMode: ProfileEntityMode =
    modeParam === "company" || mode === "company"
      ? "company"
      : modeParam === "consumer" ||
          mode === "consumer" ||
          (!modeParam && !mode && effectiveRole === "consumer")
        ? "consumer"
        : "individual";

  const {
    displayName,
    previewUrl,
    hasCustomPhoto,
    selectedFileName,
    fileError,
    dimensionWarning,
    isSaving,
    handleFileSelect,
    handleRemovePhoto,
    handleCancel,
    handleSubmit,
  } = useProfilePhotoService(resolvedMode);

  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      <ProfilePhotoForm
        variant={resolvedMode}
        displayName={displayName}
        previewUrl={previewUrl}
        hasCustomPhoto={hasCustomPhoto}
        selectedFileName={selectedFileName}
        fileError={fileError}
        dimensionWarning={dimensionWarning}
        guidelines={PROFILE_PHOTO_GUIDELINES}
        isSaving={isSaving}
        onFileSelect={handleFileSelect}
        onRemovePhoto={handleRemovePhoto}
        onBack={handleCancel}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
