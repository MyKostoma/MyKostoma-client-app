import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { ConsumerSearchView } from "@/features/consumer/search/consumer-search-view";
import { CategorySearchPageSkeleton } from "@/skeletons/(internal-routes)/category/[id]/page-skeleton";
import { DEFAULT_CONSUMER_CATEGORIES } from "@/features/consumer/home/data";

export function generateStaticParams() {
  return DEFAULT_CONSUMER_CATEGORIES.map((cat) => ({
    id: cat.id,
  }));
}

export const metadata: Metadata = {
  title: "Category Search",
  description:
    "Browse verified local service professionals and explore services by category on MyKostoma.",
};

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
