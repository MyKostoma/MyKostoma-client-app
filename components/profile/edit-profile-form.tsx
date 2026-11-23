"use client";

import type { FormEvent, KeyboardEvent } from "react";
import { ArrowLeft, Camera, Lock, Map, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { FormField, Input, Select, Textarea } from "@/components/ui/form-fields";
import { cn } from "@/lib/utils";
import type { EditProfileFormProps } from "./types";

export function EditProfileForm({
  fullName,
  fullNameError,
  category,
  categoryOptions,
  location,
  locationError,
  locationPresets,
  showMapPicker,
  bio,
  bioError,
  skills,
  skillInput,
  avatarUrl,
  isSaving = false,
  onFullNameChange,
  onCategoryChange,
  onLocationChange,
  onToggleMapPicker,
  onSelectPresetLocation,
  onBioChange,
  onSkillInputChange,
  onAddSkill,
  onRemoveSkill,
  onUploadPhotoClick,
  onRemovePhoto,
  onRequestContactUpdate,
  onBack,
  onCancel,
  onSubmit,
}: EditProfileFormProps) {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      onAddSkill();
    } else if (e.key === "Backspace" && !skillInput && skills.length > 0) {
      onRemoveSkill(skills[skills.length - 1]);
    }
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

      {/* Profile Picture Card */}
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
            <p className="text-sm font-bold text-foreground">Profile Picture</p>
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

      {/* Basic Information Card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-5">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          BASIC INFORMATION
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="edit-profile-fullname"
            label="FULL NAME"
            state={fullNameError ? "error" : "default"}
            errorMessage={fullNameError}
          >
            <Input
              id="edit-profile-fullname"
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value)}
              placeholder="Enter your full name"
              disabled={isSaving}
              state={fullNameError ? "error" : "default"}
              className="h-11 rounded-xl bg-card"
            />
          </FormField>

          <FormField id="edit-profile-category" label="PROFESSIONAL CATEGORY">
            <Select
              id="edit-profile-category"
              value={category}
              onChange={(value) => onCategoryChange(value)}
              disabled={isSaving}
              options={categoryOptions.map((cat) => ({
                label: cat,
                value: cat,
              }))}
              className="h-11 rounded-xl bg-card"
            />
          </FormField>
        </div>

        <div className="space-y-3">
          <FormField
            id="edit-profile-location"
            label="LOCATION"
            state={locationError ? "error" : "default"}
            errorMessage={locationError}
          >
            <Input
              id="edit-profile-location"
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
            className="w-full rounded-xl border border-dashed border-border bg-secondary/40 hover:bg-secondary/70 py-6 px-4 flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Map className="size-5" />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {showMapPicker
                ? "HIDE SERVICE AREA PICKER"
                : "CLICK TO SELECT ON MAP"}
            </span>
          </button>

          {showMapPicker && (
            <div className="rounded-xl border border-border bg-secondary/30 p-3.5 space-y-2.5 animate-in fade-in duration-150">
              <p className="text-[11px] font-semibold text-muted-foreground">
                Quick-select a Nigerian service hub:
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
            id="edit-profile-bio"
            label="PROFESSIONAL BIO"
            state={bioError ? "error" : "default"}
            errorMessage={bioError}
          >
            <Textarea
              id="edit-profile-bio"
              value={bio}
              onChange={(e) => onBioChange(e.target.value)}
              placeholder="Write a concise summary of your experience and design approach..."
              disabled={isSaving}
              state={bioError ? "error" : "default"}
              className="min-h-28 rounded-xl bg-card resize-none"
            />
          </FormField>
          <p className="text-right text-[11px] text-muted-foreground">
            {bio.length} / 500 characters
          </p>
        </div>
      </div>

      {/* Skills & Specializations Card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            SKILLS &amp; SPECIALIZATIONS
          </h2>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            MAX 10
          </span>
        </div>

        <div className="rounded-xl border border-border bg-card p-3 space-y-3">
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className="hover:opacity-80 cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => onSkillInputChange(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              disabled={isSaving || skills.length >= 10}
              placeholder={
                skills.length >= 10
                  ? "Maximum 10 skills reached"
                  : "Add skill and press Enter..."
              }
              className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 outline-none py-1 px-1"
            />
            {skillInput.trim() && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onAddSkill()}
                className="h-7 px-3 rounded-lg text-[11px] font-semibold shrink-0"
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Contact & Privacy Card */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-2xs flex items-start gap-4">
        <div className="size-10 rounded-xl bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
          <Lock className="size-4" />
        </div>

        <div className="space-y-2.5 min-w-0">
          <div className="space-y-1">
            <p className="text-sm font-bold text-foreground">
              Contact &amp; Privacy
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your phone number and exact email address are only visible to
              clients who have a confirmed booking with you. This is to ensure
              professional privacy and platform security.
            </p>
          </div>

          <button
            type="button"
            onClick={onRequestContactUpdate}
            className="text-[11px] font-bold uppercase tracking-wider text-foreground underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
          >
            REQUEST INFORMATION UPDATE
          </button>
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
