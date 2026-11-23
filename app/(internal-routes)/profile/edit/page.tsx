import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA } from "@/config/metadata";
import { EditProfileView } from "@/features/profile/edit-profile-view";
import { EditProfilePageSkeleton } from "@/skeletons/(internal-routes)/profile/edit/page-skeleton";

export const metadata: Metadata = PAGE_METADATA.profileEdit;

export default function EditProfilePage() {
  return (
    <Suspense fallback={<EditProfilePageSkeleton />}>
      <EditProfileView />
    </Suspense>
  );
}
