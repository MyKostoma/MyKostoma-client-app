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

export function generateStaticParams() {
  return DEFAULT_SHOP_SERVICES.map((s) => ({
    id: s.id,
  }));
}

export const metadata: Metadata = {
  title: "Service Details",
  description:
    "View service deliverables, pricing breakdown, inclusions, and verified provider details on MyKostoma.",
};

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
