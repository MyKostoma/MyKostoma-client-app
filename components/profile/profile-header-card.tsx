"use client";

import {
  Briefcase,
  Calendar,
  Camera,
  Check,
  Eye,
  EyeOff,
  MapPin,
  MessageSquare,
  Pencil,
  Share2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { cn } from "@/lib/utils";
import { FollowButton } from "./follow-button";
import { ProfileMessageComposer } from "./profile-message-composer";
import { PROFILE_TABS } from "./profile-tabs-nav";
import type { ProfileHeaderCardProps } from "./types";

export type { ProfileHeaderCardProps } from "./types";

export function ProfileHeaderCard({
  profile,
  activeTab,
  onTabChange,
  isOwner = false,
  isPreviewingAsClient = false,
  isFollowing,
  onToggleFollow,
  isMessagingOpen,
  onToggleMessaging,
  messageText,
  onMessageTextChange,
  onSendMessage,
  onEditProfileClick,
  onEditPhotoClick,
  onShareProfileClick,
  onTogglePreviewAsClient,
  showTabs = false,
  className,
}: ProfileHeaderCardProps) {
  const isCompanyVerified = profile.verificationType === "company";

  return (
    <section
      aria-label={`${profile.name} profile overview`}
      className={cn(
        "w-full rounded-t-2xl border-t border-r border-l border-border bg-card overflow-hidden shadow-2xs transition-all",
        className
      )}
    >
      {/* Top Cover Banner */}
      <div
        aria-hidden="true"
        className="relative h-32 sm:h-40 w-full bg-linear-to-r from-primary via-primary-hover to-primary-active"
      >
        {isPreviewingAsClient && onTogglePreviewAsClient && (
          <div className="pointer-events-auto absolute top-3 right-3 sm:top-4 sm:right-6 flex items-center gap-2 rounded-full bg-card/95 border border-border px-3 py-1.5 shadow-sm">
            <span className="text-[11px] font-semibold text-foreground">
              Client Preview Mode
            </span>
            <button
              type="button"
              onClick={onTogglePreviewAsClient}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline cursor-pointer"
            >
              <EyeOff className="size-3" />
              <span>Exit</span>
            </button>
          </div>
        )}
      </div>

      <div
        className={cn(
          "px-4 sm:px-8",
          isMessagingOpen || !showTabs ? "pb-6 sm:pb-8" : "pb-0"
        )}
      >
        {/* Overlapping Profile Avatar */}
        <div className="relative -mt-12 sm:-mt-14 mb-4 inline-block">
          <div className="size-24 sm:size-28 rounded-2xl border-4 border-card bg-secondary shadow-md overflow-hidden">
            <FallbackImage
              src={profile.avatarUrl}
              alt={profile.name}
              fallbackType="user"
              variant="avatar"
              className="w-full h-full object-cover select-none"
            />
          </div>

          {isOwner && onEditPhotoClick && (
            <button
              type="button"
              onClick={onEditPhotoClick}
              aria-label="Update profile photo"
              title="Update profile photo"
              className="absolute -bottom-1.5 -right-1.5 size-8 rounded-xl border-2 border-card bg-primary text-primary-foreground flex items-center justify-center shadow-sm hover:bg-primary-hover transition-colors cursor-pointer"
            >
              <Camera className="size-3.5" />
            </button>
          )}
        </div>

        {/* Identity Info & Action Buttons Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                {profile.name}
              </h1>

              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] sm:text-[10px] font-bold uppercase tracking-wider select-none",
                  isCompanyVerified
                    ? "bg-info-bg border-info/25 text-info"
                    : "bg-warning-bg border-warning/25 text-warning"
                )}
              >
                <span
                  className={cn(
                    "size-3.5 rounded-full flex items-center justify-center shrink-0",
                    isCompanyVerified
                      ? "bg-info text-info-foreground"
                      : "bg-warning text-warning-foreground"
                  )}
                >
                  {isCompanyVerified ? (
                    <Briefcase className="size-2" />
                  ) : (
                    <Check className="size-2 stroke-[3.5]" />
                  )}
                </span>
                <span>{profile.verificationLabel}</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">
              {profile.roleTitle}
            </p>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs mt-3.5">
              <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                <MapPin className="size-3.5 text-muted-foreground shrink-0" />
                <span>{profile.location}</span>
              </span>

              <span className="inline-flex items-center gap-1">
                <Star className="size-3.5 text-warning fill-warning shrink-0" />
                <span className="font-bold text-foreground">
                  {profile.rating.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  ({profile.reviewCount} Reviews)
                </span>
              </span>

              {!isMessagingOpen && profile.experienceLabel && (
                <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <Calendar className="size-3.5 text-muted-foreground shrink-0" />
                  <span>{profile.experienceLabel}</span>
                </span>
              )}
            </div>
          </div>

          {/* Right Action Buttons Column */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {isOwner ? (
              <>
                {onTogglePreviewAsClient && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onTogglePreviewAsClient}
                    leadingIcon={<Eye className="size-3.5" />}
                    className="h-9 px-3 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Preview as Client
                  </Button>
                )}

                {onShareProfileClick && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onShareProfileClick}
                    leadingIcon={<Share2 className="size-3.5" />}
                    className="h-10 px-4 rounded-xl text-xs font-semibold"
                  >
                    Share
                  </Button>
                )}

                {onEditProfileClick && (
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={onEditProfileClick}
                    leadingIcon={<Pencil className="size-3.5" />}
                    className="h-10 px-5 rounded-xl text-xs font-semibold shadow-xs"
                  >
                    Edit Profile
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant={isMessagingOpen ? "default" : "secondary"}
                  size="sm"
                  onClick={onToggleMessaging}
                  leadingIcon={<MessageSquare className="size-3 fill-current" />}
                  className={cn(
                    "h-10 px-4 sm:px-5 rounded-xl text-[11px] font-semibold uppercase tracking-wider",
                    isMessagingOpen ? "shadow-xs" : "text-foreground"
                  )}
                >
                  MESSAGE
                </Button>

                <FollowButton
                  isFollowing={isFollowing}
                  onToggleFollow={onToggleFollow}
                />
              </>
            )}
          </div>
        </div>

        {/* Conditional Lower Area: Inline Message Composer vs Bio & Skills */}
        {isMessagingOpen ? (
          <ProfileMessageComposer
            recipientName={profile.name}
            messageValue={messageText}
            onMessageChange={onMessageTextChange}
            onCancel={onToggleMessaging}
            onSendMessage={onSendMessage}
          />
        ) : (
          <>
            <div className="mt-6 max-w-3xl space-y-2.5">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                PROFESSIONAL BIO
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {profile.bio}
              </p>

              {profile.skills && profile.skills.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1.5">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-secondary/80 border border-border/60 text-[11px] font-medium text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {showTabs && (
              <div
                role="tablist"
                aria-label="Profile sections"
                className="mt-6 border-t border-border/70 -mx-4 sm:-mx-8 px-4 sm:px-8 flex items-center gap-6 sm:gap-9 overflow-x-auto no-scrollbar"
              >
                {PROFILE_TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => onTabChange?.(tab.id)}
                      className={cn(
                        "relative py-3.5 px-1 text-xs sm:text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span>{tab.label}</span>
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
