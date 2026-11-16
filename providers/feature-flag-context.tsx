"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type FlagState = Record<string, boolean>;

interface FeatureFlagsContextType {
  flags: FlagState;
  toggleFlag: (flag: string) => void;
  setFlag: (flag: string, value: boolean) => void;
  isEnabled: (flag: string) => boolean;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(
  undefined
);

interface FeatureFlagsProviderProps {
  children: ReactNode;
  flags: FlagState;
}

export function FeatureFlagsProvider({
  children,
  flags: initialFlags,
}: FeatureFlagsProviderProps) {
  const [flags, setFlags] = useState<FlagState>(initialFlags);

  const toggleFlag = (flag: string) => {
    setFlags((prev) => ({
      ...prev,
      [flag]: !prev[flag],
    }));
  };

  const setFlag = (flag: string, value: boolean) => {
    setFlags((prev) => ({
      ...prev,
      [flag]: value,
    }));
  };

  const isEnabled = (flag: string) => flags[flag] ?? false;

  return (
    <FeatureFlagsContext.Provider
      value={{ flags, toggleFlag, setFlag, isEnabled }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext);
  if (context === undefined) {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagsProvider"
    );
  }
  return context;
}

