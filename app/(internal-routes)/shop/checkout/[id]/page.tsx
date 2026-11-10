import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { DEFAULT_SHOP_SERVICES } from "@/features/shop/data";
import { findShopServiceById } from "@/features/shop/services/shopHelpers";
import { ShopCheckoutView } from "@/features/shop/shop-checkout-view";
import { ShopCheckoutPageSkeleton } from "@/skeletons/(internal-routes)/shop/checkout/[id]/page-skeleton";

interface ShopCheckoutPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return DEFAULT_SHOP_SERVICES.map((s) => ({
    id: s.id,
  }));
}

export const metadata: Metadata = {
  title: "Checkout Service",
  description:
    "Confirm booking specifications, scheduling preferences, and complete secure escrow payment.",
};

export default async function ShopCheckoutPage({
  params,
}: ShopCheckoutPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<ShopCheckoutPageSkeleton />}>
      <ShopCheckoutView serviceId={id} />
    </Suspense>
  );
}
