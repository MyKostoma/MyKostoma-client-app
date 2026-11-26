"use client";

import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { SettingsTopBar } from "@/components/layouts/top-bars/settings/settings-top-bar";
import { ChangeEmailModal } from "@/components/modals/settings-modals";
import { ProfileSettingsForm } from "@/components/settings/profile-settings-form";
import { SettingsShell } from "@/components/settings/settings-shell";
import { useProfileSettingsService } from "@/features/settings/services/settingsApi";

export function ProfileSettingsView() {
  const {
    isProfessional,
    avatarUrl,
    fullName,
    setFullName,
    fullNameError,
    email,
    emailChangePending,
    phone,
    setPhone,
    phoneError,
    location,
    setLocation,
    locationError,
    bio,
    setBio,
    bioError,
    isSaving,
    changeEmailModalOpen,
    setChangeEmailModalOpen,
    handlePhotoSelect,
    handleRequestEmailChange,
    handleCancel,
    handleSubmit,
  } = useProfileSettingsService();

  return (
    <>
      <DashboardTopBarSlot>
        <SettingsTopBar title="Profile Settings" />
      </DashboardTopBarSlot>

      <SettingsShell activeSection="profile" isProfessional={isProfessional}>
        <ProfileSettingsForm
          isProfessional={isProfessional}
          avatarUrl={avatarUrl}
          fullName={fullName}
          fullNameError={fullNameError}
          email={email}
          emailChangePending={emailChangePending}
          phone={phone}
          phoneError={phoneError}
          location={location}
          locationError={locationError}
          bio={bio}
          bioError={bioError}
          isSaving={isSaving}
          onPhotoSelect={handlePhotoSelect}
          onFullNameChange={setFullName}
          onRequestEmailChange={() => setChangeEmailModalOpen(true)}
          onPhoneChange={setPhone}
          onLocationChange={setLocation}
          onBioChange={setBio}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </SettingsShell>

      <ChangeEmailModal
        isOpen={changeEmailModalOpen}
        currentEmail={email}
        onClose={() => setChangeEmailModalOpen(false)}
        onSubmitChange={handleRequestEmailChange}
      />
    </>
  );
}
