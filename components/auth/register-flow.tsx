"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockRegister } from "./mock-handlers";
import {
  RegisterDetailsForm,
  type RegisterDetails,
  type Role,
} from "./register-details-form";
import { RoleSelectStep } from "./role-select-step";
import { CategoryStep } from "./category-step";

type Step = "role" | "details" | "category";

export function RegisterFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role>("consumer");
  const [category, setCategory] = useState<string | null>(null);
  const [details, setDetails] = useState<RegisterDetails>({
    fullName: "",
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const finish = async (chosenCategory: string | null) => {
    setLoading(true);
    const res = await mockRegister({ ...details, role, category: chosenCategory });
    setLoading(false);
    if (res.ok) router.push("/verify-account");
  };

  if (step === "role") {
    return (
      <RoleSelectStep
        role={role}
        onRoleChange={setRole}
        onSubmit={() => setStep("details")}
        onBack={() => router.back()}
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
      onBack={() => setStep("role")}
      onSubmit={() => (role === "professional" ? setStep("category") : finish(null))}
    />
  );
}
