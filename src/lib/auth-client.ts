/**
 * Basepoint Shared SSO Auth Client for mail.basepoint.ma
 * Connects to api.basepoint.ma and one.basepoint.ma.
 */

export interface AuthUserProfile {
  display_name: string | null;
  avatar_url: string | null;
}

export interface AuthUserData {
  id: string;
  email: string | null;
  email_confirmed_at?: string;
  created_at?: string;
  updated_at?: string;
  user_metadata?: Record<string, unknown>;
}

export interface AuthMeResponse {
  user: AuthUserData;
  profile: AuthUserProfile;
  roles: string[];
  permissions: string[];
  tenants: string[];
  apps: string[];
  is_super_admin: boolean;
}

export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:4000";
    }
  }

  return "https://api.basepoint.ma";
}

export function getSsoLoginUrl(returnUrl?: string): string {
  let ssoBase = "https://one.basepoint.ma";

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      ssoBase = process.env.NEXT_PUBLIC_SSO_URL || "https://one.basepoint.ma";
    }
  }

  const destination = returnUrl || (typeof window !== "undefined" ? window.location.href : "");
  if (!destination) return ssoBase;

  return `${ssoBase}/?redirect=${encodeURIComponent(destination)}`;
}

export async function fetchUser(): Promise<AuthMeResponse | null> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 401) {
      const refreshed = await refreshSession();
      if (refreshed) {
        const retryRes = await fetch(`${getApiBaseUrl()}/auth/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });
        if (retryRes.ok) {
          return await retryRes.json();
        }
      }
      return null;
    }

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (err) {
    console.warn("[auth-client] Network error calling /auth/me:", err);
    return null;
  }
}

export async function refreshSession(): Promise<boolean> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch(`${getApiBaseUrl()}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.warn("[auth-client] Logout error:", err);
  } finally {
    window.location.href = "https://one.basepoint.ma/logout";
  }
}

export function redirectToLogin(returnUrl?: string): void {
  if (typeof window !== "undefined") {
    window.location.href = getSsoLoginUrl(returnUrl);
  }
}
