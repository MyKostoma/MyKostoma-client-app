import type { Metadata } from "next";
import { Suspense } from "react";
import { PAGE_METADATA_GENERATORS, PAGE_METADATA } from "@/config/metadata";
import { ProfileView } from "@/features/profile/profile-view";
import {
  getProfessionalProfileById,
  DEFAULT_PROFESSIONAL_PROFILE,
} from "@/features/profile/data";
import { ProfilePageSkeleton } from "@/skeletons/(internal-routes)/profile/page-skeleton";

export interface ProfilePageProps {
  searchParams?: Promise<{ id?: string }>;
}

export async function generateMetadata({
  searchParams,
}: ProfilePageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : {};
  const profile = resolvedParams.id
    ? getProfessionalProfileById(resolvedParams.id)
    : DEFAULT_PROFESSIONAL_PROFILE;

  if (!profile) {
    return PAGE_METADATA.profileFallback;
  }

  return PAGE_METADATA_GENERATORS.profileDetail(
    profile.name,
    profile.roleTitle,
    profile.bio
  );
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const profile = resolvedParams.id
    ? getProfessionalProfileById(resolvedParams.id)
    : DEFAULT_PROFESSIONAL_PROFILE;

  return (
    <Suspense fallback={<ProfilePageSkeleton />}>
      <ProfileView profile={profile} />
    </Suspense>
  );
}
