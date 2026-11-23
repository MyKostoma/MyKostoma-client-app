"use client";

import { Info, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { ProAddBankFormProps, ProBankAccountType } from "../types";

const ACCOUNT_TYPES: { id: ProBankAccountType; label: string }[] = [
  { id: "savings", label: "Savings" },
  { id: "current", label: "Current" },
];

export function ProAddBankForm({
  isEditing,
  profileName,
  bankOptions,
  values,
  isVerifying,
  verificationError,
  onBankChange,
  onAccountNumberChange,
  onVerifyAccount,
  onAccountTypeChange,
  onCancel,
  onSave,
  className,
}: ProAddBankFormProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          {isEditing ? "Edit Bank Account" : "Add New Bank Account"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Connect a Nigerian bank account to receive your payouts securely.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-1.5">
          <label
            htmlFor="pro-bank-select"
            className="block text-xs font-semibold text-foreground"
          >
            Select Bank
          </label>
          <Select
            id="pro-bank-select"
            options={bankOptions}
            value={values.bankName}
            placeholder="Choose your bank"
            onChange={onBankChange}
            className="h-11 rounded-xl text-xs sm:text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="pro-bank-account-number"
            className="block text-xs font-semibold text-foreground"
          >
            Account Number
          </label>
          <div className="flex items-center gap-2.5">
            <Input
              id="pro-bank-account-number"
              type="text"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit account number"
              value={values.accountNumber}
              onChange={(e) => onAccountNumberChange(e.target.value)}
              className="h-11 rounded-xl text-xs sm:text-sm"
            />
            <Button
              type="button"
              variant="default"
              size="sm"
              loading={isVerifying}
              loadingText="Verifying..."
              onClick={onVerifyAccount}
              className="h-11 px-5 rounded-xl text-xs font-bold shrink-0"
            >
              Verify
            </Button>
          </div>
          {verificationError && (
            <p className="text-xs font-medium text-error pt-0.5">
              {verificationError}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="pro-bank-account-name"
            className="block text-xs font-semibold text-foreground"
          >
            Account Name
          </label>
          <Input
            id="pro-bank-account-name"
            type="text"
            readOnly
            value={values.accountName || "-"}
            className={cn(
              "h-11 rounded-xl text-xs sm:text-sm bg-secondary/40 font-medium cursor-default",
              values.isVerified && "border-success/50 text-foreground font-bold"
            )}
          />
          <p className="text-[11px] text-muted-foreground">
            This will be auto-populated once your account number is verified.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground">Account Type</p>
          <div className="grid grid-cols-2 gap-3">
            {ACCOUNT_TYPES.map((typeOption) => {
              const isSelected = values.accountType === typeOption.id;
              return (
                <button
                  key={typeOption.id}
                  type="button"
                  onClick={() => onAccountTypeChange(typeOption.id)}
                  className={cn(
                    "h-11 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer",
                    isSelected
                      ? "border-primary bg-accent/60 text-primary font-bold shadow-2xs"
                      : "border-border bg-card text-foreground hover:bg-secondary/40 font-medium"
                  )}
                >
                  {typeOption.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-secondary/35 p-4 flex items-start gap-3">
          <Info className="size-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground">
              IMPORTANT
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ensure the account name matches your professional profile name (
              {profileName}) for successful verification. Discrepancies may
              delay your payouts.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border/70 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="h-10 px-6 rounded-xl text-xs font-bold"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onSave}
            className="h-10 px-6 rounded-xl text-xs font-bold shadow-xs"
          >
            Save Bank Account
          </Button>
        </div>
      </div>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Shield className="size-3.5 text-muted-foreground shrink-0" />
        <span>
          Your data is encrypted and managed according to PCI-DSS standards.
        </span>
      </p>
    </div>
  );
}
