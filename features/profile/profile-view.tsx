"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  ProfileHeaderCard,
  ProfileTabsNav,
  AvailableServicesSection,
  PortfolioShowcaseSection,
  ClientReviewsSection,
  type ProfessionalProfileData,
  type ProfileServiceItem,
  type ProfileTabId,
} from "@/components/profile";
import { cn } from "@/lib/utils";
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
  const [isStuck, setIsStuck] = useState<boolean>(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor sticky status: triggers when the tab bar reaches sticky offset beneath AppHeader (~68px)
  useEffect(() => {
    const handleScroll = () => {
      if (!sentinelRef.current) return;
      const rect = sentinelRef.current.getBoundingClientRect();
      setIsStuck(rect.top <= 72);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy: automatically updates activeTab based on which section is currently in view
  useEffect(() => {
    if (isMessagingOpen) return;

    const handleScrollSpy = () => {
      if (isProgrammaticScrollRef.current) return;

      // If near the top of page, default to services
      if (window.scrollY < 200) {
        setActiveTab("services");
        return;
      }

      // Check sections from bottom to top
      const sections: ProfileTabId[] = ["reviews", "portfolio", "services"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Threshold: top of section reaches near sticky nav (~180px from viewport top)
          if (rect.top <= 180) {
            setActiveTab(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [isMessagingOpen]);

  const handleTabChange = (tab: ProfileTabId) => {
    setActiveTab(tab);
    isProgrammaticScrollRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 800);

    if (tab === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

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
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-8 sm:py-10">
      <ProfileHeaderCard
        profile={profile}
        isFollowing={isFollowing}
        onToggleFollow={handleToggleFollow}
        isMessagingOpen={isMessagingOpen}
        onToggleMessaging={handleToggleMessaging}
        messageText={messageText}
        onMessageTextChange={setMessageText}
        onSendMessage={handleSendMessage}
      />

      {!isMessagingOpen && (
        <div className="space-y-6 sm:space-y-8">
          {/* Sticky Tab Navigation Bar */}
          <div
            className={cn(
              "sticky top-[68px] sm:top-[69px] z-30 transition-all duration-200",
              isStuck
                ? "bg-background/90 backdrop-blur-md py-2 -my-2"
                : "py-0"
            )}
          >
            <ProfileTabsNav
              profile={profile}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onMessageClick={() => {
                setIsMessagingOpen(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              isStuck={isStuck}
            />
          </div>

          <div className="space-y-10 sm:space-y-12 pt-2">
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
        </div>
      )}
    </main>
  );
}

export default ProfileView;
