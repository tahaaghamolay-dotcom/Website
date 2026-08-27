import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { api } from "./store";
import type { UserRecord } from "./types";

interface AuthContextValue {
  user: UserRecord | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInDemo: () => Promise<void>;
  signUp: (data: { name: string; email: string; password: string; company?: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSession().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const u = await api.signIn(email, password);
    setUser(u);
  }, []);

  const signInDemo = useCallback(async () => {
    const u = await api.signInDemo();
    setUser(u);
  }, []);

  const signUp = useCallback(
    async (data: { name: string; email: string; password: string; company?: string }) => {
      const u = await api.signUp(data);
      setUser(u);
    },
    []
  );

  const signOut = useCallback(async () => {
    await api.signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInDemo, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
