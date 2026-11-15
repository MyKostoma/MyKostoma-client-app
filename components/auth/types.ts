import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { RegisterDetails, Role } from "@/features/auth/types";

export type { RegisterDetails, Role };

export interface AuthCardProps {
  title: string;
  subtitle?: ReactNode;
  header?: ReactNode;
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
}

export interface AuthAltActionProps {
  text: string;
  linkText: string;
  href: string;
}

export interface AuthSuccessProps {
  destinationLabel: string;
  roleLabel: string;
  href?: string;
  redirectAfter?: number;
  className?: string;
}

export interface CategoryStepProps {
  value: string | null;
  onChange: (id: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  backLabel?: string;
  stepLabel?: string;
  loading?: boolean;
  error?: string | null;
}

export interface RegisterDetailsFormProps {
  role: Role;
  values: RegisterDetails;
  onChange: (values: RegisterDetails) => void;
  onSubmit: () => void;
  onBack?: () => void;
  loading?: boolean;
  error?: string | null;
}

export interface RoleSelectStepProps {
  role: Role;
  onRoleChange: (role: Role) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export interface SelectableCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  selected?: boolean;
  layout?: "row" | "stack";
  onSelect?: () => void;
}
