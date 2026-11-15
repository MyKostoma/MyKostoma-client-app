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
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
    const res = await handleRegister({
      ...details,
      role,
      category: chosenCategory,
    });
    if (!res.ok) {
      setError(res.message);
    }
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
        onChange={(next) => {
          setCategory(next);
          if (error) setError(null);
        }}
        onSubmit={() => finish(category)}
        onBack={() => {
          setError(null);
          setStep("details");
        }}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <RegisterDetailsForm
      role={role}
      values={details}
      onChange={(next) => {
        setDetails(next);
        if (error) setError(null);
      }}
      loading={loading}
      error={error}
      onBack={() => {
        setError(null);
        handleClearRegistrationRole();
        setStep("role");
      }}
      onSubmit={() => {
        setError(null);
        if (role === "professional") {
          setStep("category");
        } else {
          void finish(null);
        }
      }}
    />
  );
}
