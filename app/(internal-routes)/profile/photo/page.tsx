import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { ProfilePhotoView } from "@/features/profile/profile-photo-view";
import { ProfilePhotoPageSkeleton } from "@/skeletons/(internal-routes)/profile/photo/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.profilePhoto;

export default function ProfilePhotoPage() {
  return (
    <Suspense fallback={<ProfilePhotoPageSkeleton />}>
      <ProfilePhotoView />
    </Suspense>
  );
}
