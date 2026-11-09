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

export async function generateMetadata({
  params,
}: ShopCheckoutPageProps): Promise<Metadata> {
  const { id } = await params;
  const service = findShopServiceById(DEFAULT_SHOP_SERVICES, id);
  return PAGE_METADATA_GENERATORS.shopCheckout(service?.title);
}

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
