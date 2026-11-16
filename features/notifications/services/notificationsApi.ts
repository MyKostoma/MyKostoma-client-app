"use client";

import { useMemo, useCallback } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectAllNotifications,
  selectNotificationsActiveTab,
  selectNotificationsStatus,
  selectNotificationsError,
  setNotificationsActiveTab,
  markNotificationAsReadLocal,
  markAllNotificationsAsReadLocal,
  archiveNotificationLocal,
  unarchiveNotificationLocal,
  setNotificationsStatus,
  restoreMockNotifications,
  useGetNotificationsQuery,
  useMarkNotificationAsReadEndpointMutation,
  useMarkAllNotificationsAsReadEndpointMutation,
  useArchiveNotificationEndpointMutation,
} from "@/store/slices/notificationsSlice";
import {
  filterNotifications,
  calculateNotificationCounts,
} from "./notificationsHelpers";
import { DEFAULT_NOTIFICATIONS } from "../data";
import type {
  NotificationFilterTab,
  NotificationItem,
} from "../types";

export function useNotificationsService(initialData?: NotificationItem[]) {
  const dispatch = useAppDispatch();

  const storeItems = useAppSelector(selectAllNotifications);
  const activeTab = useAppSelector(selectNotificationsActiveTab);
  const status = useAppSelector(selectNotificationsStatus);
  const error = useAppSelector(selectNotificationsError);

  const {
    data: apiItems,
    isLoading: isQueryLoading,
    isError: isQueryError,
    refetch,
  } = useGetNotificationsQuery(
    { tab: activeTab },
    {
      skip: false,
    }
  );

  const [markReadMutation] = useMarkNotificationAsReadEndpointMutation();
  const [markAllReadMutation] = useMarkAllNotificationsAsReadEndpointMutation();
  const [archiveMutation] = useArchiveNotificationEndpointMutation();

  const rawNotifications = useMemo(() => {
    return (
      initialData ??
      apiItems ??
      (storeItems && storeItems.length > 0
        ? storeItems
        : DEFAULT_NOTIFICATIONS)
    );
  }, [initialData, apiItems, storeItems]);

  const filteredNotifications = useMemo(() => {
    return filterNotifications(rawNotifications, activeTab);
  }, [rawNotifications, activeTab]);

  const counts = useMemo(() => {
    return calculateNotificationCounts(rawNotifications);
  }, [rawNotifications]);

  const handleSetActiveTab = useCallback(
    (tab: NotificationFilterTab) => {
      dispatch(setNotificationsActiveTab(tab));
    },
    [dispatch]
  );

  const handleMarkAsRead = useCallback(
    async (id: string) => {
      dispatch(markNotificationAsReadLocal(id));
      try {
        await markReadMutation({ id }).unwrap();
      } catch {
        // Optimistic UI state already updated locally
      }
    },
    [dispatch, markReadMutation]
  );

  const handleMarkAllAsRead = useCallback(async () => {
    dispatch(markAllNotificationsAsReadLocal());
    toast.success("All notifications marked as read");
    try {
      await markAllReadMutation().unwrap();
    } catch {
      // Optimistic UI state already updated locally
    }
  }, [dispatch, markAllReadMutation]);

  const handleArchive = useCallback(
    async (id: string) => {
      dispatch(archiveNotificationLocal(id));
      toast.success("Notification archived");
      try {
        await archiveMutation({ id }).unwrap();
      } catch {
        // Optimistic UI state already updated locally
      }
    },
    [dispatch, archiveMutation]
  );

  const handleUnarchive = useCallback(
    (id: string) => {
      dispatch(unarchiveNotificationLocal(id));
      toast.success("Notification moved to inbox");
    },
    [dispatch]
  );

  const handleRetry = useCallback(() => {
    dispatch(setNotificationsStatus({ status: "idle", error: null }));
    dispatch(restoreMockNotifications());
    try {
      refetch();
    } catch {}
  }, [dispatch, refetch]);

  const handleSimulateError = useCallback(() => {
    dispatch(
      setNotificationsStatus({
        status: "failed",
        error: "Failed to load notifications",
      })
    );
  }, [dispatch]);

  const handleRestoreDefault = useCallback(() => {
    dispatch(restoreMockNotifications());
    toast.info("Sample notifications restored");
  }, [dispatch]);

  // Only consider failed if status is explicitly "failed" or if an API error happened AND there is no fallback data
  const hasFallbackData = Boolean(
    (initialData && initialData.length > 0) ||
      (storeItems && storeItems.length > 0) ||
      DEFAULT_NOTIFICATIONS.length > 0
  );
  const isFailed = status === "failed" || (isQueryError && !hasFallbackData);
  const isLoading = status === "loading" || (isQueryLoading && !hasFallbackData);

  return {
    notifications: filteredNotifications,
    rawNotifications,
    activeTab,
    counts,
    status,
    error,
    isLoading,
    isFailed,
    setActiveTab: handleSetActiveTab,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    archiveNotification: handleArchive,
    unarchiveNotification: handleUnarchive,
    retry: handleRetry,
    simulateError: handleSimulateError,
    restoreDefault: handleRestoreDefault,
  };
}
