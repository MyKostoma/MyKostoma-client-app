"use client";

import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { SettingsTopBar } from "@/components/layouts/top-bars/settings/settings-top-bar";
import { NotificationPreferencesPanel } from "@/components/settings/notification-preferences-panel";
import { SettingsShell } from "@/components/settings/settings-shell";
import { QUIET_HOURS_TIME_OPTIONS } from "@/features/settings/data";
import { useNotificationSettingsService } from "@/features/settings/services/settingsApi";

export function NotificationSettingsView() {
  const {
    isProfessional,
    preferences,
    hasUnsavedChanges,
    isSaving,
    handleToggleChannel,
    handleToggleQuietHours,
    handleQuietHoursFromChange,
    handleQuietHoursToChange,
    handleSave,
    handleCancel,
    handleNavigateProfile,
  } = useNotificationSettingsService();

  return (
    <>
      <DashboardTopBarSlot>
        <SettingsTopBar title="Notification Preferences" />
      </DashboardTopBarSlot>

      <SettingsShell
        activeSection="notifications"
        isProfessional={isProfessional}
      >
        <NotificationPreferencesPanel
          preferences={preferences}
          hasUnsavedChanges={hasUnsavedChanges}
          isSaving={isSaving}
          timeOptions={QUIET_HOURS_TIME_OPTIONS}
          onToggleChannel={handleToggleChannel}
          onToggleQuietHours={handleToggleQuietHours}
          onQuietHoursFromChange={handleQuietHoursFromChange}
          onQuietHoursToChange={handleQuietHoursToChange}
          onSave={handleSave}
          onCancel={handleCancel}
          onNavigateProfile={handleNavigateProfile}
        />
      </SettingsShell>
    </>
  );
}
