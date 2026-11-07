import type { Metadata } from "next";
import { PAGE_METADATA_GENERATORS, PAGE_METADATA } from "@/config/metadata";
import { ProfileView } from "@/features/profile/profile-view";
import {
  getProfessionalProfileById,
  DEFAULT_PROFESSIONAL_PROFILE,
} from "@/features/profile/data";

export interface ProfilePageProps {
  searchParams?: Promise<{ id?: string }>;
}

export const metadata: Metadata = PAGE_METADATA.profileFallback;

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const profile = resolvedParams.id
    ? getProfessionalProfileById(resolvedParams.id)
    : DEFAULT_PROFESSIONAL_PROFILE;

  return <ProfileView profile={profile} />;
}
