"use client";

import React, { useState, useEffect } from "react";
import {
  WorkspaceShell,
  Container,
} from "@basepoint-lab/layout";
import {
  Mail,
  Send,
  Link2,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Inbox,
  SendHorizontal,
  Trash2,
  Archive,
  Search,
  Filter,
  Sparkles,
  ArrowUpRight,
  PenSquare,
  RefreshCw,
  X,
  AlertCircle,
  KeyRound,
  Check,
} from "lucide-react";

import { AuthGuard, useAuth } from "../components/AuthGuard";

interface SubdomainHealth {
  domain: string;
  type: string;
  status: "active" | "ready" | "pending";
  description: string;
  records: string[];
}

const EMAIL_SUBDOMAINS: SubdomainHealth[] = [
  {
    domain: "mail.basepoint.ma",
    type: "Web Application / Webmail",
    status: "active",
    description: "Hostinger Virtual Host workspace & secure webmail gateway.",
    records: ["A -> 153.92.6.148", "AAAA -> 2a02:4780:a:1079:0:1f3c:1ad6:f", "SSL (Lifetime Active)"],
  },
  {
    domain: "send.basepoint.ma",
    type: "Dedicated Sending Domain",
    status: "active",
    description: "Authenticated Resend outbound transactional delivery channel.",
    records: ["DKIM (resend._domainkey.send)", "Return-Path (bounces.send)", "Regional (rbounces.send)"],
  },
  {
    domain: "links.send.basepoint.ma",
    type: "Tracking Subdomain",
    status: "active",
    description: "Custom branded click and open analytics tracking domain.",
    records: ["CNAME -> links2.resend-dns.com", "SSL Automated via Resend Edge"],
  },
];

interface InboundEmail {
  uid: number;
  from: string;
  to?: string;
  subject: string;
  date: string;
  unread: boolean;
  snippet?: string;
  text?: string;
  html?: string;
}

const INITIAL_FALLBACK_MESSAGES: InboundEmail[] = [
  {
    uid: 101,
    from: "Hostinger Titan Mail <support@titan.email>",
    to: "admin@basepoint.ma",
    subject: "Titan Business Mail Active on basepoint.ma",
    date: new Date().toISOString(),
    unread: true,
    snippet: "Titan mail routing (mx1.titan.email & mx2.titan.email) is fully authenticated with DKIM and SPF...",
    text: "Your Hostinger Titan business email infrastructure is live. You can fetch and send messages directly through SMTP/IMAP protocols.",
  },
  {
    uid: 102,
    from: "Resend Infrastructure <notifications@send.basepoint.ma>",
    to: "admin@basepoint.ma",
    subject: "Dedicated Sending Domain send.basepoint.ma Verified",
    date: new Date(Date.now() - 3600000).toISOString(),
    unread: false,
    snippet: "Your dedicated sending subdomain and return-path alignment have been successfully verified...",
    text: "DKIM, SPF and CNAME tracking are verified on basepoint.ma. Outbound emails are cryptographically signed.",
  },
];

export default function EmailAppPage() {
  return (
    <AuthGuard>
      <EmailAppContent />
    </AuthGuard>
  );
}

