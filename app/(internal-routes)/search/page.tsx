import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { ConsumerSearchView } from "@/features/consumer/search/consumer-search-view";
import { SearchPageSkeleton } from "@/skeletons/(internal-routes)/search/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.search;

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <ConsumerSearchView />
    </Suspense>
  );
}
