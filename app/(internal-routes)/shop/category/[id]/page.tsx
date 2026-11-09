import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { findShopCategoryById } from "@/features/shop/services/shopHelpers";
import { ShopCategoryView } from "@/features/shop/shop-category-view";
import { ShopCategoryPageSkeleton } from "@/skeletons/(internal-routes)/shop/category/[id]/page-skeleton";

interface ShopCategoryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ShopCategoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const category = findShopCategoryById(id);
  return PAGE_METADATA_GENERATORS.shopCategory(
    category.name,
    category.description
  );
}

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