function EmailAppContent() {
  const { auth, assignedAccount, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"inbox" | "sent" | "infrastructure">("inbox");
  const [messages, setMessages] = useState<InboundEmail[]>(INITIAL_FALLBACK_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState<InboundEmail>(INITIAL_FALLBACK_MESSAGES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Mail account credentials state
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState(false);

  // Compose modal state
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);

  // Load saved credentials from localStorage or assigned account
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bp_titan_auth");
      if (stored) {
        const { email, password } = JSON.parse(stored);
        setUserEmail(email);
        setUserPassword(password);
        setSavedCredentials(true);
      } else if (assignedAccount?.email) {
        setUserEmail(assignedAccount.email);
      } else if (auth?.user?.email) {
        setUserEmail(auth.user.email);
      }
    } catch {}
  }, [auth, assignedAccount]);

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userPassword) return;
    try {
      localStorage.setItem("bp_titan_auth", JSON.stringify({ email: userEmail, password: userPassword }));
      setSavedCredentials(true);
      setIsCredentialsModalOpen(false);
      fetchInbox(userEmail, userPassword);
    } catch {}
  };

  const fetchInbox = async (email?: string, password?: string) => {
    const credEmail = email || userEmail;
    const credPass = password || userPassword;

    if (!credEmail || !credPass) {
      setIsCredentialsModalOpen(true);
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("https://api.basepoint.ma/v1/mail/inbox", {
        headers: {
          "x-mail-user": credEmail,
          "x-mail-password": credPass,
        },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Failed to fetch emails (HTTP ${res.status})`);
      }

      const data = await res.json();
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
        setSelectedMessage(data.messages[0]);
      }
    } catch (err: any) {
      console.warn("IMAP live fetch fallback:", err.message);
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo || !composeSubject || !composeBody) return;

    if (!userEmail || !userPassword) {
      setIsCredentialsModalOpen(true);
      return;
    }

    setIsSending(true);
    setSendSuccess(null);
    setErrorMsg(null);

    try {
      const res = await fetch("https://api.basepoint.ma/v1/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-mail-user": userEmail,
          "x-mail-password": userPassword,
        },
        body: JSON.stringify({
          to: composeTo,
          subject: composeSubject,
          text: composeBody,
          from: userEmail,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to deliver email through Titan SMTP.");
      }

      setSendSuccess("Email dispatched successfully via Titan SMTP!");
      setTimeout(() => {
        setIsComposeOpen(false);
        setComposeTo("");
        setComposeSubject("");
        setComposeBody("");
        setSendSuccess(null);
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <WorkspaceShell
      appName="Mail"
      appSubtitle="Basepoint Operations"
      title="Titan Webmail & Transactional Email"
      subtitle={
        assignedAccount
          ? `Assigned Mailbox: ${assignedAccount.email} (${assignedAccount.name})`
          : savedCredentials
          ? `Mailbox: ${userEmail}`
          : "Titan Webmail Portal"
      }
      currentUser={{
        name: auth?.profile?.display_name || (auth?.user?.email ? auth.user.email.split("@")[0] : "Basepoint User"),
        email: assignedAccount?.email || auth?.user?.email || userEmail || "admin@basepoint.ma",
        role: auth?.roles?.[0] || "Authorized Member",
      }}
      onLogout={logout}
      navItems={[
        {
          id: "inbox",
          label: "Inbox",
          icon: <Inbox className="w-4 h-4" />,
          count: messages.length,
          active: activeTab === "inbox",
          onClick: () => setActiveTab("inbox"),
        },
        {
          id: "sent",
          label: "Sent Items",
          icon: <SendHorizontal className="w-4 h-4" />,
          active: activeTab === "sent",
          onClick: () => setActiveTab("sent"),
        },
        {
          id: "infra",
          label: "Infrastructure DNS",
          icon: <ShieldCheck className="w-4 h-4" />,
          active: activeTab === "infrastructure",
          onClick: () => setActiveTab("infrastructure"),
        },
      ]}
      actionsSlot={
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsComposeOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#003c2d] bg-[#BCF63C] hover:bg-[#a6db32] transition-colors shadow-xs"
          >
            <PenSquare className="w-3.5 h-3.5 text-[#003c2d]" />
            <span>New Message</span>
          </button>
          <button
            onClick={() => setIsCredentialsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#003c2d] bg-[#F7F5EC] hover:bg-[#E2DDD0]/60 transition-colors border border-[#E2DDD0]"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>{savedCredentials ? "Account Settings" : "Connect Titan"}</span>
          </button>
          <a
            href="https://mail.hostinger.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#003c2d] hover:bg-[#00543f] transition-all shadow-sm"
          >
            <span>Titan Webmail</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#BCF63C]" />
          </a>
        </div>
      }
    >
      <div className="py-6">
        <Container size="full">
          {/* Error / Alert banner if connection error */}
          {errorMsg && (
            <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-amber-700 hover:text-amber-900 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Subdomains Infrastructure Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {EMAIL_SUBDOMAINS.map((sub) => (
              <div
                key={sub.domain}
                className="p-4 rounded-xl bg-white border border-[#E2DDD0] shadow-xs hover:border-[#003c2d]/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {sub.domain.includes("mail") ? (
                      <Mail className="w-4 h-4 text-[#003c2d]" />
                    ) : sub.domain.includes("send") ? (
                      <Send className="w-4 h-4 text-[#00543f]" />
                    ) : (
                      <Link2 className="w-4 h-4 text-[#003c2d]" />
                    )}
                    <span className="font-mono text-xs font-bold text-[#003c2d]">{sub.domain}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00543f] bg-[#A3FB60]/20 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-[#00543f]" />
                    {sub.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-[#5e665d] mb-3 leading-relaxed">{sub.description}</p>
                <div className="space-y-1 bg-[#F7F5EC] p-2.5 rounded-lg border border-[#E2DDD0]/60">
                  {sub.records.map((rec, i) => (
                    <div key={i} className="text-[10px] font-mono text-[#5e665d] truncate flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#003c2d]" />
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Main App Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-2xl border border-[#E2DDD0] overflow-hidden min-h-[600px] shadow-sm">
            {/* Middle Message List */}
            <div className="lg:col-span-5 border-r border-[#E2DDD0] flex flex-col">
              <div className="p-3 border-b border-[#E2DDD0] flex items-center justify-between gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5e665d]" />
                  <input
                    type="text"
                    placeholder="Search inbox..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#E2DDD0] bg-[#F7F5EC]/50 focus:outline-none focus:border-[#003c2d]"
                  />
                </div>
                <button
                  onClick={() => fetchInbox()}
                  disabled={isLoading}
                  title="Refresh Inbox"
                  className="p-1.5 text-[#5e665d] hover:text-[#003c2d] rounded-lg border border-[#E2DDD0] transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#003c2d]" : ""}`} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-[#E2DDD0]/60">
                {messages.map((msg) => (
                  <div
                    key={msg.uid}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedMessage?.uid === msg.uid
                        ? "bg-[#F7F5EC]"
                        : "hover:bg-[#F7F5EC]/50 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#003c2d] truncate">{msg.from}</span>
                      <span className="text-[10px] text-[#5e665d] font-mono">
                        {new Date(msg.date).toLocaleDateString([], { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-[#003c2d] mb-1 line-clamp-1">{msg.subject}</h4>
                    <p className="text-[11px] text-[#5e665d] line-clamp-2 leading-relaxed">
                      {msg.snippet || msg.text || "No preview available"}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      {msg.unread && (
                        <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-[#BCF63C] text-[#003c2d]">
                          NEW
                        </span>
                      )}
                      <span className="text-[9px] font-mono text-[#5e665d]">
                        IMAP ID #{msg.uid}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Detail / Preview */}
            <div className="lg:col-span-7 p-6 flex flex-col justify-between">
              {selectedMessage ? (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD0] mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-[#003c2d] mb-1">{selectedMessage.subject}</h2>
                      <div className="flex items-center gap-2 text-xs text-[#5e665d]">
                        <span>From: <strong className="text-[#003c2d]">{selectedMessage.from}</strong></span>
                        {selectedMessage.to && <span>To: {selectedMessage.to}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button className="p-2 text-[#5e665d] hover:text-[#003c2d] rounded-lg hover:bg-[#F7F5EC]">
                        <Archive className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#5e665d] hover:text-[#003c2d] rounded-lg hover:bg-[#F7F5EC]">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-[#003c2d] leading-relaxed space-y-4">
                    {selectedMessage.html ? (
                      <div
                        className="prose prose-sm max-w-none text-xs"
                        dangerouslySetInnerHTML={{ __html: selectedMessage.html }}
                      />
                    ) : (
                      <div className="whitespace-pre-wrap font-sans text-xs text-[#003c2d] leading-relaxed">
                        {selectedMessage.text || selectedMessage.snippet}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-[#5e665d]">
                  Select an email to view contents.
                </div>
              )}

              <div className="pt-6 border-t border-[#E2DDD0] flex items-center justify-between">
                <span className="text-xs text-[#5e665d] font-mono">
                  Titan IMAP: imap.titan.email (993) | SMTP: smtp.titan.email (465)
                </span>
                <button
                  onClick={() => setIsComposeOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003c2d] hover:text-[#00543f]"
                >
                  <PenSquare className="w-3.5 h-3.5" />
                  <span>Send Reply</span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Connect Titan Account Modal */}
      {isCredentialsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E2DDD0] shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#003c2d]" />
                <h3 className="text-base font-bold text-[#003c2d]">Connect Titan Email Account</h3>
              </div>
              <button
                onClick={() => setIsCredentialsModalOpen(false)}
                className="p-1 rounded-lg text-[#5e665d] hover:text-[#003c2d]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#5e665d] mb-4">
              Enter your Hostinger Titan mailbox credentials. Emails are fetched securely via IMAP and sent via SMTP.
            </p>
            <form onSubmit={handleSaveCredentials} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#003c2d] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="contact@basepoint.ma"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2DDD0] bg-[#F7F5EC]/50 focus:outline-none focus:border-[#003c2d]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#003c2d] mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Your mailbox password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2DDD0] bg-[#F7F5EC]/50 focus:outline-none focus:border-[#003c2d]"
                />
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCredentialsModalOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#5e665d] hover:bg-[#F7F5EC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#003c2d] hover:bg-[#00543f] shadow-xs"
                >
                  Save & Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Compose Message Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#E2DDD0] shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PenSquare className="w-5 h-5 text-[#003c2d]" />
                <h3 className="text-base font-bold text-[#003c2d]">New Email (Titan SMTP)</h3>
              </div>
              <button
                onClick={() => setIsComposeOpen(false)}
                className="p-1 rounded-lg text-[#5e665d] hover:text-[#003c2d]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {sendSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-900 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>{sendSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSendEmail} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#003c2d] mb-1">To</label>
                <input
                  type="email"
                  required
                  placeholder="recipient@example.com"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2DDD0] bg-[#F7F5EC]/50 focus:outline-none focus:border-[#003c2d]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#003c2d] mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Subject line"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2DDD0] bg-[#F7F5EC]/50 focus:outline-none focus:border-[#003c2d]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#003c2d] mb-1">Message Body</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write your email message here..."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2DDD0] bg-[#F7F5EC]/50 focus:outline-none focus:border-[#003c2d]"
                />
              </div>
              <div className="pt-3 flex items-center justify-between border-t border-[#E2DDD0]">
                <span className="text-[10px] text-[#5e665d] font-mono">
                  From: {userEmail || "Connect Titan account"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsComposeOpen(false)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-[#5e665d] hover:bg-[#F7F5EC]"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#003c2d] hover:bg-[#00543f] shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 text-[#BCF63C]" />
                    <span>{isSending ? "Sending..." : "Send Message"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </WorkspaceShell>
  );
}
