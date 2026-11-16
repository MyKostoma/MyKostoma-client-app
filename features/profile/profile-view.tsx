"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProfileHeaderCard } from "@/components/profile/profile-header-card";
import { ProfileTabsNav } from "@/components/profile/profile-tabs-nav";
import { AvailableServicesSection } from "@/components/profile/available-services-section";
import { PortfolioShowcaseSection } from "@/components/profile/portfolio-showcase-section";
import { ClientReviewsSection } from "@/components/profile/client-reviews-section";
import { cn } from "@/lib/utils";
import { useProfileService } from "./services/profileApi";
import type { ProfileViewProps } from "./types";

export type { ProfileViewProps };

export function ProfileView({
  profile: profileProp,
  initialMessagingOpen = false,
  initialFollowing = false,
}: ProfileViewProps) {
  const {
    router,
    profile,
    activeTab,
    isFollowing,
    isMessagingOpen,
    setIsMessagingOpen,
    messageText,
    setMessageText,
    isStuck,
    handleTabChange,
    handleToggleFollow,
    handleToggleMessaging,
    handleServiceAction,
    handleSendMessage,
  } = useProfileService({
    profile: profileProp,
    initialMessagingOpen,
    initialFollowing,
  });

  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
      <Breadcrumb className="pb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => router.push("/home")}
              className="cursor-pointer"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => router.push("/search")}
              className="cursor-pointer"
            >
              Find Professionals
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-foreground">
              {profile.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
