import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { findShopCategoryById } from "@/features/shop/services/shopHelpers";
import { SHOP_CATEGORIES } from "@/features/shop/data";
import { ShopCategoryView } from "@/features/shop/shop-category-view";
import { ShopCategoryPageSkeleton } from "@/skeletons/(internal-routes)/shop/category/[id]/page-skeleton";

interface ShopCategoryPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return SHOP_CATEGORIES.map((cat) => ({
    id: cat.id,
  }));
}

export const metadata: Metadata = {
  title: "Shop Category",
  description:
    "Browse fixed-price instant booking service packages by trade and category on MyKostoma.",
};

export default async function ShopCategoryPage({
  params,
}: ShopCategoryPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<ShopCategoryPageSkeleton />}>
      <ShopCategoryView categoryId={id} />
    </Suspense>
  );
}
