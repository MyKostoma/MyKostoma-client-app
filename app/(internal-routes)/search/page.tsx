import { Suspense } from "react";
import { ConsumerSearchView } from "@/features/consumer/search/consumer-search-view";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ConsumerSearchView />
    </Suspense>
  );
}
