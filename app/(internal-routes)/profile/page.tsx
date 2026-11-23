import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { ProfileView } from "@/features/profile/profile-view";
import { ProfilePageSkeleton } from "@/skeletons/(internal-routes)/profile/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.profileFallback;

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfilePageSkeleton />}>
      <ProfileView />
    </Suspense>
  );
}
