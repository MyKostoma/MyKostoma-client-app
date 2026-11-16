import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { LandingView } from "@/components/landing/landing-view";
import { LandingPageSkeleton } from "@/skeletons/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.landing;

export default function Home() {
  return (
    <Suspense fallback={<LandingPageSkeleton />}>
      <LandingView />
    </Suspense>
  );
}
