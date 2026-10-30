"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  ProfileHeaderCard,
  AvailableServicesSection,
  PortfolioShowcaseSection,
  ClientReviewsSection,
  ProfileInteractionDetails,
  type ProfessionalProfileData,
  type ProfileServiceItem,
  type ProfileTabId,
} from "@/components/profile";
import { DEFAULT_PROFESSIONAL_PROFILE } from "./data";

export interface ProfileViewProps {
  profile?: ProfessionalProfileData;
  initialMessagingOpen?: boolean;
  initialFollowing?: boolean;
}

export function ProfileView({
  profile = DEFAULT_PROFESSIONAL_PROFILE,
  initialMessagingOpen = false,
  initialFollowing = false,
}: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<ProfileTabId>("services");
  const [isFollowing, setIsFollowing] = useState<boolean>(initialFollowing);
  const [isMessagingOpen, setIsMessagingOpen] = useState<boolean>(
    initialMessagingOpen
  );
  const [messageText, setMessageText] = useState<string>("");

  const handleTabChange = (tab: ProfileTabId) => {
    setActiveTab(tab);
    const sectionEl = document.getElementById(tab);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleToggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  const handleToggleMessaging = () => {
    setIsMessagingOpen((prev) => !prev);
  };

  const handleServiceAction = (service: ProfileServiceItem) => {
    const firstName = profile.name.split(" ")[0] || profile.name;
    setMessageText(
      `Hi ${firstName}, I'm interested in your ${service.title} service.`
    );
    setIsMessagingOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectQuickAction = (actionText: string) => {
    setMessageText(actionText);
  };

  const handleSendMessage = () => {
    const trimmed = messageText.trim();
    if (!trimmed) {
      toast.error("Please enter a message before sending.");
      return;
    }
    toast.success(`Message sent to ${profile.name}!`);
    setMessageText("");
    setIsMessagingOpen(false);
  };

  return (
    <main className="flex-1 container px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12">
      <ProfileHeaderCard
        profile={profile}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isFollowing={isFollowing}
        onToggleFollow={handleToggleFollow}
        isMessagingOpen={isMessagingOpen}
        onToggleMessaging={handleToggleMessaging}
        messageText={messageText}
        onMessageTextChange={setMessageText}
        onSendMessage={handleSendMessage}
      />

      {isMessagingOpen ? (
        <ProfileInteractionDetails
          recipientName={profile.name}
          responseTimeText={profile.responseTimeText}
          quickActions={profile.quickActions}
          onSelectQuickAction={handleSelectQuickAction}
          onSetFollowing={setIsFollowing}
        />
      ) : (
        <div className="space-y-10 sm:space-y-12">
          <AvailableServicesSection
            services={profile.services}
            onServiceAction={handleServiceAction}
          />

          <PortfolioShowcaseSection items={profile.portfolio} />

          <ClientReviewsSection
            rating={profile.rating}
            reviewCount={profile.reviewCount}
            breakdown={profile.ratingBreakdown}
            reviews={profile.reviews}
          />
        </div>
      )}
    </main>
  );
}

export default ProfileView;
