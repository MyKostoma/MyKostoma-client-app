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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearRegistrationRole,
  selectRegistrationRole,
  setPendingVerification,
  setRegistrationRole,
} from "@/store/slices/authSlice";
import { setActivePerspective } from "@/store/slices/uiSlice";

type Step = "role" | "details" | "category";

export function RegisterFlow() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storedRole = useAppSelector(selectRegistrationRole);

  const [step, setStep] = useState<Step>(storedRole ? "details" : "role");
  const [role, setRole] = useState<Role>(storedRole ?? "consumer");
  const [category, setCategory] = useState<string | null>(null);
  const [details, setDetails] = useState<RegisterDetails>({
    fullName: "",
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (nextRole: Role) => {
    setRole(nextRole);
    dispatch(setRegistrationRole(nextRole));
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
      dispatch(clearRegistrationRole());
      dispatch(setActivePerspective(role));
      router.push("/verify-account");
    }
  };

  if (step === "role") {
    return (
      <RoleSelectStep
        role={role}
        onRoleChange={handleRoleChange}
        onSubmit={() => {
          dispatch(setRegistrationRole(role));
          dispatch(setActivePerspective(role));
          setStep("details");
        }}
        onBack={() => {
          dispatch(clearRegistrationRole());
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
        dispatch(clearRegistrationRole());
        setStep("role");
      }}
      onSubmit={() => (role === "professional" ? setStep("category") : finish(null))}
    />
  );
}
