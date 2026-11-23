"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ConsumerProfileHeader } from "@/components/profile/consumer/consumer-profile-header";
import { ConsumerProfileTabs } from "@/components/profile/consumer/consumer-profile-tabs";
import { ConsumerOverviewSection } from "@/components/profile/consumer/consumer-overview-section";
import { ConsumerAddressesSection } from "@/components/profile/consumer/consumer-addresses-section";
import { ConsumerSavedProsSection } from "@/components/profile/consumer/consumer-saved-pros-section";
import { ConsumerReviewsGivenSection } from "@/components/profile/consumer/consumer-reviews-given-section";
import { ConsumerAddressModal } from "@/components/modals/consumer-address-modal";
import { NIGERIAN_LOCATION_PRESETS } from "./data";
import { useConsumerProfileService } from "./services/profileApi";

export function ConsumerProfileView() {
  const {
    profile,
    stats,
    defaultAddress,
    recentActivity,
    savedProfessionals,
    writtenReviews,
    activeTab,
    addressModalOpen,
    setAddressModalOpen,
    editingAddress,
    handleTabChange,
    handleEditProfile,
    handleEditPhoto,
    handlePostRequest,
    handleOpenAddAddress,
    handleOpenEditAddress,
    handleSaveAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
    handleRemoveSavedPro,
    handleEditWrittenReview,
    handleDeleteWrittenReview,
    handleViewPro,
    handleMessagePro,
    handleExplorePros,
    handleBrowseOrders,
    handleOpenWallet,
    handleOpenOrders,
    handleOpenRequests,
  } = useConsumerProfileService();

  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
      <div className="pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/home">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-foreground">
                My Profile
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <ConsumerProfileHeader
        profile={profile}
        stats={stats}
        onEditProfileClick={handleEditProfile}
        onEditPhotoClick={handleEditPhoto}
        onPostRequestClick={handlePostRequest}
        onStatTabJump={handleTabChange}
        onOpenWalletClick={handleOpenWallet}
        onOpenOrdersClick={handleOpenOrders}
        onOpenRequestsClick={handleOpenRequests}
      />

      <div className="space-y-8">
        <ConsumerProfileTabs
          activeTab={activeTab}
          addressesCount={profile.savedAddresses.length}
          savedProsCount={savedProfessionals.length}
          reviewsCount={writtenReviews.length}
          onTabChange={handleTabChange}
        />

        {activeTab === "overview" && (
          <ConsumerOverviewSection
            profile={profile}
            defaultAddress={defaultAddress}
            recentActivity={recentActivity}
            onManageAddresses={() => handleTabChange("addresses")}
            onAddAddress={handleOpenAddAddress}
            onEditProfile={handleEditProfile}
            onViewAllOrders={handleOpenOrders}
            onViewAllRequests={handleOpenRequests}
          />
        )}

        {activeTab === "addresses" && (
          <ConsumerAddressesSection
            addresses={profile.savedAddresses}
            onAddAddress={handleOpenAddAddress}
            onEditAddress={handleOpenEditAddress}
            onDeleteAddress={handleDeleteAddress}
            onSetDefaultAddress={handleSetDefaultAddress}
          />
        )}

        {activeTab === "saved-pros" && (
          <ConsumerSavedProsSection
            professionals={savedProfessionals}
            onViewProfile={handleViewPro}
            onMessagePro={handleMessagePro}
            onRemoveSavedPro={handleRemoveSavedPro}
            onExplorePros={handleExplorePros}
          />
        )}

        {activeTab === "reviews" && (
          <ConsumerReviewsGivenSection
            reviews={writtenReviews}
            onViewProfessional={handleViewPro}
            onEditReview={handleEditWrittenReview}
            onDeleteReview={handleDeleteWrittenReview}
            onBrowseOrders={handleBrowseOrders}
          />
        )}
      </div>

      <ConsumerAddressModal
        isOpen={addressModalOpen}
        editingAddress={editingAddress}
        areaPresets={NIGERIAN_LOCATION_PRESETS}
        onClose={() => setAddressModalOpen(false)}
        onSaveAddress={handleSaveAddress}
      />
    </main>
  );
}
