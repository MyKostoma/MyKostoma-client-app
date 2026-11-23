import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  type WebStorage,
} from "redux-persist"
import createWebStorage from "redux-persist/lib/storage/createWebStorage"

import { baseApi } from "./api/baseApi"
import authReducer from "./slices/authSlice"
import uiReducer from "./slices/uiSlice"
import discoverReducer from "./slices/discoverSlice"
import requestsReducer from "./slices/requestsSlice"
import quotationsReducer from "./slices/quotationsSlice"
import ordersReducer from "./slices/ordersSlice"
import shopReducer from "./slices/shopSlice"
import walletReducer from "./slices/walletSlice"
import verificationReducer from "./slices/verificationSlice"
import profileReducer from "./slices/profileSlice"
import notificationsReducer from "./slices/notificationsSlice"
import messagesReducer from "./slices/messagesSlice"
import professionalDashboardReducer from "./slices/professionalDashboardSlice"

const createNoopStorage = (): WebStorage => ({
  getItem() {
    return Promise.resolve(null)
  },
  setItem(_key: string, _value: string) {
    return Promise.resolve()
  },
  removeItem() {
    return Promise.resolve()
  },
})

const storage: WebStorage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage()

const authPersistConfig = {
  key: "mykostoma:auth",
  version: 1,
  storage,
  whitelist: ["user", "tokens", "isAuthenticated", "pendingVerification"],
}

const uiPersistConfig = {
  key: "mykostoma:ui",
  version: 1,
  storage,
  whitelist: ["theme", "sidebarCollapsed", "activePerspective"],
}

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  ui: persistReducer(uiPersistConfig, uiReducer),
  discover: discoverReducer,
  requests: requestsReducer,
  quotations: quotationsReducer,
  orders: ordersReducer,
  shop: shopReducer,
  wallet: walletReducer,
  verification: verificationReducer,
  profile: profileReducer,
  notifications: notificationsReducer,
  messages: messagesReducer,
  professionalDashboard: professionalDashboardReducer,
})

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          ignoredPaths: ["discover.featuredProfessionals", "discover.spotlightProviders"],
        },
      }).concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  })

export const store = makeStore()
export const persistor = persistStore(store)

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
