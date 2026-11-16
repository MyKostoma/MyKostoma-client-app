import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";
import type { RootState } from "@/store";
import type {
  CreateDirectOrderPayload,
  ShopOrderConfirmation,
  ShopServiceItem,
} from "@/components/shop/types";
import {
  DEFAULT_SAVED_SERVICE_IDS,
  DEFAULT_SHOP_SERVICES,
} from "@/features/shop/data";

export interface ShopState {
  services: ShopServiceItem[];
  savedServiceIds: string[];
  placedOrders: ShopOrderConfirmation[];
}

const initialState: ShopState = {
  services: DEFAULT_SHOP_SERVICES,
  savedServiceIds: DEFAULT_SAVED_SERVICE_IDS,
  placedOrders: [],
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
  }),
  overrideExisting: false,
});

export const {
  useGetShopServicesQuery,
  useGetShopServiceByIdQuery,
  useToggleSavedShopServiceMutation,
  useCreateDirectOrderMutation,
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
  },
});

export const { toggleSavedServiceLocal, placeDirectOrderLocal } =
  shopSlice.actions;

export const selectShopServices = (state: RootState) => state.shop.services;
export const selectSavedServiceIds = (state: RootState) =>
  state.shop.savedServiceIds;
export const selectPlacedShopOrders = (state: RootState) =>
  state.shop.placedOrders;

export default shopSlice.reducer;

