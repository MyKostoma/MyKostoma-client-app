"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Mail,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormField,
  Input,
  Select,
  Textarea,
} from "@/components/ui/form-fields";
import type { ProPayoutSchedule } from "@/components/wallet/types";
import { cn } from "@/lib/utils";
import type {
  BusinessInfoModalProps,
  ChangeEmailModalProps,
  ConfirmAccountDeletionModalProps,
  DisputeDetailModalProps,
  EditPayoutScheduleModalProps,
  StartDisputeModalProps,
  UploadCredentialsModalProps,
} from "./types";

export type {
  BusinessInfoModalProps,
  ChangeEmailModalProps,
  ConfirmAccountDeletionModalProps,
  DisputeDetailModalProps,
  EditPayoutScheduleModalProps,
  StartDisputeModalProps,
  UploadCredentialsModalProps,
} from "./types";

const PAYOUT_SCHEDULE_OPTIONS: {
  value: ProPayoutSchedule;
  label: string;
  description: string;
}[] = [
  {
    value: "daily",
    label: "Daily Automatic Payout",
    description: "Clears every business day for available balances over ₦5,000.",
  },
  {
    value: "weekly",
    label: "Weekly Automatic Payout",
    description: "Processed every Monday for balances over ₦10,000.",
  },
  {
    value: "monthly",
    label: "Monthly Automatic Payout",
    description: "Consolidated transfer on the 1st of each month.",
  },
];

export function ConfirmAccountDeletionModal({
  isOpen,
  isDeleting = false,
  onClose,
  onConfirmDelete,
  onContactSupport,
}: ConfirmAccountDeletionModalProps) {
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setConfirmText("");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isMatched = confirmText.trim() === "DELETE";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isMatched || isDeleting) return;
    onConfirmDelete();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-account-deletion-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md space-y-3 animate-in zoom-in-95 duration-150">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-5"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="size-11 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground">
              <AlertCircle className="size-5" />
            </div>

            <div className="space-y-1">
              <h2
                id="confirm-account-deletion-title"
                className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground"
              >
                Confirm Account Deletion
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Are you absolutely sure? This action is irreversible.
              </p>
            </div>
          </div>

          {/* Final Warning Checklist */}
          <div className="rounded-xl border border-border bg-secondary/45 p-4 space-y-2.5">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-foreground">
              FINAL WARNING
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                <span>
                  All your profile data and measurement history will be erased.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                <span>Active subscriptions and orders will be terminated.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                <span>This process cannot be undone.</span>
              </li>
            </ul>
          </div>

          {/* Type DELETE confirmation */}
          <div className="space-y-2">
            <label
              htmlFor="delete-account-confirm-input"
              className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-foreground"
            >
              <span>Please type</span>
              <span className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono text-[11px] font-bold">
                DELETE
              </span>
              <span>in the box below to confirm.</span>
            </label>

            <Input
              id="delete-account-confirm-input"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder='Type "DELETE"'
              autoComplete="off"
              className="text-center font-medium"
            />
          </div>

          <div className="space-y-2.5 pt-1">
            <Button
              type="submit"
              variant="destructive"
              size="sm"
              loading={isDeleting}
              loadingText="Deleting Account..."
              disabled={!isMatched}
              leadingIcon={<Trash2 className="size-3.5" />}
              className="w-full h-10 rounded-xl text-xs sm:text-sm font-bold shadow-xs"
            >
              Permanently Delete Account
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="w-full h-10 rounded-xl text-xs sm:text-sm font-semibold"
            >
              Cancel and Go Back
            </Button>
          </div>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Changed your mind?{" "}
          <button
            type="button"
            onClick={onContactSupport}
            className="font-bold text-foreground underline underline-offset-4 hover:text-primary cursor-pointer"
          >
            Contact support
          </button>{" "}
          if you have questions.
        </p>
      </div>
    </div>
  );
}

