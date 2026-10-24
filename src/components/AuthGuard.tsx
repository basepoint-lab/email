"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUser, logout, redirectToLogin, type AuthMeResponse } from "../lib/auth-client";
import { checkUserAssignedAccount, type MailAccount } from "../lib/mail-client";
import { Loader2, ShieldAlert, ExternalLink, ArrowRight, LogOut, MailCheck } from "lucide-react";

interface AuthContextType {
  auth: AuthMeResponse | null;
  assignedAccount: MailAccount | null;
  assignedAccounts: MailAccount[];
  selectedAccount: MailAccount | null;
  setSelectedAccount: (account: MailAccount | null) => void;
  loading: boolean;
  logout: () => Promise<void>;
  refetchAssignment: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  assignedAccount: null,
  assignedAccounts: [],
  selectedAccount: null,
  setSelectedAccount: () => {},
  loading: true,
  logout: async () => {},
  refetchAssignment: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthMeResponse | null>(null);
  const [assignedAccount, setAssignedAccount] = useState<MailAccount | null>(null);
  const [assignedAccounts, setAssignedAccounts] = useState<MailAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<MailAccount | null>(null);
  const [hasCheckedAssignment, setHasCheckedAssignment] = useState(false);
  const [loading, setLoading] = useState(true);

  async function checkAssignment(userId: string, email?: string | null) {
    try {
      const res = await checkUserAssignedAccount(userId, email);
      if (res.hasAssignedEmail) {
        const accList = res.accounts && res.accounts.length > 0 ? res.accounts : (res.account ? [res.account] : []);
        setAssignedAccounts(accList);
        const primary = res.account || accList[0] || null;
        setAssignedAccount(primary);
        setSelectedAccount((prev) => {
          if (prev && accList.some((a) => a.id === prev.id || a.email === prev.email)) {
            return prev;
          }
          return primary;
        });
      } else {
        setAssignedAccounts([]);
        setAssignedAccount(null);
        setSelectedAccount(null);
      }
    } catch {
      setAssignedAccounts([]);
      setAssignedAccount(null);
      setSelectedAccount(null);
    } finally {
      setHasCheckedAssignment(true);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        const userAccess = await fetchUser();
        if (!isMounted) return;

        if (!userAccess) {
          redirectToLogin();
          return;
        }

        setAuth(userAccess);
        await checkAssignment(userAccess.user.id, userAccess.user.email);
      } catch (err) {
        console.error("[AuthGuard] Error checking session:", err);
        redirectToLogin();
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const refetchAssignment = async () => {
    if (auth?.user?.id) {
      await checkAssignment(auth.user.id, auth.user.email);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6ffe8] text-[#003922]">
        <Loader2 className="w-8 h-8 animate-spin text-[#003922] mb-4" />
        <p className="text-sm font-mono text-[#5e665d]">
          Authenticating Basepoint Mail identity & corporate mailbox bindings...
        </p>
      </div>
    );
  }

  if (!auth) {
    return null;
  }

  // Enforce mandatory corporate mailbox assignment check
  if (hasCheckedAssignment && !assignedAccount) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6ffe8] px-4 py-12 text-[#1c1d1a]">
        <div className="w-full max-w-lg bg-white border border-[#E2DDD0] rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-200">
            <ShieldAlert className="w-8 h-8 text-amber-600" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-mono">
              Access Restricted
            </span>
            <h1 className="text-2xl font-black text-[#003922] tracking-tight">
              Corporate Mailbox Not Assigned
            </h1>
            <p className="text-sm text-[#5e665d] leading-relaxed">
              Your authenticated identity{" "}
              <strong className="text-[#003922] font-mono">{auth.user.email}</strong> is valid,
              but does not have an active corporate mailbox (e.g. <span className="font-mono">@basepoint.ma</span>) assigned.
            </p>
          </div>

          <div className="bg-[#f6ffe8] rounded-2xl p-4 text-left border border-[#E2DDD0] space-y-2 text-xs">
            <div className="font-bold text-[#003922] flex items-center gap-2">
              <MailCheck className="w-4 h-4 text-emerald-600" />
              <span>How to gain access:</span>
            </div>
            <p className="text-[#5e665d]">
              1. Open <strong>User Management</strong> (<span className="font-mono">users.basepoint.ma</span>).
            </p>
            <p className="text-[#5e665d]">
              2. Go to the <strong>Emails</strong> tab and bind your identity to a corporate business email address.
            </p>
            <p className="text-[#5e665d]">
              3. Once linked in Supabase, return here to open your webmail inbox.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <a
              href="https://users.basepoint.ma"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#003922] text-white rounded-xl text-sm font-bold hover:bg-[#002516] transition-colors shadow-sm"
            >
              <span>Assign Mailbox in User Management</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={refetchAssignment}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#f6ffe8] text-[#003922] border border-[#E2DDD0] rounded-xl text-sm font-semibold hover:bg-[#eae6d8] transition-colors"
            >
              <span>Check Assignment Again</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => logout()}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-[#5e665d] hover:text-rose-600 rounded-xl text-xs font-mono transition-colors mt-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Basepoint</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        assignedAccount,
        assignedAccounts,
        selectedAccount,
        setSelectedAccount,
        loading,
        logout,
        refetchAssignment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
