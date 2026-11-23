import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS } from "@/config/metadata";
import {
  DEFAULT_MY_REELS,
  getDefaultManagedReelById,
} from "@/features/reels/data";
import { ManageReelView } from "@/features/reels/manage-reel-view";
import { ManageReelPageSkeleton } from "@/skeletons/(dashboard)/reels/manage/[id]/page-skeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const reel = getDefaultManagedReelById(decodedId);

  return PAGE_METADATA_GENERATORS.manageReel(reel?.title);
}

export function generateStaticParams() {
  return DEFAULT_MY_REELS.map((reel) => ({
    id: reel.id,
  }));
}

export default async function ManageReelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<ManageReelPageSkeleton />}>
      <ManageReelView reelId={decodeURIComponent(id)} />
    </Suspense>
  );
}
