"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockRegister } from "./mock-handlers";
import {
  RegisterDetailsForm,
  type RegisterDetails,
  type Role,
} from "./register-details-form";
import { RoleSelectStep } from "./role-select-step";
import { CategoryStep } from "./category-step";
import { useAppDispatch } from "@/store/hooks";
import { setPendingVerification } from "@/store/slices/authSlice";
import { setActivePerspective } from "@/store/slices/uiSlice";

type Step = "role" | "details" | "category";

export interface RegisterFlowProps {
  presetRole?: Role;
}

export function RegisterFlow({ presetRole }: RegisterFlowProps = {}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<Step>(presetRole ? "details" : "role");
  const [role, setRole] = useState<Role>(presetRole ?? "consumer");
  const [category, setCategory] = useState<string | null>(null);
  const [details, setDetails] = useState<RegisterDetails>({
    fullName: "",
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (presetRole) {
      setRole(presetRole);
      setStep("details");
      dispatch(setActivePerspective(presetRole));
    }
  }, [presetRole, dispatch]);

  const handleRoleChange = (nextRole: Role) => {
    setRole(nextRole);
    dispatch(setActivePerspective(nextRole));
  };

  const finish = async (chosenCategory: string | null) => {
    setLoading(true);
    const res = await mockRegister({ ...details, role, category: chosenCategory });
    setLoading(false);
    if (res.ok) {
      dispatch(
        setPendingVerification({
          identifier: details.identifier,
          role,
          fullName: details.fullName,
          category: chosenCategory,
          flow: "register",
        })
      );
      dispatch(setActivePerspective(role));
      router.push("/verify-account");
    }
  };

  if (step === "role") {
    return (
      <RoleSelectStep
        role={role}
        onRoleChange={handleRoleChange}
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
