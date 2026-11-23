"use client";

import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { RequestContactUpdateModal } from "@/components/modals/profile-modals";
import {
  NIGERIAN_LOCATION_PRESETS,
  PROFESSIONAL_CATEGORY_OPTIONS,
} from "./data";
import { useEditProfileService } from "./services/profileApi";

export function EditProfileView() {
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
  } = useEditProfileService();

  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      <EditProfileForm
        fullName={fullName}
        fullNameError={fullNameError}
        category={category}
        categoryOptions={PROFESSIONAL_CATEGORY_OPTIONS}
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
