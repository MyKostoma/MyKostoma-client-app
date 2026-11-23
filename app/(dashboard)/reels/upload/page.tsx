import { Suspense } from "react";
import type { Metadata } from "next";
import { PAGE_METADATA } from "@/config/metadata";
import { UploadReelView } from "@/features/reels/upload-reel-view";
import { UploadReelPageSkeleton } from "@/skeletons/(dashboard)/reels/upload/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.reelsUpload;

export default function UploadReelPage() {
  return (
    <Suspense fallback={<UploadReelPageSkeleton />}>
      <UploadReelView />
    </Suspense>
  );
}
