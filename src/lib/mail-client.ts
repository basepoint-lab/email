import { getApiBaseUrl } from "./auth-client";

export interface MailAccount {
  id: string;
  email: string;
  name: string;
  role: string;
  status: "active" | "provisioned" | "suspended";
  userId?: string | null;
  user?: {
    id: string;
    email: string;
    display_name?: string | null;
    avatar_url?: string | null;
  } | null;
  provider: "titan" | "hostinger" | "resend" | "custom";
  allocatedStorage: string;
  imapHost: string;
  smtpHost: string;
  imapPort?: number;
  smtpPort?: number;
  secure?: boolean;
}

export interface CheckAccountResponse {
  status: "success";
  hasAssignedEmail: boolean;
  account: MailAccount | null;
  message?: string;
}

/**
 * Checks if a user has an assigned corporate mailbox on basepoint.ma.
 */
export async function checkUserAssignedAccount(
  userId: string,
  userEmail?: string | null
): Promise<CheckAccountResponse> {
  try {
    const query = userEmail ? `?email=${encodeURIComponent(userEmail)}` : "";
    const res = await fetch(`${getApiBaseUrl()}/v1/mail/accounts/assigned/${userId}${query}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return {
        status: "success",
        hasAssignedEmail: false,
        account: null,
      };
    }

    return await res.json();
  } catch (err) {
    console.error("[mail-client] Failed to check user account assignment:", err);
    return {
      status: "success",
      hasAssignedEmail: false,
      account: null,
    };
  }
}

/**
 * Fetches all available corporate mailboxes in the ecosystem.
 */
export async function fetchCorporateAccounts(): Promise<MailAccount[]> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/v1/mail/accounts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.accounts || [];
  } catch (err) {
    console.error("[mail-client] Failed to fetch corporate accounts:", err);
    return [];
  }
}
