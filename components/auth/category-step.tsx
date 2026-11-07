"use client";

import { useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  Faucet,
  Zap,
  Mop,
  Flower2,
  BookOpen,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/form-fields";
import { AuthCard } from "./auth-card";
import { SelectableCard } from "./selectable-card";
import type { CategoryStepProps } from "./types";

export const SERVICE_CATEGORIES = [
  { id: "plumbing", label: "Plumbing", icon: Faucet },
  { id: "electrical", label: "Electrical", icon: Zap },
  { id: "cleaning", label: "Cleaning", icon: Mop },
  { id: "beauty-wellness", label: "Beauty & Wellness", icon: Flower2 },
  { id: "tutoring", label: "Tutoring", icon: BookOpen },
  { id: "event-planning", label: "Event Planning", icon: CalendarCheck },
];

export function CategoryStep({
  value,
  onChange,
  onSubmit,
  onBack,
  backLabel = "Back to Role Selection",
  stepLabel = "Step 3 of 4",
  loading,
}: CategoryStepProps) {
  const [query, setQuery] = useState("");
  const filtered = SERVICE_CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <AuthCard
      size="lg"
      title="Select your primary service category"
      subtitle="Choose the category that best describes your professional service to help customers find you."
    >
      <SearchInput
        placeholder="Search for categories (e.g. Plumbing, Design...)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search categories"
      />

      <div
        role="radiogroup"
        aria-label="Service category"
        className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3"
      >
        {filtered.map((c) => (
          <SelectableCard
            key={c.id}
            layout="stack"
            icon={c.icon}
            title={c.label}
            selected={value === c.id}
            onSelect={() => onChange(c.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-6 text-center text-sm text-muted-foreground">
            No categories match your search.
          </p>
        )}
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <Button
          className="w-full"
          disabled={!value}
          loading={loading}
          trailingIcon={<ArrowRight />}
          onClick={onSubmit}
        >
          Continue
        </Button>

        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="primary"
            size="sm"
            leadingIcon={<ChevronLeft />}
            onClick={onBack}
            disabled={loading}
          >
            {backLabel}
          </Button>
          <span className="text-xs text-muted-foreground">{stepLabel}</span>
        </div>
      </div>
    </AuthCard>
  );
}
