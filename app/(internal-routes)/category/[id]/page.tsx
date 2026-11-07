import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import { ConsumerSearchView } from "@/features/consumer/search/consumer-search-view";

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
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ConsumerSearchView initialCategory={id} />
    </Suspense>
  );
}
