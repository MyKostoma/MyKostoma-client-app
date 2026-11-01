import { ProfileView } from "@/features/profile";
import {
  getProfessionalProfileById,
  DEFAULT_PROFESSIONAL_PROFILE,
} from "@/features/profile/data";

export interface ProfilePageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const profile = resolvedParams.id
    ? getProfessionalProfileById(resolvedParams.id)
    : DEFAULT_PROFESSIONAL_PROFILE;

  return <ProfileView profile={profile} />;
}
