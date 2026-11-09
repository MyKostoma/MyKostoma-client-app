import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { DEFAULT_SHOP_SERVICES } from "@/features/shop/data";
import { findShopServiceById } from "@/features/shop/services/shopHelpers";
import { ShopServiceDetailView } from "@/features/shop/shop-service-detail-view";
import { ShopServiceDetailPageSkeleton } from "@/skeletons/(internal-routes)/shop/service/[id]/page-skeleton";

interface ShopServiceDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ShopServiceDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const service = findShopServiceById(DEFAULT_SHOP_SERVICES, id);
  return PAGE_METADATA_GENERATORS.shopServiceDetail(
    service?.title,
    service?.provider.name,
    service?.summary[0]
  );
}

export default async function ShopServiceDetailPage({
  params,
}: ShopServiceDetailPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<ShopServiceDetailPageSkeleton />}>
      <ShopServiceDetailView serviceId={id} />
    </Suspense>
  );
}