export function ChangeEmailModal({
  isOpen,
  currentEmail,
  onClose,
  onSubmitChange,
}: ChangeEmailModalProps) {
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;
    setNewEmail("");
    setCurrentPassword("");
    setError(undefined);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newEmail.trim() || !newEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (newEmail.trim().toLowerCase() === currentEmail.toLowerCase()) {
      setError("New email must differ from your current email address.");
      return;
    }
    if (!currentPassword.trim()) {
      setError("Please confirm your current password to continue.");
      return;
    }
    onSubmitChange({
      newEmail: newEmail.trim(),
      currentPassword,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-email-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
              <Mail className="size-4" />
            </div>
            <div>
              <h2
                id="change-email-modal-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                Update Email Address
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Current: {currentEmail}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <FormField id="settings-new-email" label="New Email Address" required>
          <Input
            id="settings-new-email"
            type="email"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
              setError(undefined);
            }}
            placeholder="name@example.com"
          />
        </FormField>

        <FormField
          id="settings-email-password"
          label="Confirm Current Password"
          required
          state={error ? "error" : "default"}
          errorMessage={error}
        >
          <Input
            id="settings-email-password"
            type="password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setError(undefined);
            }}
            placeholder="Enter your current password"
          />
        </FormField>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Send Verification Link
          </Button>
        </div>
      </form>
    </div>
  );
}

