"use client";

import { useEffect, useState, type FormEvent } from "react";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormField,
  Input,
  Switch,
  Textarea,
} from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { ConsumerAddressTag } from "@/components/profile/types";
import type { ConsumerAddressModalProps } from "./types";

export type { ConsumerAddressModalProps } from "./types";

const ADDRESS_TAGS: readonly ConsumerAddressTag[] = [
  "Home",
  "Office",
  "Other",
];

const DEFAULT_AREAS: readonly string[] = [
  "Lekki Phase 1, Lagos",
  "Victoria Island, Lagos",
  "Ikoyi, Lagos",
  "Ikeja GRA, Lagos",
  "Wuse II, Abuja",
];

export function ConsumerAddressModal({
  isOpen,
  editingAddress,
  areaPresets = DEFAULT_AREAS,
  onClose,
  onSaveAddress,
}: ConsumerAddressModalProps) {
  const [label, setLabel] = useState("");
  const [tag, setTag] = useState<ConsumerAddressTag>("Home");
  const [streetAddress, setStreetAddress] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [phone, setPhone] = useState("");
  const [accessNotes, setAccessNotes] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;

    if (editingAddress) {
      setLabel(editingAddress.label);
      setTag(editingAddress.tag);
      setStreetAddress(editingAddress.streetAddress);
      setArea(editingAddress.area);
      setLandmark(editingAddress.landmark ?? "");
      setPhone(editingAddress.phone);
      setAccessNotes(editingAddress.accessNotes ?? "");
      setIsDefault(editingAddress.isDefault);
    } else {
      setLabel("");
      setTag("Home");
      setStreetAddress("");
      setArea(areaPresets[0] ?? "Lekki Phase 1, Lagos");
      setLandmark("");
      setPhone("");
      setAccessNotes("");
      setIsDefault(false);
    }
    setError(undefined);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [areaPresets, editingAddress, isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !label.trim() ||
      !streetAddress.trim() ||
      !area.trim() ||
      !phone.trim()
    ) {
      setError(
        "Please complete the label, street address, area, and contact phone."
      );
      return;
    }

    onSaveAddress({
      id: editingAddress?.id,
      label: label.trim(),
      tag,
      streetAddress: streetAddress.trim(),
      area: area.trim(),
      landmark: landmark.trim() || undefined,
      phone: phone.trim(),
      accessNotes: accessNotes.trim() || undefined,
      isDefault,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consumer-address-dialog-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <MapPin className="size-4" />
            </div>
            <div>
              <h2
                id="consumer-address-dialog-title"
                className="text-base sm:text-lg font-bold text-foreground tracking-tight"
              >
                {editingAddress ? "Edit Service Address" : "Add Service Address"}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Used only with professionals you book for on-site services.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close address modal"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-1.5">
          <span className="block text-xs font-semibold text-foreground">
            Address Type
          </span>
          <div className="flex flex-wrap gap-2">
            {ADDRESS_TAGS.map((optionTag) => {
              const active = tag === optionTag;
              return (
                <button
                  key={optionTag}
                  type="button"
                  onClick={() => setTag(optionTag)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer",
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {optionTag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <FormField id="address-label" label="Address Label" required>
            <Input
              id="address-label"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
                setError(undefined);
              }}
              placeholder="e.g. Primary Residence"
            />
          </FormField>

          <FormField id="address-phone" label="On-Site Contact Phone" required>
            <Input
              id="address-phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError(undefined);
              }}
              placeholder="+234 803 452 8910"
            />
          </FormField>
        </div>

        <FormField id="address-street" label="Street Address" required>
          <Input
            id="address-street"
            value={streetAddress}
            onChange={(e) => {
              setStreetAddress(e.target.value);
              setError(undefined);
            }}
            placeholder="e.g. 14B Admiralty Road"
          />
        </FormField>

        <div className="space-y-2">
          <FormField id="address-area" label="Area / City" required>
            <Input
              id="address-area"
              value={area}
              onChange={(e) => {
                setArea(e.target.value);
                setError(undefined);
              }}
              placeholder="e.g. Lekki Phase 1, Lagos"
            />
          </FormField>

          <div className="flex flex-wrap gap-1.5">
            {areaPresets.slice(0, 4).map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setArea(preset)}
                className="px-2.5 py-1 rounded-md bg-secondary text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <FormField id="address-landmark" label="Nearest Landmark (Optional)">
          <Input
            id="address-landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="e.g. Opposite Sterling Bank"
          />
        </FormField>

        <FormField
          id="address-notes"
          label="Gate / Access Instructions (Optional)"
          state={error ? "error" : "default"}
          errorMessage={error}
        >
          <Textarea
            id="address-notes"
            value={accessNotes}
            onChange={(e) => setAccessNotes(e.target.value)}
            placeholder="Gatehouse instructions, estate code rules, or preferred arrival hours..."
            className="min-h-20 resize-none"
          />
        </FormField>

        <div className="rounded-xl border border-border bg-secondary/40 px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-foreground">
              Set as default service address
            </p>
            <p className="text-[11px] text-muted-foreground">
              Pre-fills new requests and bookings automatically.
            </p>
          </div>
          <Switch checked={isDefault} onCheckedChange={setIsDefault} />
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
            {editingAddress ? "Save Address" : "Add Address"}
          </Button>
        </div>
      </form>
    </div>
  );
}
