"use client";

import { ShopBreadcrumb } from "@/components/shop/shop-breadcrumb";
import { ShopConsentList } from "@/components/shop/shop-consent-list";
import { ShopOrderSummaryCard } from "@/components/shop/shop-order-summary-card";
import { ShopPaymentSummaryCard } from "@/components/shop/shop-payment-summary-card";
import { ShopProviderStrip } from "@/components/shop/shop-provider-strip";
import { useShopCheckoutService } from "./services/shopApi";
import { buildShopServiceHref } from "./services/shopHelpers";
import type { ShopCheckoutViewProps } from "./types";

export function ShopCheckoutView({ serviceId }: ShopCheckoutViewProps) {
  const {
    service,
    summary,
    termsAccepted,
    setTermsAccepted,
    scopeAccepted,
    setScopeAccepted,
    canConfirm,
    isSubmitting,
    handleNavigate,
    handleConfirmOrder,
  } = useShopCheckoutService(serviceId);

  return (
    <main className="flex-1 container px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6">
      <ShopBreadcrumb
        onNavigate={handleNavigate}
        items={[
          { label: "Service Detail", href: buildShopServiceHref(service.id) },
          { label: "Direct Order Checkout" },
        ]}
      />

      <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
        Direct Order Confirmation
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        <div className="lg:col-span-7 space-y-5 min-w-0">
          <ShopOrderSummaryCard service={service} />

          <section className="space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-foreground tracking-tight px-1">
              Professional Information
            </h2>
            <ShopProviderStrip provider={service.provider} variant="compact" />
          </section>

          <ShopConsentList
            termsAccepted={termsAccepted}
            scopeAccepted={scopeAccepted}
            onTermsChange={setTermsAccepted}
            onScopeChange={setScopeAccepted}
          />
        </div>

        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
          <ShopPaymentSummaryCard
            summary={summary}
            canConfirm={canConfirm}
            isSubmitting={isSubmitting}
            onConfirm={handleConfirmOrder}
          />
        </div>
      </div>
    </main>
  );
}

