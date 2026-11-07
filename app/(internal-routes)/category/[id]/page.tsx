import { Suspense } from "react";
import { ConsumerSearchView } from "@/features/consumer/search/consumer-search-view";

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
