"use client";

import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { VerificationTopBar } from "@/components/layouts/top-bars/verification/verification-top-bar";
import { CompanyVerificationSubmitForm } from "@/components/verification/company-verification-submit-form";
import { COMPANY_DOCUMENT_REQUIREMENTS } from "./data";
import { useCompanyVerificationSubmitService } from "./services/verificationApi";

export function CompanyVerificationSubmitView() {
  const {
    companyName,
    companyNameError,
    cacNumber,
    cacNumberError,
    cacCertificateFile,
    cacCertificateError,
    incorporationFile,
    incorporationError,
    isSubmitting,
    handleCompanyNameChange,
    handleCacNumberChange,
    handleCacCertificateSelect,
    handleCacCertificateRemove,
    handleIncorporationSelect,
    handleIncorporationRemove,
    handleCancel,
    handleSubmit,
  } = useCompanyVerificationSubmitService();

  return (
    <>
      <DashboardTopBarSlot>
        <VerificationTopBar
          breadcrumbs={[
            { label: "Verification", href: "/verification" },
            { label: "Company", href: "/verification/company" },
            { label: "Company Details & Documents" },
          ]}
          highlightLastPrimary
        />
      </DashboardTopBarSlot>

      <CompanyVerificationSubmitForm
        companyName={companyName}
        companyNameError={companyNameError}
        cacNumber={cacNumber}
        cacNumberError={cacNumberError}
        cacCertificateFile={cacCertificateFile}
        cacCertificateError={cacCertificateError}
        incorporationFile={incorporationFile}
        incorporationError={incorporationError}
        requirements={COMPANY_DOCUMENT_REQUIREMENTS}
        isSubmitting={isSubmitting}
        onCompanyNameChange={handleCompanyNameChange}
        onCacNumberChange={handleCacNumberChange}
        onCacCertificateSelect={handleCacCertificateSelect}
        onCacCertificateRemove={handleCacCertificateRemove}
        onIncorporationSelect={handleIncorporationSelect}
        onIncorporationRemove={handleIncorporationRemove}
        onBack={handleCancel}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </>
  );
}