export function BusinessInfoModal({
  isOpen,
  initialInfo,
  onClose,
  onSaveInfo,
}: BusinessInfoModalProps) {
  const [legalName, setLegalName] = useState(initialInfo.legalName);
  const [taxId, setTaxId] = useState(initialInfo.taxId);
  const [registeredAddress, setRegisteredAddress] = useState(
    initialInfo.registeredAddress
  );
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;
    setLegalName(initialInfo.legalName);
    setTaxId(initialInfo.taxId);
    setRegisteredAddress(initialInfo.registeredAddress);
    setError(undefined);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [initialInfo, isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!legalName.trim() || !taxId.trim() || !registeredAddress.trim()) {
      setError("Please fill in your legal name, tax/RC ID, and address.");
      return;
    }
    onSaveInfo({
      legalName: legalName.trim(),
      taxId: taxId.trim(),
      registeredAddress: registeredAddress.trim(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="business-info-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-secondary text-foreground flex items-center justify-center shrink-0">
              <Briefcase className="size-4" />
            </div>
            <div>
              <h2
                id="business-info-modal-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                Business Information
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Update registered company details for compliance review.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <FormField id="biz-legal-name" label="Legal Business Name" required>
          <Input
            id="biz-legal-name"
            value={legalName}
            onChange={(e) => {
              setLegalName(e.target.value);
              setError(undefined);
            }}
            placeholder="e.g. UrbanVibe Design Studio Ltd."
          />
        </FormField>

        <FormField id="biz-tax-id" label="CAC / Tax ID" required>
          <Input
            id="biz-tax-id"
            value={taxId}
            onChange={(e) => {
              setTaxId(e.target.value);
              setError(undefined);
            }}
            placeholder="RC-1489023 / TIN-20491822"
          />
        </FormField>

        <FormField
          id="biz-address"
          label="Registered Business Address"
          required
          state={error ? "error" : "default"}
          errorMessage={error}
        >
          <Textarea
            id="biz-address"
            value={registeredAddress}
            onChange={(e) => {
              setRegisteredAddress(e.target.value);
              setError(undefined);
            }}
            placeholder="Full street address, city, and state"
            className="min-h-20 resize-none"
          />
        </FormField>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Save Business Info
          </Button>
        </div>
      </form>
    </div>
  );
}

export function UploadCredentialsModal({
  isOpen,
  initialCredentials,
  onClose,
  onSubmitCredentials,
}: UploadCredentialsModalProps) {
  const [licenseName, setLicenseName] = useState(
    initialCredentials.licenseName
  );
  const [issuingBody, setIssuingBody] = useState(
    initialCredentials.issuingBody
  );
  const [licenseNumber, setLicenseNumber] = useState(
    initialCredentials.licenseNumber
  );
  const [fileName, setFileName] = useState(initialCredentials.fileName ?? "");
  const [error, setError] = useState<string | undefined>(undefined);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLicenseName(initialCredentials.licenseName);
    setIssuingBody(initialCredentials.issuingBody);
    setLicenseNumber(initialCredentials.licenseNumber);
    setFileName(initialCredentials.fileName ?? "");
    setError(undefined);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [initialCredentials, isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setError(undefined);
    }
    e.target.value = "";
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!licenseName.trim() || !issuingBody.trim() || !licenseNumber.trim()) {
      setError("Please provide your certification name, issuer, and ID number.");
      return;
    }
    if (!fileName.trim()) {
      setError("Please attach a supporting certificate document (PDF/JPG/PNG).");
      return;
    }
    onSubmitCredentials({
      licenseName: licenseName.trim(),
      issuingBody: issuingBody.trim(),
      licenseNumber: licenseNumber.trim(),
      fileName: fileName.trim(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-credentials-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
              <Award className="size-4" />
            </div>
            <div>
              <h2
                id="upload-credentials-modal-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                Upload Professional Credentials
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Trade certificates, licenses, or guild memberships.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <FormField id="cred-name" label="Certification / License Name" required>
          <Input
            id="cred-name"
            value={licenseName}
            onChange={(e) => {
              setLicenseName(e.target.value);
              setError(undefined);
            }}
            placeholder="e.g. COREN / NIA Practicing License"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField id="cred-issuer" label="Issuing Body" required>
            <Input
              id="cred-issuer"
              value={issuingBody}
              onChange={(e) => {
                setIssuingBody(e.target.value);
                setError(undefined);
              }}
              placeholder="e.g. Nigerian Institute..."
            />
          </FormField>

          <FormField id="cred-number" label="License Number" required>
            <Input
              id="cred-number"
              value={licenseNumber}
              onChange={(e) => {
                setLicenseNumber(e.target.value);
                setError(undefined);
              }}
              placeholder="e.g. LIC-90421"
            />
          </FormField>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground">
            Supporting Certificate File <span className="text-error">*</span>
          </p>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,image/png,image/jpeg"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full rounded-xl border border-dashed border-border bg-secondary/35 hover:bg-secondary/60 px-4 py-3 text-xs text-muted-foreground flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <UploadCloud className="size-4 text-primary shrink-0" />
            <span className="truncate font-semibold text-foreground">
              {fileName || "Choose PDF, PNG, or JPG document"}
            </span>
          </button>
          {error && <p className="text-xs font-medium text-error">{error}</p>}
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Submit Credentials
          </Button>
        </div>
      </form>
    </div>
  );
}

export function EditPayoutScheduleModal({
  isOpen,
  currentSchedule,
  onClose,
  onSaveSchedule,
}: EditPayoutScheduleModalProps) {
  const [selected, setSelected] = useState<ProPayoutSchedule>(currentSchedule);

  useEffect(() => {
    if (!isOpen) return;
    setSelected(currentSchedule);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSchedule, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-payout-schedule-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-secondary text-foreground flex items-center justify-center shrink-0">
              <Calendar className="size-4" />
            </div>
            <div>
              <h2
                id="edit-payout-schedule-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                Edit Payout Schedule
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Choose how often settled earnings transfer to your bank.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          {PAYOUT_SCHEDULE_OPTIONS.map((opt) => {
            const active = selected === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelected(opt.value)}
                className={cn(
                  "w-full text-left rounded-xl border p-3.5 transition-colors cursor-pointer space-y-1",
                  active
                    ? "border-primary bg-accent/50"
                    : "border-border bg-card hover:bg-secondary/40"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    {opt.label}
                  </span>
                  <span
                    className={cn(
                      "size-4 rounded-full border flex items-center justify-center",
                      active
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/40"
                    )}
                  >
                    {active && (
                      <span className="size-1.5 rounded-full bg-primary-foreground" />
                    )}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {opt.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => {
              onSaveSchedule(selected);
              onClose();
            }}
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Save Schedule
          </Button>
        </div>
      </div>
    </div>
  );
}

export function StartDisputeModal({
  isOpen,
  reasons,
  onClose,
  onCreateDispute,
}: StartDisputeModalProps) {
  const [transactionTitle, setTransactionTitle] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [reason, setReason] = useState(
    reasons[0] ?? "Quality or craftsmanship mismatch"
  );
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;
    setTransactionTitle("");
    setTransactionRef("");
    setReason(reasons[0] ?? "Quality or craftsmanship mismatch");
    setDescription("");
    setError(undefined);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, reasons]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!transactionTitle.trim() || !transactionRef.trim() || !description.trim()) {
      setError(
        "Please enter the order/service title, transaction reference, and summary."
      );
      return;
    }
    onCreateDispute({
      transactionTitle: transactionTitle.trim(),
      transactionRef: transactionRef.trim().toUpperCase(),
      reason,
      description: description.trim(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="start-dispute-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-error-bg text-error flex items-center justify-center shrink-0">
              <AlertTriangle className="size-4" />
            </div>
            <div>
              <h2
                id="start-dispute-modal-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                Start New Dispute
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Submit transaction details for MyKostoma arbitration review.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <FormField
            id="dispute-service-title"
            label="Order / Service Name"
            required
          >
            <Input
              id="dispute-service-title"
              value={transactionTitle}
              onChange={(e) => {
                setTransactionTitle(e.target.value);
                setError(undefined);
              }}
              placeholder="e.g. Bespoke Suit Fitting"
            />
          </FormField>

          <FormField
            id="dispute-trx-ref"
            label="Transaction Reference"
            required
          >
            <Input
              id="dispute-trx-ref"
              value={transactionRef}
              onChange={(e) => {
                setTransactionRef(e.target.value);
                setError(undefined);
              }}
              placeholder="e.g. TRX-5520-814"
            />
          </FormField>
        </div>

        <FormField id="dispute-reason-select" label="Dispute Reason" required>
          <Select
            id="dispute-reason-select"
            value={reason}
            onChange={(value) => setReason(value)}
            options={reasons.map((item) => ({ label: item, value: item }))}
          />
        </FormField>

        <FormField
          id="dispute-description"
          label="Detailed Explanation"
          required
          state={error ? "error" : "default"}
          errorMessage={error}
        >
          <Textarea
            id="dispute-description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError(undefined);
            }}
            placeholder="Describe what happened, milestone expectations, and desired outcome..."
            className="min-h-24 resize-none"
          />
        </FormField>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="h-9 px-5 rounded-lg text-xs font-semibold shadow-xs"
          >
            Submit Dispute
          </Button>
        </div>
      </form>
    </div>
  );
}

export function DisputeDetailModal({
  isOpen,
  dispute,
  onClose,
  onContactSupport,
}: DisputeDetailModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !dispute) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dispute-detail-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {dispute.code} • {dispute.transactionRef}
            </p>
            <h2
              id="dispute-detail-modal-title"
              className="text-base sm:text-lg font-bold text-foreground tracking-tight mt-0.5"
            >
              {dispute.transactionTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-secondary/35 p-4 text-xs">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Date Initiated
            </p>
            <p className="font-semibold text-foreground mt-0.5">
              {dispute.dateInitiatedLabel}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Disputed Amount
            </p>
            <p className="font-bold text-foreground mt-0.5">
              {dispute.amountFormatted}
            </p>
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          <p className="font-bold text-foreground">Reason: {dispute.reason}</p>
          <p className="text-muted-foreground leading-relaxed">
            {dispute.description}
          </p>
        </div>

        {dispute.resolutionNotes && (
          <div className="rounded-xl border border-border bg-secondary/45 p-4 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground">
              Arbitration Update
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {dispute.resolutionNotes}
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-2.5 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              onClose();
              onContactSupport();
            }}
            className="h-9 px-4 rounded-lg text-xs font-semibold"
          >
            Message Support
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onClose}
            className="h-9 px-5 rounded-lg text-xs font-semibold"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
