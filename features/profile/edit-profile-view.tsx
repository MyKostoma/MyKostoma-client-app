"use client";

import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { ConsumerEditProfileForm } from "@/components/profile/consumer/consumer-edit-profile-form";
import { RequestContactUpdateModal } from "@/components/modals/profile-modals";
import { useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import {
  BUSINESS_CATEGORY_OPTIONS,
  CONSUMER_CONTACT_PREFERENCE_OPTIONS,
  CONSUMER_SERVICE_INTEREST_OPTIONS,
  NIGERIAN_LOCATION_PRESETS,
  PROFESSIONAL_CATEGORY_OPTIONS,
} from "./data";
import {
  useConsumerEditProfileService,
  useEditProfileService,
} from "./services/profileApi";
import type { EditProfileViewProps } from "./types";

function ConsumerEditProfileContent() {
  const {
    fullName,
    fullNameError,
    email,
    emailError,
    phone,
    phoneError,
    location,
    locationError,
    bio,
    bioError,
    preferredContact,
    setPreferredContact,
    serviceInterests,
    avatarUrl,
    showMapPicker,
    setShowMapPicker,
    isSaving,
    onFullNameChange,
    onEmailChange,
    onPhoneChange,
    onLocationChange,
    onBioChange,
    handleSelectPresetLocation,
    handleToggleInterest,
    handleUploadPhotoClick,
    handleRemovePhoto,
    handleCancel,
    handleSubmit,
  } = useConsumerEditProfileService();

  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      <ConsumerEditProfileForm
        fullName={fullName}
        fullNameError={fullNameError}
        email={email}
        emailError={emailError}
        phone={phone}
        phoneError={phoneError}
        location={location}
        locationError={locationError}
        locationPresets={NIGERIAN_LOCATION_PRESETS}
        showMapPicker={showMapPicker}
        bio={bio}
        bioError={bioError}
        preferredContact={preferredContact}
        contactOptions={CONSUMER_CONTACT_PREFERENCE_OPTIONS}
        serviceInterests={serviceInterests}
        interestOptions={CONSUMER_SERVICE_INTEREST_OPTIONS}
        avatarUrl={avatarUrl}
        isSaving={isSaving}
        onFullNameChange={onFullNameChange}
        onEmailChange={onEmailChange}
        onPhoneChange={onPhoneChange}
        onLocationChange={onLocationChange}
        onToggleMapPicker={() => setShowMapPicker((prev) => !prev)}
        onSelectPresetLocation={handleSelectPresetLocation}
        onBioChange={onBioChange}
        onPreferredContactChange={setPreferredContact}
        onToggleInterest={handleToggleInterest}
        onUploadPhotoClick={handleUploadPhotoClick}
        onRemovePhoto={handleRemovePhoto}
        onBack={handleCancel}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </main>
  );
}

function ProfessionalEditProfileContent({
  mode = "individual",
}: {
  mode?: "individual" | "company";
}) {
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

export function EditProfileView({ mode }: EditProfileViewProps) {
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  if (mode === "company") {
    return <ProfessionalEditProfileContent mode="company" />;
  }

  if (mode === "consumer" || (!mode && effectiveRole === "consumer")) {
    return <ConsumerEditProfileContent />;
  }

  return <ProfessionalEditProfileContent mode="individual" />;
}
