"use client";

import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/slices/authSlice";
import {
  selectProfessionalDashboardData,
  useGetProfessionalDashboardQuery,
} from "@/store/slices/professionalDashboardSlice";
import { DEFAULT_PROFESSIONAL_DASHBOARD } from "../data";
import type { ProfessionalDashboardData } from "../types";

export function useProfessionalDashboardService(
  initialData?: ProfessionalDashboardData
) {
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const storeData = useAppSelector(selectProfessionalDashboardData);

  const {
    data: apiData,
    isLoading: isQueryLoading,
    isError: isQueryError,
    refetch,
  } = useGetProfessionalDashboardQuery(undefined, {
    skip: false,
  });

  const dashboardData = useMemo<ProfessionalDashboardData>(() => {
    const base =
      initialData ?? apiData ?? storeData ?? DEFAULT_PROFESSIONAL_DASHBOARD;

    const resolvedFirstName =
      user?.firstName ||
      user?.fullName?.split(" ")[0] ||
      base.firstName;
    const resolvedFullName =
      user?.fullName ||
      (user?.firstName
        ? `${user.firstName} ${user.lastName ?? ""}`.trim()
        : base.fullName);

    return {
      ...base,
      firstName: resolvedFirstName,
      fullName: resolvedFullName,
      avatarUrl: user?.avatarUrl ?? base.avatarUrl,
      isVerified: user?.verified ?? base.isVerified,
    };
  }, [initialData, apiData, storeData, user]);

  const handleNewProduct = useCallback(() => {
    router.push("/shop");
  }, [router]);

  const handleCreateQuote = useCallback(() => {
    router.push("/quotations");
  }, [router]);

  const handleWithdrawFunds = useCallback(() => {
    router.push("/wallet");
  }, [router]);

  return {
    data: dashboardData,
    isLoading: isQueryLoading && !initialData && !storeData,
    isError: isQueryError && !initialData && !storeData,
    refetch,
    handleNewProduct,
    handleCreateQuote,
    handleWithdrawFunds,
  };
}
