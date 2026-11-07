import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { ConsumerSearchView } from "@/features/consumer/search/consumer-search-view";

export const metadata: Metadata = PAGE_METADATA.categorySearchDefault;

export default async function CategorySearchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ConsumerSearchView initialCategory={id} />
    </Suspense>
  );
}
