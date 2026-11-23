"use client";

import Link from "next/link";
import { Building2, IdCard } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProfileHeaderCard } from "@/components/profile/profile-header-card";
import {
  COMPANY_PROFILE_TABS,
  PROFILE_TABS,
  ProfileTabsNav,
} from "@/components/profile/profile-tabs-nav";
import { CompanyIdentitySection } from "@/components/profile/company-identity-section";
import { AvailableServicesSection } from "@/components/profile/available-services-section";
import { PortfolioShowcaseSection } from "@/components/profile/portfolio-showcase-section";
import { ClientReviewsSection } from "@/components/profile/client-reviews-section";
import { ProfileServicesTab } from "@/components/profile/profile-services-tab";
import { ProfilePortfolioTab } from "@/components/profile/profile-portfolio-tab";
import { ProfileReviewsTab } from "@/components/profile/profile-reviews-tab";
import {
  PortfolioProjectModal,
  WriteReviewModal,
} from "@/components/modals/profile-modals";
import { cn } from "@/lib/utils";
import { useProfileService } from "./services/profileApi";
import type { ProfileViewProps } from "./types";

export type { ProfileViewProps };

export function ProfileView({
  profile: profileProp,
  entityMode,
  forcePerspective,
  initialTab = "overview",
  initialMessagingOpen = false,
  initialFollowing = false,
}: ProfileViewProps) {
  const {
    router,
    profile,
    isCompanyProfile,
    companyDetails,
    isOwner,
    isOwnerRole,
    isPreviewingAsClient,
    activeTab,
    isFollowing,
    isMessagingOpen,
    setIsMessagingOpen,
    messageText,
    setMessageText,
    servicesSearchQuery,
    setServicesSearchQuery,
    filteredServices,
    portfolioCategories,
    portfolioCategory,
    setPortfolioCategory,
    portfolioSort,
    setPortfolioSort,
    paginatedPortfolio,
    setPortfolioPage,
    reviewsSort,
    setReviewsSort,
    reviewsFilter,
    setReviewsFilter,
    paginatedReviews,
    filteredReviewsCount,
    setReviewsPage,
    repliedReviewsCount,
    helpfulReviewIds,
    portfolioModalOpen,
    setPortfolioModalOpen,
    portfolioModalMode,
    selectedPortfolioItem,
    writeReviewModalOpen,
    setWriteReviewModalOpen,
    handleTabChange,
    handleToggleFollow,
    handleToggleMessaging,
    handleServiceAction,
    handleManageService,
    handleAddNewService,
    handleSendMessage,
    handleEditProfileClick,
    handleEditPhotoClick,
    handleShareProfileClick,
    handleTogglePreviewAsClient,
    handleOpenPortfolioItem,
    handleOpenAddProjectModal,
    handleCreatePortfolioProject,
    handleDeletePortfolioProject,
    handleReplyToReview,
    handleSubmitCustomerReview,
    handleToggleReviewHelpful,
    handleShareReview,
    handleSocialClick,
  } = useProfileService({
    profile: profileProp,
    entityMode,
    forcePerspective,
    initialTab,
    initialMessagingOpen,
    initialFollowing,
  });

  const handleOpenCustomerMessage = () => {
    setIsMessagingOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            {isOwnerRole && !profileProp ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => router.push("/dashboard")}
                    className="cursor-pointer"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-foreground">
                    {isCompanyProfile ? "Company Profile" : "My Profile"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <>
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
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {isOwnerRole && !profileProp && (
          <div className="inline-flex items-center gap-1 p-1 rounded-full border border-border bg-card shadow-2xs">
            <Link
              href="/profile"
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors",
                !isCompanyProfile
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <IdCard className="size-3.5" />
              <span>Individual Profile</span>
            </Link>

            <Link
              href="/profile/company"
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors",
                isCompanyProfile
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Building2 className="size-3.5" />
              <span>Company Profile</span>
            </Link>
          </div>
        )}
      </div>

      <ProfileHeaderCard
        profile={profile}
        companyDetails={companyDetails}
        activeTab={activeTab}
        isOwner={isOwner}
        isPreviewingAsClient={isPreviewingAsClient}
        isFollowing={isFollowing}
        onToggleFollow={handleToggleFollow}
        isMessagingOpen={isMessagingOpen}
        onToggleMessaging={handleToggleMessaging}
        messageText={messageText}
        onMessageTextChange={setMessageText}
        onSendMessage={handleSendMessage}
        onEditProfileClick={handleEditProfileClick}
        onEditPhotoClick={handleEditPhotoClick}
        onShareProfileClick={handleShareProfileClick}
        onTogglePreviewAsClient={
          isOwnerRole ? handleTogglePreviewAsClient : undefined
        }
      />

      {!isMessagingOpen && (
        <div className="space-y-8 sm:space-y-10">
          <ProfileTabsNav
            tabs={isCompanyProfile ? COMPANY_PROFILE_TABS : PROFILE_TABS}
            profile={profile}
            isOwner={isOwner}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onMessageClick={handleOpenCustomerMessage}
            onEditClick={handleEditProfileClick}
          />

          {activeTab === "overview" &&
            (isCompanyProfile && companyDetails ? (
              <CompanyIdentitySection
                profile={profile}
                companyDetails={companyDetails}
                onSocialClick={handleSocialClick}
              />
            ) : (
              <div className="space-y-10 sm:space-y-12">
                <AvailableServicesSection
                  isOwner={isOwner}
                  services={profile.services.slice(0, 2)}
                  actionLabel={
                    profile.services.length > 2
                      ? "VIEW ALL SERVICES"
                      : "SEE SERVICES TAB"
                  }
                  onViewAllClick={() => handleTabChange("services")}
                  onServiceAction={handleServiceAction}
                />

                <PortfolioShowcaseSection
                  isOwner={isOwner}
                  items={profile.portfolio.slice(0, 3)}
                  onViewAllClick={() => handleTabChange("portfolio")}
                  onAddProjectClick={handleOpenAddProjectModal}
                  onItemClick={handleOpenPortfolioItem}
                />

                <ClientReviewsSection
                  professionalName={profile.name}
                  isOwner={isOwner}
                  rating={profile.rating}
                  reviewCount={profile.reviewCount}
                  breakdown={profile.ratingBreakdown}
                  reviews={profile.reviews.slice(0, 2)}
                  onViewAllClick={() => handleTabChange("reviews")}
                  onSubmitReply={handleReplyToReview}
                />
              </div>
            ))}

          {activeTab === "services" && (
            <ProfileServicesTab
              services={filteredServices}
              searchQuery={servicesSearchQuery}
              isOwner={isOwner}
              onSearchChange={setServicesSearchQuery}
              onBookService={handleServiceAction}
              onInquireService={handleServiceAction}
              onManageService={handleManageService}
              onAddNewService={handleAddNewService}
            />
          )}

          {activeTab === "portfolio" && (
            <ProfilePortfolioTab
              items={paginatedPortfolio.items}
              categories={portfolioCategories}
              selectedCategory={portfolioCategory}
              sortBy={portfolioSort}
              currentPage={paginatedPortfolio.currentPage}
              totalPages={paginatedPortfolio.totalPages}
              isOwner={isOwner}
              onSelectCategory={setPortfolioCategory}
              onSortChange={setPortfolioSort}
              onPageChange={setPortfolioPage}
              onItemClick={handleOpenPortfolioItem}
              onAddProject={handleOpenAddProjectModal}
              onDeleteProject={handleDeletePortfolioProject}
            />
          )}

          {activeTab === "reviews" && (
            <ProfileReviewsTab
              professionalName={profile.name}
              rating={profile.rating}
              reviewCount={profile.reviewCount}
              breakdown={profile.ratingBreakdown}
              reviews={paginatedReviews.items}
              totalFilteredCount={filteredReviewsCount}
              repliedCount={repliedReviewsCount}
              sortBy={reviewsSort}
              filterBy={reviewsFilter}
              currentPage={paginatedReviews.currentPage}
              totalPages={paginatedReviews.totalPages}
              isOwner={isOwner}
              helpfulReviewIds={helpfulReviewIds}
              onSortChange={setReviewsSort}
              onFilterChange={setReviewsFilter}
              onPageChange={setReviewsPage}
              onToggleHelpful={handleToggleReviewHelpful}
              onShareReview={handleShareReview}
              onSubmitReply={handleReplyToReview}
              onWriteReview={() => setWriteReviewModalOpen(true)}
            />
          )}
        </div>
      )}

      <PortfolioProjectModal
        isOpen={portfolioModalOpen}
        mode={portfolioModalMode}
        project={selectedPortfolioItem}
        categories={portfolioCategories}
        isOwner={isOwner}
        onClose={() => setPortfolioModalOpen(false)}
        onCreateProject={handleCreatePortfolioProject}
        onDeleteProject={handleDeletePortfolioProject}
      />

      <WriteReviewModal
        isOpen={writeReviewModalOpen}
        recipientName={profile.name}
        onClose={() => setWriteReviewModalOpen(false)}
        onSubmitReview={handleSubmitCustomerReview}
      />
    </main>
  );
}

export default ProfileView;
