import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { ShopHomeView } from "@/features/shop/shop-home-view";
import { ShopHomePageSkeleton } from "@/skeletons/(internal-routes)/shop/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.shopHome;

export default function ShopHomePage() {
  return (
    <Suspense fallback={<ShopHomePageSkeleton />}>
      <ShopHomeView />
    </Suspense>
  );
}

