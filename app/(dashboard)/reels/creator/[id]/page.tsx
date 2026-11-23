import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import {
  DEFAULT_REEL_CREATORS,
  getDefaultCreatorById,
} from "@/features/reels/data";
import { CreatorReelsProfileView } from "@/features/reels/creator-reels-profile-view";
import { CreatorReelsProfilePageSkeleton } from "@/skeletons/(dashboard)/reels/creator/[id]/page-skeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const creator = getDefaultCreatorById(decodedId);

  return PAGE_METADATA_GENERATORS.creatorReelsProfile(
    creator?.name,
    creator?.roleTitle
  );
}

export function generateStaticParams() {
  return DEFAULT_REEL_CREATORS.map((creator) => ({
    id: creator.id,
  }));
}

export default async function CreatorReelsProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<CreatorReelsProfilePageSkeleton />}>
      <CreatorReelsProfileView creatorId={decodeURIComponent(id)} />
    </Suspense>
  );
}
