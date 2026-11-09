"use client";

import { Checkbox } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { ShopConsentListProps } from "./types";

export function ShopConsentList({
  termsAccepted,
  scopeAccepted,
  onTermsChange,
  onScopeChange,
  className,
}: ShopConsentListProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs",
        className
      )}
    >
      <Checkbox
        id="shop-consent-terms"
        checked={termsAccepted}
        onCheckedChange={onTermsChange}
        label={
          <span className="text-xs sm:text-sm text-foreground leading-relaxed">
            I agree to the{" "}
            <span className="font-bold underline underline-offset-2">
              Terms of Service
            </span>{" "}
            and acknowledge that my payment will be held in{" "}
            <span className="font-bold">MyKostoma Escrow</span>. Funds are only
            released to the professional upon my explicit approval of the
            deliverables or after the dispute window expires.
          </span>
        }
      />

      <Checkbox
        id="shop-consent-scope"
        checked={scopeAccepted}
        onCheckedChange={onScopeChange}
        label={
          <span className="text-xs sm:text-sm text-foreground leading-relaxed">
            I have reviewed the scope of work and confirm that no further custom
            requirements are needed outside of the standard package
            deliverables.
          </span>
        }
      />
    </div>
  );
}

