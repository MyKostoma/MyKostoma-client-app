"use client";

import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { SettingsTopBar } from "@/components/layouts/top-bars/settings/settings-top-bar";
import { PasswordSettingsForm } from "@/components/settings/password-settings-form";
import { SettingsShell } from "@/components/settings/settings-shell";
import { usePasswordSettingsService } from "@/features/settings/services/settingsApi";

export function PasswordSettingsView() {
  const {
    isProfessional,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showCurrent,
    toggleShowCurrent,
    showNew,
    toggleShowNew,
    showConfirm,
    toggleShowConfirm,
    strength,
    currentError,
    newError,
    confirmError,
    isSaving,
    handleForgotPassword,
    handleCancel,
    handleSubmit,
  } = usePasswordSettingsService();

  return (
    <>
      <DashboardTopBarSlot>
        <SettingsTopBar title="Security Settings" />
      </DashboardTopBarSlot>

      <SettingsShell activeSection="password" isProfessional={isProfessional}>
        <PasswordSettingsForm
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          showCurrent={showCurrent}
          showNew={showNew}
          showConfirm={showConfirm}
          strength={strength}
          currentError={currentError}
          newError={newError}
          confirmError={confirmError}
          isSaving={isSaving}
          onCurrentChange={setCurrentPassword}
          onNewChange={setNewPassword}
          onConfirmChange={setConfirmPassword}
          onToggleShowCurrent={toggleShowCurrent}
          onToggleShowNew={toggleShowNew}
          onToggleShowConfirm={toggleShowConfirm}
          onForgotPassword={handleForgotPassword}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </SettingsShell>
    </>
  );
}
