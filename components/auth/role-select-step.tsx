"use client";

import { Button } from "@/components/ui/button";
import { AuthCard } from "./auth-card";
import { SelectableCard } from "./selectable-card";
import { ROLE_META } from "./register-details-form";
import type { Role, RoleSelectStepProps } from "./types";

const OPTIONS: { role: Role; title: string; description: string }[] = [
  {
    role: "consumer",
    title: "Consumer",
    description:
      "I want to find and hire professionals for my personal or business needs.",
  },
  {
    role: "professional",
    title: "Professional",
    description:
      "I want to offer my services, manage bookings, and grow my business.",
  },
];

export function RoleSelectStep({
  role,
  onRoleChange,
  onSubmit,
  onBack,
}: RoleSelectStepProps) {
  return (
    <AuthCard
      title="Join MyKostoma as a..."
      subtitle="Choose the account type that best fits your needs."
    >
      <div role="radiogroup" aria-label="Account type" className="space-y-3">
        {OPTIONS.map((o) => (
          <SelectableCard
            key={o.role}
            icon={ROLE_META[o.role].icon}
            title={o.title}
            description={o.description}
            selected={role === o.role}
            onSelect={() => onRoleChange(o.role)}
          />
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <Button size="default" className="w-full" onClick={onSubmit}>
          Create Account
        </Button>
        <Button className="w-full" onClick={onBack}>
          Go Back
        </Button>
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        By clicking &quot;Create Account&quot;, you agree to our{" "}
        <a
          href="#"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Privacy Policy
        </a>
        .
      </p>
    </AuthCard>
  );
}
