"use client";

import { useRef, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { FormField, Input, Textarea } from "@/components/ui/form-fields";
import type { ProfileSettingsFormProps } from "./types";

const MAX_BIO_CHARS = 500;

export function ProfileSettingsForm({
  isProfessional,
  avatarUrl,
  fullName,
  fullNameError,
  email,
  emailChangePending = false,
  phone,
  phoneError,
  location,
  locationError,
  bio,
  bioError,
  isSaving = false,
  onPhotoSelect,
  onFullNameChange,
  onRequestEmailChange,
  onPhoneChange,
  onLocationChange,
  onBioChange,
  onCancel,
  onSubmit,
}: ProfileSettingsFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onPhotoSelect(file);
    e.target.value = "";
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Breadcrumb & Heading */}
      <div className="space-y-1.5">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link href="/settings" className="hover:text-foreground">
            Settings
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="font-semibold text-foreground">Profile</span>
        </nav>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Profile Settings
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {isProfessional
            ? "This information will be displayed publicly so be careful what you share."
            : "Update your personal identity, contact channels, and booking preferences."}
        </p>
      </div>

      {/* Profile Photo Section */}
      <div className="pt-2 border-t border-border/80 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        <div className="md:col-span-4 space-y-1">
          <h3 className="text-sm font-bold text-foreground">Profile Photo</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {isProfessional
              ? "Update your professional photo to help clients identify you."
              : "Upload a clear profile photo so professionals recognize you."}
          </p>
        </div>

        <div className="md:col-span-8 flex flex-wrap items-center gap-5">
          <FallbackImage
            src={avatarUrl}
            alt={fullName}
            fallbackType="user"
            variant="avatar"
            className="size-16 rounded-full border border-border bg-secondary object-cover shrink-0"
          />

          <div className="space-y-1.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              leadingIcon={<Upload className="size-3.5" />}
              className="h-9 px-4 rounded-lg text-xs font-bold shadow-xs"
            >
              Upload New Photo
            </Button>
            <p className="text-[11px] text-muted-foreground">
              JPG, GIF or PNG. Max size 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Split */}
      <div className="pt-6 border-t border-border/80 grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        <div className="md:col-span-4 space-y-1">
          <h3 className="text-sm font-bold text-foreground">
            Personal Information
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your basic identity and location settings.
          </p>
        </div>

        <div className="md:col-span-8 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4">
          <FormField
            id="settings-profile-name"
            label="Full Name"
            state={fullNameError ? "error" : "default"}
            errorMessage={fullNameError}
          >
            <Input
              id="settings-profile-name"
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value)}
              placeholder="Enter full name"
            />
          </FormField>

          <div className="space-y-1.5">
            <label
              htmlFor="settings-profile-email"
              className="block text-xs font-semibold text-foreground"
            >
              Email Address
            </label>
            <div className="flex items-center gap-3">
              <Input
                id="settings-profile-email"
                value={email}
                readOnly
                className="bg-secondary/45 text-muted-foreground flex-1"
              />
              <button
                type="button"
                onClick={onRequestEmailChange}
                className="text-xs font-bold text-primary hover:underline underline-offset-4 shrink-0 cursor-pointer"
              >
                {emailChangePending ? "Updated" : "Change"}
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Email is used for secure login and account communication.
            </p>
          </div>

          <FormField
            id="settings-profile-phone"
            label="Phone Number"
            state={phoneError ? "error" : "default"}
            errorMessage={phoneError}
          >
            <Input
              id="settings-profile-phone"
              type="tel"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="+234 800 000 0000"
            />
          </FormField>

          <FormField
            id="settings-profile-location"
            label="Location"
            state={locationError ? "error" : "default"}
            errorMessage={locationError}
          >
            <div className="relative">
              <MapPin className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                id="settings-profile-location"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="City, State"
                className="pl-9"
              />
            </div>
          </FormField>

          <FormField
            id="settings-profile-bio"
            label={isProfessional ? "Bio / Professional Summary" : "Booking Notes"}
            state={bioError ? "error" : "default"}
            errorMessage={bioError}
          >
            <Textarea
              id="settings-profile-bio"
              value={bio}
              maxLength={MAX_BIO_CHARS}
              onChange={(e) => onBioChange(e.target.value)}
              placeholder={
                isProfessional
                  ? "Tell clients about your experience and specialty..."
                  : "Share helpful arrival instructions or general preferences for artisans..."
              }
              className="min-h-28 resize-none text-xs sm:text-sm"
            />
            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
              <span>
                {isProfessional
                  ? "Tell us a little about your professional background."
                  : "Visible when confirming direct bookings."}
              </span>
              <span>
                {bio.length}/{MAX_BIO_CHARS} characters
              </span>
            </div>
          </FormField>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-border/80 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="h-9 px-5 rounded-lg text-xs font-semibold"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="default"
          size="sm"
          loading={isSaving}
          loadingText="Saving..."
          className="h-9 px-5 rounded-lg text-xs font-bold shadow-xs"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
