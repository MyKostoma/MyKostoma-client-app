"use client";

import { Calendar, Check, MapPin, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FollowButton } from "./follow-button";
import { ProfileMessageComposer } from "./profile-message-composer";
import type { ProfessionalProfileData, ProfileTabId } from "./types";

export interface ProfileTabOption {
  id: ProfileTabId;
  label: string;
}

export const PROFILE_TABS: ProfileTabOption[] = [
  { id: "services", label: "SERVICES" },
  { id: "portfolio", label: "PORTFOLIO" },
  { id: "reviews", label: "REVIEWS" },
  { id: "about", label: "ABOUT" },
];

export interface ProfileHeaderCardProps {
  profile: ProfessionalProfileData;
  activeTab: ProfileTabId;
  onTabChange: (tab: ProfileTabId) => void;
  isFollowing: boolean;
  onToggleFollow: () => void;
  isMessagingOpen: boolean;
  onToggleMessaging: () => void;
  messageText: string;
  onMessageTextChange: (text: string) => void;
  onSendMessage: () => void;
  className?: string;
}

export function ProfileHeaderCard({
  profile,
  activeTab,
  onTabChange,
  isFollowing,
  onToggleFollow,
  isMessagingOpen,
  onToggleMessaging,
  messageText,
  onMessageTextChange,
  onSendMessage,
  className,
}: ProfileHeaderCardProps) {
  return (
    <section
      aria-label={`${profile.name} profile overview`}
      className={cn(
        "w-full rounded-2xl border border-border bg-card overflow-hidden shadow-2xs transition-all",
        className
      )}
    >
      {/* Top Gradient Cover Banner */}
      <div
        aria-hidden="true"
        className="h-32 sm:h-40 w-full bg-linear-to-r from-primary via-primary-hover to-primary-active"
      />

      <div
        className={cn(
          "px-5 sm:px-8",
          isMessagingOpen ? "pb-6 sm:pb-8" : "pb-0"
        )}
      >
        {/* Overlapping Profile Avatar */}
        <div className="relative -mt-12 sm:-mt-14 mb-3.5 inline-block">
          <div className="size-24 sm:size-28 rounded-2xl border-4 border-card bg-secondary shadow-md overflow-hidden">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover select-none"
            />
          </div>
        </div>

        {/* Identity Info & Action Buttons Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          {/* Left Identity Column */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                {profile.name}
              </h1>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-warning-bg border border-warning/20 text-warning text-[9px] sm:text-[10px] font-bold uppercase tracking-wider select-none">
                <span className="size-3.5 rounded-full bg-warning text-warning-foreground flex items-center justify-center shrink-0">
                  <Check className="size-2 stroke-[3.5]" />
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
          <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Button
                type="button"
                variant={isMessagingOpen ? "default" : "secondary"}
                onClick={onToggleMessaging}
                leadingIcon={<MessageSquare className="size-3.5 fill-current" />}
                className={cn(
                  "h-10 px-4 sm:px-5 rounded-xl text-[11px] font-bold uppercase tracking-wider",
                  isMessagingOpen ? "shadow-xs" : "text-foreground"
                )}
              >
                MESSAGE
              </Button>

              <FollowButton
                isFollowing={isFollowing}
                onToggleFollow={onToggleFollow}
              />
            </div>

            {isMessagingOpen && (
              <span className="text-[10px] font-bold italic uppercase tracking-wider text-muted-foreground/80 mt-0.5 select-none">
                INTERACTION STATE:{" "}
                {isFollowing ? "FOLLOWING (ACTIVE)" : "DEFAULT"}
              </span>
            )}
          </div>
        </div>

        {/* Conditional Lower Area: Inline Message Composer (Image 2) vs Bio & Tabs (Image 1) */}
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
            {/* Professional Bio */}
            <div id="about" className="mt-6 max-w-2xl space-y-2">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                PROFESSIONAL BIO
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {profile.bio}
              </p>
            </div>

            {/* Bottom Navigation Tabs */}
            <div
              role="tablist"
              aria-label="Profile sections"
              className="mt-6 border-t border-border/70 -mx-5 sm:-mx-8 px-5 sm:px-8 flex items-center gap-6 sm:gap-9 overflow-x-auto no-scrollbar"
            >
              {PROFILE_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                      "relative py-3.5 px-1 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap",
                      isActive
                        ? "text-primary"
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
          </>
        )}
      </div>
    </section>
  );
}
