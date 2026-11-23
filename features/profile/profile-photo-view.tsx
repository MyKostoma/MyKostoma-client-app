"use client";

import { useSearchParams } from "next/navigation";
import { ProfilePhotoForm } from "@/components/profile/profile-photo-form";
import { PROFILE_PHOTO_GUIDELINES } from "./data";
import { useProfilePhotoService } from "./services/profileApi";
import type { ProfilePhotoViewProps } from "./types";

export function ProfilePhotoView({
  mode = "individual",
}: ProfilePhotoViewProps) {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const resolvedMode = modeParam === "company" ? "company" : mode;

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
