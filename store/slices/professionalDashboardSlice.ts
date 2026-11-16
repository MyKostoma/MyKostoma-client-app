import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type { ProfessionalDashboardData } from "@/features/professional-dashboard/types";
import { DEFAULT_PROFESSIONAL_DASHBOARD } from "@/features/professional-dashboard/data";

export interface ProfessionalDashboardState {
  data: ProfessionalDashboardData;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProfessionalDashboardState = {
  data: DEFAULT_PROFESSIONAL_DASHBOARD,
  status: "idle",
  error: null,
};

export const professionalDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfessionalDashboard: builder.query<ProfessionalDashboardData, void>({
      query: () => ({
        url: "/dashboard/professional",
        method: "GET",
      }),
      providesTags: ["Order", "Request", "Quotation", "Wallet"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfessionalDashboardQuery } = professionalDashboardApi;

export const professionalDashboardSlice = createSlice({
  name: "professionalDashboard",
  initialState,
  reducers: {
    setProfessionalDashboardData: (
      state,
      action: PayloadAction<ProfessionalDashboardData>
    ) => {
      state.data = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    setProfessionalDashboardStatus: (
      state,
      action: PayloadAction<{
        status: "idle" | "loading" | "succeeded" | "failed";
        error?: string | null;
      }>
    ) => {
      state.status = action.payload.status;
      state.error = action.payload.error ?? null;
    },
  },
});

export const {
  setProfessionalDashboardData,
  setProfessionalDashboardStatus,
} = professionalDashboardSlice.actions;

export const selectProfessionalDashboardData = (state: RootState) =>
  state.professionalDashboard.data;

export const selectProfessionalDashboardStatus = (state: RootState) =>
  state.professionalDashboard.status;

export const selectProfessionalDashboardError = (state: RootState) =>
  state.professionalDashboard.error;

export default professionalDashboardSlice.reducer;
