"use client";

import { ShopBreadcrumb } from "@/components/shop/shop-breadcrumb";
import { ShopOrderPanel } from "@/components/shop/shop-order-panel";
import { ShopProfessionalAbout } from "@/components/shop/shop-professional-about";
import { ShopProviderStrip } from "@/components/shop/shop-provider-strip";
import { ShopServiceAbout } from "@/components/shop/shop-service-about";
import { ShopServiceGallery } from "@/components/shop/shop-service-gallery";
import { ShopTrustCards } from "@/components/shop/shop-trust-cards";
import { SHOP_TRUST_HIGHLIGHTS } from "./data";
import { useShopServiceDetailService } from "./services/shopApi";
import { buildShopCategoryHref } from "./services/shopHelpers";
import type { ShopServiceDetailViewProps } from "./types";

export function ShopServiceDetailView({ serviceId }: ShopServiceDetailViewProps) {
  const {
    service,
    category,
    subCategory,
    activeImageIndex,
    setActiveImageIndex,
    handleNavigate,
    handleDirectOrder,
    handleViewProfile,
    handleContactProvider,
  } = useShopServiceDetailService(serviceId);

  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6">
      <ShopBreadcrumb
        onNavigate={handleNavigate}
        items={[
          { label: "Home", href: "/home" },
          { label: "Shop", href: "/shop" },
          { label: category.name, href: buildShopCategoryHref(category.id) },
          { label: service.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        <div className="lg:col-span-8 space-y-6 sm:space-y-8 min-w-0">
          <header className="space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-foreground text-[10px] font-bold uppercase tracking-wider">
              {category.name}
              {subCategory ? ` › ${subCategory.label}` : ""}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight">
              {service.title}
            </h1>
          </header>

          <ShopOrderPanel
            service={service}
            variant="inline"
            onDirectOrder={handleDirectOrder}
            className="lg:hidden"
          />

          <ShopServiceGallery
            images={service.gallery}
            title={service.title}
            activeIndex={activeImageIndex}
            onSelect={setActiveImageIndex}
          />

          <ShopProviderStrip
            provider={service.provider}
            onViewProfile={handleViewProfile}
          />

          <ShopServiceAbout
            paragraphs={service.summary}
            deliverables={service.deliverables}
          />

          <ShopTrustCards items={SHOP_TRUST_HIGHLIGHTS} />
        </div>

        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
          <ShopOrderPanel
            service={service}
            onDirectOrder={handleDirectOrder}
            className="hidden lg:block"
          />
          <ShopProfessionalAbout
            provider={service.provider}
            onContact={handleContactProvider}
          />
        </aside>
      </div>
    </main>
  );
}

