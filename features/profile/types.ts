import type { ProfessionalProfileData } from "@/components/profile/types";

export interface ProfileViewProps {
  profile?: ProfessionalProfileData;
  initialMessagingOpen?: boolean;
  initialFollowing?: boolean;
}
