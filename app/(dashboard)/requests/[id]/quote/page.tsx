import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { SubmitQuoteView } from "@/features/requests/submit-quote-view";
import { RequestSubmitQuotePageSkeleton } from "@/skeletons/(dashboard)/requests/[id]/quote/page-skeleton";
import {
  DEFAULT_CONSUMER_REQUESTS,
  DEFAULT_PROFESSIONAL_REQUESTS,
} from "@/features/requests/data";

export const metadata: Metadata = PAGE_METADATA.requestQuoteDefault;

export function generateStaticParams() {
  return [...DEFAULT_CONSUMER_REQUESTS, ...DEFAULT_PROFESSIONAL_REQUESTS].map(
    (r) => ({
      id: r.id,
    })
  );
}

export default async function RequestSubmitQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<RequestSubmitQuotePageSkeleton />}>
      <SubmitQuoteView requestId={decodeURIComponent(id)} />
    </Suspense>
  );
}
