import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { ConsumerSearchView } from "@/features/consumer/search/consumer-search-view";
import { CategorySearchPageSkeleton } from "@/skeletons/(internal-routes)/category/[id]/page-skeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return PAGE_METADATA_GENERATORS.categorySearch(id);
}

export default async function CategorySearchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<CategorySearchPageSkeleton />}>
      <ConsumerSearchView initialCategory={id} />
    </Suspense>
  );
}
