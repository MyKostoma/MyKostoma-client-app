"use client";

import { ChevronDown, MapPin, Clock, Star } from "lucide-react";
import { ConsumerHeroBanner } from "@/components/consumer-home/hero-banner";
import { SectionHeader } from "@/components/consumer-home/section-header";
import { ServiceCategoriesSection } from "@/components/consumer-home/service-categories-section";
import { TopRatedSpotlightSection } from "@/components/consumer-home/top-rated-spotlight-section";
import { ShopServiceGrid } from "@/components/shop/shop-service-grid";
import { ProShopHeaderBanner } from "@/components/shop/professional/pro-shop-header-banner";
import {
  ProShopAddServiceTile,
  ProShopServiceCard,
} from "@/components/shop/professional/pro-shop-service-card";
import { ProShopEmptyState } from "@/components/shop/professional/pro-shop-empty-state";
import { DeleteServiceCardModal } from "@/components/modals/delete-service-card-modal";
import { DashboardTopBarSlot } from "@/providers/dashboard-top-bar-context";
import { ProfessionalShopTopBar } from "@/components/layouts/top-bars/shop/professional-shop-top-bar";
import { SearchInput } from "@/components/ui/form-fields";
import { FallbackImage } from "@/components/ui/fallback-image";
import { useAppSelector } from "@/store/hooks";
import { selectUserRole } from "@/store/slices/authSlice";
import { selectActivePerspective } from "@/store/slices/uiSlice";
import type { ProShopStatusFilter } from "./types";
import { useProShopHomeService, useShopHomeService } from "./services/shopApi";

function ConsumerShopHomeView() {
  const {
    categoriesCount,
    mappedCategories,
    featuredServices,
    spotlightProviders,
    savedServiceIds,
    handleBrowsePros,
    handleBrowseAllCategories,
    handleOpenService,
    handleToggleSave,
  } = useShopHomeService();

  return (
    <main className="flex-1 container px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-12 sm:space-y-16 lg:space-y-24">
      <ConsumerHeroBanner onPrimaryClick={handleBrowsePros} />

      <ServiceCategoriesSection
        categories={mappedCategories}
        actionLabel={`View all ${categoriesCount} categories`}
        onActionClick={handleBrowseAllCategories}
      />

      <section className="w-full space-y-6">
        <SectionHeader
          title="Featured Shop Services"
          subtitle="Fixed-price services from top-rated professionals."
        />
        <ShopServiceGrid
          services={featuredServices}
          savedServiceIds={savedServiceIds}
          actionIcon="plus"
          columns={4}
          onOpen={handleOpenService}
          onToggleSave={handleToggleSave}
        />
      </section>

      <TopRatedSpotlightSection
        title="Top Rated in Nigeria"
        description="We've identified the absolute best service providers across Nigeria based on over 10,000 community reviews and background checks."
        providers={spotlightProviders}
      />
    </main>
  );
}

export function ProfessionalShopHomeView() {
  const {
    shopProfile,
    allServices,
    filteredServices,
    activeServicesCount,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    deletingService,
    setDeletingService,
    handleEditShop,
    handleCreateService,
    handleOpenService,
    handleEditService,
    handleConfirmDeleteService,
  } = useProShopHomeService();

  const isShopCompletelyEmpty = allServices.length === 0;

  return (
    <>
      <DashboardTopBarSlot>
        <ProfessionalShopTopBar
          title="My Shop"
          subtitleBadge="SERVICE MANAGEMENT"
          notificationCount={isShopCompletelyEmpty ? 0 : 3}
        />
      </DashboardTopBarSlot>

      {isShopCompletelyEmpty ? (
        <ProShopEmptyState onCreateService={handleCreateService} />
      ) : (
        <div className="space-y-6">
          <ProShopHeaderBanner
            profile={shopProfile}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onEditShop={handleEditShop}
            onAddNew={handleCreateService}
          />

          {activeTab === "services" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-full sm:w-64">
                    <SearchInput
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter services..."
                      className="h-9 text-xs bg-card"
                    />
                  </div>

                  <div className="relative">
                    <select
                      aria-label="Filter by status"
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(e.target.value as ProShopStatusFilter)
                      }
                      className="h-9 pl-3.5 pr-8 rounded-lg border border-border bg-card text-xs font-medium text-foreground appearance-none outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="draft">Draft</option>
                    </select>
                    <ChevronDown className="size-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Showing{" "}
                  <strong className="font-bold text-foreground">
                    {activeServicesCount}
                  </strong>{" "}
                  active services
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredServices.map((service) => (
                  <ProShopServiceCard
                    key={service.id}
                    service={service}
                    onOpen={handleOpenService}
                    onEdit={handleEditService}
                    onDelete={setDeletingService}
                  />
                ))}

                <ProShopAddServiceTile onClick={handleCreateService} />
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="rounded-2xl border border-border bg-card p-10 text-center space-y-2">
              <h3 className="text-sm font-bold text-foreground">
                No digital or physical products listed yet
              </h3>
              <p className="text-xs text-muted-foreground">
                Add fixed-price service packages or templates from the Services
                tab to start accepting direct orders.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allServices
                .filter((s) => s.latestReview)
                .map((s) => (
                  <div
                    key={s.id}
                    className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <FallbackImage
                          src={s.latestReview?.reviewerAvatarUrl}
                          alt={s.latestReview?.reviewerName || "Client"}
                          variant="avatar"
                          className="size-8 text-xs"
                        />
                        <div>
                          <p className="text-xs font-bold text-foreground">
                            {s.latestReview?.reviewerName}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {s.title}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground">
                        <Star className="size-3.5 text-warning fill-warning" />
                        <span>{s.latestReview?.rating.toFixed(1)}</span>
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                      &ldquo;{s.latestReview?.comment}&rdquo;
                    </p>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "about" && (
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xs space-y-5">
              <h2 className="text-base font-extrabold text-foreground">
                About {shopProfile.shopName}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {shopProfile.aboutBio}
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <MapPin className="size-4 text-primary" />
                  <span>{shopProfile.location}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <Clock className="size-4 text-primary" />
                  <span>Avg. Response: {shopProfile.responseTime}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <DeleteServiceCardModal
        isOpen={Boolean(deletingService)}
        serviceTitle={deletingService?.title || ""}
        onClose={() => setDeletingService(null)}
        onConfirmDelete={handleConfirmDeleteService}
      />
    </>
  );
}

export function ShopHomeView() {
  const userRole = useAppSelector(selectUserRole);
  const activePerspective = useAppSelector(selectActivePerspective);
  const effectiveRole = userRole || activePerspective || "consumer";

  if (effectiveRole === "professional") {
    return <ProfessionalShopHomeView />;
  }

  return <ConsumerShopHomeView />;
}


