"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUser, logout, redirectToLogin, type AuthMeResponse } from "../lib/auth-client";
import { Loader2 } from "lucide-react";

interface AuthContextType {
  auth: AuthMeResponse | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  loading: true,
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthMeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const userAccess = await fetchUser();
        if (!isMounted) return;

        if (!userAccess) {
          redirectToLogin();
          return;
        }

        setAuth(userAccess);
      } catch (err) {
        console.error("[AuthGuard] Error checking session:", err);
        redirectToLogin();
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5EC] text-[#003c2d]">
        <Loader2 className="w-8 h-8 animate-spin text-[#003c2d] mb-4" />
        <p className="text-sm font-mono text-[#5e665d]">
          Authenticating Basepoint Mail session...
        </p>
      </div>
    );
  }

  if (!auth) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ auth, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
