"use client";

import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { RequestContactUpdateModal } from "@/components/modals/profile-modals";
import {
  BUSINESS_CATEGORY_OPTIONS,
  NIGERIAN_LOCATION_PRESETS,
  PROFESSIONAL_CATEGORY_OPTIONS,
} from "./data";
import { useEditProfileService } from "./services/profileApi";
import type { EditProfileViewProps } from "./types";

export function EditProfileView({
  mode = "individual",
}: EditProfileViewProps) {
  const {
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
    isSaving,
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
  } = useEditProfileService(mode);

  const categoryOptions =
    mode === "company"
      ? BUSINESS_CATEGORY_OPTIONS
      : PROFESSIONAL_CATEGORY_OPTIONS;

  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      <EditProfileForm
        variant={mode}
        fullName={fullName}
        fullNameError={fullNameError}
        category={category}
        categoryOptions={categoryOptions}
        location={location}
        locationError={locationError}
        locationPresets={NIGERIAN_LOCATION_PRESETS}
        showMapPicker={showMapPicker}
        bio={bio}
        bioError={bioError}
        skills={skills}
        skillInput={skillInput}
        avatarUrl={avatarUrl}
        isSaving={isSaving}
        onFullNameChange={handleFullNameChange}
        onCategoryChange={setCategory}
        onLocationChange={handleLocationChange}
        onToggleMapPicker={() => setShowMapPicker((prev) => !prev)}
        onSelectPresetLocation={handleSelectPresetLocation}
        onBioChange={handleBioChange}
        onSkillInputChange={setSkillInput}
        onAddSkill={handleAddSkill}
        onRemoveSkill={handleRemoveSkill}
        onUploadPhotoClick={handleUploadPhotoClick}
        onRemovePhoto={handleRemovePhoto}
        onRequestContactUpdate={() => setContactModalOpen(true)}
        onBack={handleCancel}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />

      <RequestContactUpdateModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        onSubmitRequest={handleSubmitContactUpdate}
      />
    </main>
  );
}
