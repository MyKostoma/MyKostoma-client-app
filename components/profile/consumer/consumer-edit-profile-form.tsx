"use client";

import type { FormEvent } from "react";
import { ArrowLeft, Camera, Lock, Mail, Map, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { FormField, Input, Textarea } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { ConsumerEditProfileFormProps } from "../types";

export function ConsumerEditProfileForm({
  fullName,
  fullNameError,
  email,
  emailError,
  phone,
  phoneError,
  location,
  locationError,
  locationPresets,
  showMapPicker,
  bio,
  bioError,
  preferredContact,
  contactOptions,
  serviceInterests,
  interestOptions,
  avatarUrl,
  isSaving = false,
  onFullNameChange,
  onEmailChange,
  onPhoneChange,
  onLocationChange,
  onToggleMapPicker,
  onSelectPresetLocation,
  onBioChange,
  onPreferredContactChange,
  onToggleInterest,
  onUploadPhotoClick,
  onRemovePhoto,
  onBack,
  onCancel,
  onSubmit,
}: ConsumerEditProfileFormProps) {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-3xl mx-auto space-y-6 pb-8"
    >
      {/* Top Back & Title Row */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to profile"
          className="size-9 rounded-xl border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary/70 transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="size-4" />
        </button>

        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          Edit Profile
        </h1>
      </div>

      {/* Profile Photo Card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex items-center gap-5">
        <div className="relative shrink-0">
          <div className="size-20 sm:size-22 rounded-2xl border border-border bg-secondary overflow-hidden">
            <FallbackImage
              src={avatarUrl}
              alt={fullName}
              fallbackType="user"
              variant="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={onUploadPhotoClick}
            aria-label="Change profile photo"
            className="absolute -bottom-1.5 -right-1.5 size-7 rounded-lg border-2 border-card bg-primary text-primary-foreground flex items-center justify-center shadow-xs hover:bg-primary-hover transition-colors cursor-pointer"
          >
            <Camera className="size-3.5" />
          </button>
        </div>

        <div className="space-y-2 min-w-0">
          <div>
            <p className="text-sm font-bold text-foreground">Profile Photo</p>
            <p className="text-xs text-muted-foreground">
              PNG or JPG. Max 5MB.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={onUploadPhotoClick}
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
            >
              UPLOAD NEW
            </button>
            <button
              type="button"
              onClick={onRemovePhoto}
              className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
            >
              REMOVE
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-5">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          PERSONAL INFORMATION
        </h2>

        <FormField
          id="consumer-fullname"
          label="FULL NAME"
          state={fullNameError ? "error" : "default"}
          errorMessage={fullNameError}
        >
          <Input
            id="consumer-fullname"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            placeholder="Enter your full name"
            disabled={isSaving}
            state={fullNameError ? "error" : "default"}
            className="h-11 rounded-xl bg-card"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="consumer-email"
            label="EMAIL ADDRESS"
            state={emailError ? "error" : "default"}
            errorMessage={emailError}
          >
            <Input
              id="consumer-email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="name@example.com"
              leadingIcon={<Mail className="size-4" />}
              disabled={isSaving}
              state={emailError ? "error" : "default"}
              className="h-11 rounded-xl bg-card"
            />
          </FormField>

          <FormField
            id="consumer-phone"
            label="PHONE NUMBER"
            state={phoneError ? "error" : "default"}
            errorMessage={phoneError}
          >
            <Input
              id="consumer-phone"
              type="tel"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="+234 800 000 0000"
              leadingIcon={<Phone className="size-4" />}
              disabled={isSaving}
              state={phoneError ? "error" : "default"}
              className="h-11 rounded-xl bg-card"
            />
          </FormField>
        </div>

        <div className="space-y-3">
          <FormField
            id="consumer-location"
            label="PRIMARY LOCATION"
            state={locationError ? "error" : "default"}
            errorMessage={locationError}
          >
            <Input
              id="consumer-location"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="e.g. Lekki Phase 1, Lagos"
              leadingIcon={<MapPin className="size-4" />}
              disabled={isSaving}
              state={locationError ? "error" : "default"}
              className="h-11 rounded-xl bg-card"
            />
          </FormField>

          <button
            type="button"
            onClick={onToggleMapPicker}
            className="w-full rounded-xl border border-dashed border-border bg-secondary/40 hover:bg-secondary/70 py-5 px-4 flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Map className="size-5" />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {showMapPicker
                ? "HIDE AREA PICKER"
                : "CLICK TO QUICK-SELECT AREA"}
            </span>
          </button>

          {showMapPicker && (
            <div className="rounded-xl border border-border bg-secondary/30 p-3.5 space-y-2.5 animate-in fade-in duration-150">
              <p className="text-[11px] font-semibold text-muted-foreground">
                Quick-select your neighborhood:
              </p>
              <div className="flex flex-wrap gap-2">
                {locationPresets.map((preset) => {
                  const isActive = location === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => onSelectPresetLocation(preset)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer",
                        isActive
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:bg-secondary"
                      )}
                    >
                      {preset}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <FormField
            id="consumer-bio"
            label="ABOUT & BOOKING NOTES (OPTIONAL)"
            state={bioError ? "error" : "default"}
            errorMessage={bioError}
          >
            <Textarea
              id="consumer-bio"
              value={bio}
              onChange={(e) => onBioChange(e.target.value)}
              placeholder="Helpful context for service pros (e.g. preferred visit hours, property type)..."
              disabled={isSaving}
              state={bioError ? "error" : "default"}
              className="min-h-24 rounded-xl bg-card resize-none"
            />
          </FormField>
          <p className="text-right text-[11px] text-muted-foreground">
            {bio.length} / 300 characters
          </p>
        </div>
      </div>

      {/* Preferences Card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-5">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          COMMUNICATION &amp; SERVICE PREFERENCES
        </h2>

        <div className="space-y-2">
          <span className="block text-xs font-semibold text-foreground">
            Preferred Contact Channel
          </span>
          <div className="flex flex-wrap gap-2">
            {contactOptions.map((opt) => {
              const active = preferredContact === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onPreferredContactChange(opt.value)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer",
                    active
                      ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                      : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <span className="block text-xs font-semibold text-foreground">
            Services You Typically Book
          </span>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((interest) => {
              const selected = serviceInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => onToggleInterest(interest)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer",
                    selected
                      ? "bg-accent text-primary border-primary/40 font-semibold"
                      : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground"
                  )}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Privacy Notice Card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex items-start gap-4">
        <div className="size-10 rounded-xl bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
          <Lock className="size-4" />
        </div>
        <div className="space-y-1 min-w-0">
          <p className="text-sm font-bold text-foreground">
            Privacy &amp; Booking Protection
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your saved street addresses, phone number, and exact email remain
            private and are revealed only to verified professionals after you
            confirm an order or request an on-site visit.
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isSaving}
          onClick={onCancel}
          className="h-10 px-6 rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          CANCEL
        </Button>

        <Button
          type="submit"
          variant="default"
          size="sm"
          loading={isSaving}
          loadingText="SAVING..."
          className="h-10 px-6 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs"
        >
          SAVE CHANGES
        </Button>
      </div>
    </form>
  );
}
