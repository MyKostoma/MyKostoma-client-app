import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { ConsumerSearchView } from "@/features/consumer/search/consumer-search-view";

export const metadata: Metadata = PAGE_METADATA.search;

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ConsumerSearchView />
    </Suspense>
  );
}
