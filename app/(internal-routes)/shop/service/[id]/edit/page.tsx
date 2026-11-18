import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import {
  DEFAULT_PRO_SHOP_SERVICES,
  DEFAULT_SHOP_SERVICES,
} from "@/features/shop/data";
import { ProShopServiceFormView } from "@/features/shop/pro-shop-service-form-view";
import { ProShopEditServicePageSkeleton } from "@/skeletons/(internal-routes)/shop/service/[id]/edit/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.proShopEditService;

export function generateStaticParams() {
  return [...DEFAULT_SHOP_SERVICES, ...DEFAULT_PRO_SHOP_SERVICES].map((s) => ({
    id: s.id,
  }));
}

export default async function ProShopEditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<ProShopEditServicePageSkeleton />}>
      <ProShopServiceFormView serviceId={decodeURIComponent(id)} />
    </Suspense>
  );
}
