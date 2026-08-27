import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

export type AuthMode = "signin" | "signup";

interface UIContextValue {
  authOpen: boolean;
  authMode: AuthMode;
  selectedPlan: string | null;
  openAuth: (mode: AuthMode, plan?: string) => void;
  closeAuth: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const openAuth = useCallback((mode: AuthMode, plan?: string) => {
    setAuthMode(mode);
    setSelectedPlan(plan ?? null);
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => setAuthOpen(false), []);

  return (
    <UIContext.Provider value={{ authOpen, authMode, selectedPlan, openAuth, closeAuth }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
