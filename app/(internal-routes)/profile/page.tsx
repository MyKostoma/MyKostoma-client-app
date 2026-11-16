import type { Metadata } from "next";
import { Suspense } from "react";
import { ProfileView } from "@/features/profile/profile-view";
import { DEFAULT_PROFESSIONAL_PROFILE } from "@/features/profile/data";
import { ProfilePageSkeleton } from "@/skeletons/(internal-routes)/profile/page-skeleton";

export const metadata: Metadata = {
  title: "Professional Profile",
  description:
    "View professional credentials, project history, and customer reviews on MyKostoma.",
};

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfilePageSkeleton />}>
      <ProfileView profile={DEFAULT_PROFESSIONAL_PROFILE} />
    </Suspense>
  );
}
