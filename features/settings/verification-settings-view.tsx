"use client";

import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { SettingsTopBar } from "@/components/layouts/top-bars/settings/settings-top-bar";
import {
  BusinessInfoModal,
  UploadCredentialsModal,
} from "@/components/modals/settings-modals";
import { SettingsProOnlyGate } from "@/components/settings/settings-pro-only-gate";
import { SettingsShell } from "@/components/settings/settings-shell";
import { VerificationSettingsPanel } from "@/components/settings/verification-settings-panel";
import { useVerificationSettingsService } from "@/features/settings/services/settingsApi";

export function VerificationSettingsView() {
  const {
    isProfessional,
    identityVerified,
    businessInfo,
    credentialsInfo,
    completedSteps,
    totalSteps,
    statusHeadline,
    businessModalOpen,
    setBusinessModalOpen,
    credentialsModalOpen,
    setCredentialsModalOpen,
    handleBackToSettings,
    handleOpenIdentityFlow,
    handleSaveBusinessInfo,
    handleSubmitCredentials,
    handleContactSupport,
  } = useVerificationSettingsService();

  return (
    <>
      <DashboardTopBarSlot>
        <SettingsTopBar title="Verification Settings" />
      </DashboardTopBarSlot>

      <SettingsShell
        activeSection="verification"
        isProfessional={isProfessional}
      >
        {!isProfessional ? (
          <SettingsProOnlyGate
            featureTitle="Professional Verification Settings"
            description="Identity and credential verification badges apply only to MyKostoma Professional & Business accounts."
            onBackToSettings={handleBackToSettings}
          />
        ) : (
          <VerificationSettingsPanel
            identityVerified={identityVerified}
            businessInfo={businessInfo}
            credentialsInfo={credentialsInfo}
            completedSteps={completedSteps}
            totalSteps={totalSteps}
            statusHeadline={statusHeadline}
            onOpenIdentityFlow={handleOpenIdentityFlow}
            onOpenBusinessModal={() => setBusinessModalOpen(true)}
            onOpenCredentialsModal={() => setCredentialsModalOpen(true)}
            onContactSupport={handleContactSupport}
          />
        )}
      </SettingsShell>

      {isProfessional && (
        <>
          <BusinessInfoModal
            isOpen={businessModalOpen}
            initialInfo={businessInfo}
            onClose={() => setBusinessModalOpen(false)}
            onSaveInfo={handleSaveBusinessInfo}
          />

          <UploadCredentialsModal
            isOpen={credentialsModalOpen}
            initialCredentials={credentialsInfo}
            onClose={() => setCredentialsModalOpen(false)}
            onSubmitCredentials={handleSubmitCredentials}
          />
        </>
      )}
    </>
  );
}
