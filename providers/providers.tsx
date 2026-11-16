"use client";

import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/store/StoreProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTheme, setTheme } from "@/store/slices/uiSlice";
import { FeatureFlagsProvider, FlagState } from "./feature-flag-context";

function ThemeSync() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light" || saved === "system") {
        dispatch(setTheme(saved));
      }
    } catch {}
  }, [dispatch]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (prefersDark: boolean) => {
      const isDark = theme === "dark" || (theme === "system" && prefersDark);
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme(mediaQuery.matches);

    try {
      if (theme === "system") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", theme);
      }
    } catch {}

    if (theme !== "system") return;

    const handleChange = (event: MediaQueryListEvent) => {
      applyTheme(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  return null;
}

export const Providers = ({ children }: { children: ReactNode }) => {
  const AllFlags: FlagState = {
    // Add feature flags here as needed
  };

  return (
    <StoreProvider>
      <ThemeSync />
      <Toaster position="bottom-center" />
      <FeatureFlagsProvider flags={AllFlags}>{children}</FeatureFlagsProvider>
    </StoreProvider>
  );
};

