import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type {
  CreateDirectOrderPayload,
  ProShopMainTab,
  ProShopProfile,
  ProShopServiceFormValues,
  ProShopServiceItem,
  ProShopServiceStatus,
  ProShopStatusFilter,
  ShopOrderConfirmation,
  ShopServiceItem,
} from "@/components/shop/types";
import {
  DEFAULT_PRO_SHOP_PROFILE,
  DEFAULT_PRO_SHOP_SERVICES,
  DEFAULT_SAVED_SERVICE_IDS,
  DEFAULT_SHOP_SERVICES,
} from "@/features/shop/data";

export interface ShopState {
  services: ShopServiceItem[];
  savedServiceIds: string[];
  placedOrders: ShopOrderConfirmation[];
  proShopProfile: ProShopProfile;
  proServices: ProShopServiceItem[];
  proActiveTab: ProShopMainTab;
  proSearchQuery: string;
  proStatusFilter: ProShopStatusFilter;
}

const initialState: ShopState = {
  services: DEFAULT_SHOP_SERVICES,
  savedServiceIds: DEFAULT_SAVED_SERVICE_IDS,
  placedOrders: [],
  proShopProfile: DEFAULT_PRO_SHOP_PROFILE,
  proServices: DEFAULT_PRO_SHOP_SERVICES,
  proActiveTab: "services",
  proSearchQuery: "",
  proStatusFilter: "all",
};

export const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShopServices: builder.query<
      ShopServiceItem[],
      { category?: string; search?: string } | void
    >({
      query: (params) => ({
        url: "/shop/services",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Shop"],
    }),
    getShopServiceById: builder.query<ShopServiceItem, string>({
      query: (id) => ({
        url: `/shop/services/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Service", id }],
    }),
    toggleSavedShopService: builder.mutation<
      { id: string; saved: boolean },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/shop/services/${id}/save`,
        method: "POST",
      }),
      invalidatesTags: ["Shop"],
    }),
    createDirectOrder: builder.mutation<
      ShopOrderConfirmation,
      CreateDirectOrderPayload
    >({
      query: (payload) => ({
        url: "/shop/direct-orders",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Shop", "Orders"],
    }),
    getProShopServices: builder.query<
      ProShopServiceItem[],
      { search?: string; status?: ProShopStatusFilter } | void
    >({
      query: (params) => ({
        url: "/professional/shop/services",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Shop"],
    }),
    createProShopService: builder.mutation<
      ProShopServiceItem,
      { values: ProShopServiceFormValues; status: ProShopServiceStatus }
    >({
      query: ({ values, status }) => ({
        url: "/professional/shop/services",
        method: "POST",
        body: { ...values, status },
      }),
      invalidatesTags: ["Shop"],
    }),
    updateProShopService: builder.mutation<
      ProShopServiceItem,
      { id: string; values: ProShopServiceFormValues; status?: ProShopServiceStatus }
    >({
      query: ({ id, values, status }) => ({
        url: `/professional/shop/services/${id}`,
        method: "PUT",
        body: { ...values, status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Shop",
        { type: "Service", id },
      ],
    }),
    toggleProShopServicePublish: builder.mutation<
      { id: string; status: ProShopServiceStatus },
      { id: string; status: ProShopServiceStatus }
    >({
      query: ({ id, status }) => ({
        url: `/professional/shop/services/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Shop",
        { type: "Service", id },
      ],
    }),
    deleteProShopService: builder.mutation<{ success: boolean }, { id: string }>(
      {
        query: ({ id }) => ({
          url: `/professional/shop/services/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Shop"],
      }
    ),
  }),
  overrideExisting: false,
});

export const {
  useGetShopServicesQuery,
  useGetShopServiceByIdQuery,
  useToggleSavedShopServiceMutation,
  useCreateDirectOrderMutation,
  useGetProShopServicesQuery,
  useCreateProShopServiceMutation,
  useUpdateProShopServiceMutation,
  useToggleProShopServicePublishMutation,
  useDeleteProShopServiceMutation,
} = shopApi;

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    toggleSavedServiceLocal: (state, action: PayloadAction<string>) => {
      state.savedServiceIds = state.savedServiceIds.includes(action.payload)
        ? state.savedServiceIds.filter((id) => id !== action.payload)
        : [...state.savedServiceIds, action.payload];
    },
    placeDirectOrderLocal: (
      state,
      action: PayloadAction<ShopOrderConfirmation>
    ) => {
      state.placedOrders = [
        action.payload,
        ...state.placedOrders.filter(
          (order) => order.orderCode !== action.payload.orderCode
        ),
      ];
    },
    setProShopActiveTab: (state, action: PayloadAction<ProShopMainTab>) => {
      state.proActiveTab = action.payload;
    },
    setProShopSearchQuery: (state, action: PayloadAction<string>) => {
      state.proSearchQuery = action.payload;
    },
    setProShopStatusFilter: (
      state,
      action: PayloadAction<ProShopStatusFilter>
    ) => {
      state.proStatusFilter = action.payload;
    },
    addProShopServiceLocal: (
      state,
      action: PayloadAction<ProShopServiceItem>
    ) => {
      state.proServices = [action.payload, ...state.proServices];
    },
    updateProShopServiceLocal: (
      state,
      action: PayloadAction<ProShopServiceItem>
    ) => {
      const idx = state.proServices.findIndex(
        (s) => s.id === action.payload.id
      );
      if (idx >= 0) {
        state.proServices[idx] = action.payload;
      } else {
        state.proServices.unshift(action.payload);
      }
    },
    toggleProShopServiceStatusLocal: (state, action: PayloadAction<string>) => {
      const svc = state.proServices.find((s) => s.id === action.payload);
      if (svc) {
        svc.status = svc.status === "active" ? "inactive" : "active";
      }
    },
    deleteProShopServiceLocal: (state, action: PayloadAction<string>) => {
      state.proServices = state.proServices.filter(
        (s) => s.id !== action.payload
      );
    },
  },
});

export const {
  toggleSavedServiceLocal,
  placeDirectOrderLocal,
  setProShopActiveTab,
  setProShopSearchQuery,
  setProShopStatusFilter,
  addProShopServiceLocal,
  updateProShopServiceLocal,
  toggleProShopServiceStatusLocal,
  deleteProShopServiceLocal,
} = shopSlice.actions;

export const selectShopServices = (state: RootState) => state.shop.services;
export const selectSavedServiceIds = (state: RootState) =>
  state.shop.savedServiceIds;
export const selectPlacedShopOrders = (state: RootState) =>
  state.shop.placedOrders;
export const selectProShopProfile = (state: RootState) =>
  state.shop.proShopProfile;
export const selectProShopServices = (state: RootState) =>
  state.shop.proServices;
export const selectProShopActiveTab = (state: RootState) =>
  state.shop.proActiveTab;
export const selectProShopSearchQuery = (state: RootState) =>
  state.shop.proSearchQuery;
export const selectProShopStatusFilter = (state: RootState) =>
  state.shop.proStatusFilter;

export default shopSlice.reducer;

