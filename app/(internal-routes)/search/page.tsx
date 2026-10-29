import { Suspense } from "react";
import { ConsumerSearchView } from "@/features/consumer/search";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ConsumerSearchView />
    </Suspense>
  );
}
