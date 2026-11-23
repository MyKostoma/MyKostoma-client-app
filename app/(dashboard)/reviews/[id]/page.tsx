import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import {
  DEFAULT_GIVEN_REVIEWS,
  DEFAULT_RECEIVED_REVIEWS,
  getDefaultReviewById,
} from "@/features/reviews/data";
import { ReviewDetailView } from "@/features/reviews/review-detail-view";
import { ReviewDetailPageSkeleton } from "@/skeletons/(dashboard)/reviews/[id]/page-skeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const review = getDefaultReviewById(decodedId);

  return PAGE_METADATA_GENERATORS.reviewDetail(
    review?.authorName,
    review?.orderCode
  );
}

export function generateStaticParams() {
  return [...DEFAULT_RECEIVED_REVIEWS, ...DEFAULT_GIVEN_REVIEWS].map(
    (review) => ({
      id: review.id,
    })
  );
}

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<ReviewDetailPageSkeleton />}>
      <ReviewDetailView reviewId={decodeURIComponent(id)} />
    </Suspense>
  );
}
