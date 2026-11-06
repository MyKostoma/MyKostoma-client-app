"use client";

import * as React from "react";
import {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  useEffect,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export interface DashboardTopBarContextValue {
  hasCustomTopBar: boolean;
  setHasCustomTopBar: (has: boolean) => void;
  portalTarget: HTMLDivElement | null;
  setPortalTarget: (target: HTMLDivElement | null) => void;
  onMenuClick?: () => void;
  setOnMenuClick: (handler: (() => void) | undefined) => void;
}

const DashboardTopBarContext = createContext<DashboardTopBarContextValue>({
  hasCustomTopBar: false,
  setHasCustomTopBar: () => {},
  portalTarget: null,
  setPortalTarget: () => {},
  onMenuClick: undefined,
  setOnMenuClick: () => {},
});

export function DashboardTopBarProvider({
  children,
  onMenuClick,
}: {
  children: ReactNode;
  onMenuClick?: () => void;
}) {
  const [hasCustomTopBar, setHasCustomTopBar] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLDivElement | null>(null);

  return (
    <DashboardTopBarContext.Provider
      value={{
        hasCustomTopBar,
        setHasCustomTopBar,
        portalTarget,
        setPortalTarget,
        onMenuClick,
        setOnMenuClick: () => {},
      }}
    >
      {children}
    </DashboardTopBarContext.Provider>
  );
}

export function useDashboardTopBar() {
  return useContext(DashboardTopBarContext);
}

export function useDashboardMobileMenu() {
  const { onMenuClick } = useContext(DashboardTopBarContext);
  return onMenuClick;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Component used by any dashboard page or module to dynamically mount
 * its custom top bar into the main DashboardLayout header slot.
 */
export function DashboardTopBarSlot({ children }: { children: ReactNode }) {
  const { portalTarget, setHasCustomTopBar } = useDashboardTopBar();

  useIsomorphicLayoutEffect(() => {
    setHasCustomTopBar(true);
    return () => {
      setHasCustomTopBar(false);
    };
  }, [setHasCustomTopBar]);

  if (!portalTarget) {
    return null;
  }

  return createPortal(children, portalTarget);
}

