"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterDetailsForm } from "./register-details-form";
import { RoleSelectStep } from "./role-select-step";
import { CategoryStep } from "./category-step";
import { useAuthService } from "@/features/auth/services/authApi";
import type { RegisterDetails, Role } from "./types";

type Step = "role" | "details" | "category";

export function RegisterFlow() {
  const router = useRouter();
  const {
    loading,
    storedRegistrationRole,
    handleRegister,
    handleSelectRegistrationRole,
    handleClearRegistrationRole,
  } = useAuthService();

  const initialRole: Role =
    storedRegistrationRole === "professional" ? "professional" : "consumer";

  const [step, setStep] = useState<Step>(
    storedRegistrationRole ? "details" : "role"
  );
  const [role, setRole] = useState<Role>(initialRole);
  const [category, setCategory] = useState<string | null>(null);
  const [details, setDetails] = useState<RegisterDetails>({
    fullName: "",
    identifier: "",
    password: "",
  });

  const handleRoleChange = (nextRole: Role) => {
    setRole(nextRole);
    handleSelectRegistrationRole(nextRole);
  };

  const finish = async (chosenCategory: string | null) => {
    await handleRegister({ ...details, role, category: chosenCategory });
  };

  if (step === "role") {
    return (
      <RoleSelectStep
        role={role}
        onRoleChange={handleRoleChange}
        onSubmit={() => {
          handleSelectRegistrationRole(role);
          setStep("details");
        }}
        onBack={() => {
          handleClearRegistrationRole();
          router.back();
        }}
      />
    );
  }

  if (step === "category") {
    return (
      <CategoryStep
        value={category}
        onChange={setCategory}
        onSubmit={() => finish(category)}
        onBack={() => setStep("details")}
        loading={loading}
      />
    );
  }

  return (
    <RegisterDetailsForm
      role={role}
      values={details}
      onChange={setDetails}
      loading={loading}
      onBack={() => {
        handleClearRegistrationRole();
        setStep("role");
      }}
      onSubmit={() =>
        role === "professional" ? setStep("category") : finish(null)
      }
    />
  );
}
