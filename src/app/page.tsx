"use client";

import React, { useState } from "react";
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
} from "lucide-react";

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

const MOCK_MESSAGES = [
  {
    id: "msg-1",
    sender: "Basepoint System",
    email: "notifications@send.basepoint.ma",
    subject: "Resend Dedicated Sending Domain Verified: send.basepoint.ma",
    time: "10:14 AM",
    preview: "Your dedicated sending subdomain and return-path alignment have been successfully verified...",
    tag: "Transactional",
    unread: true,
  },
  {
    id: "msg-2",
    sender: "Hostinger Titan Mail",
    email: "support@titan.email",
    subject: "DNS Records Transition Completed (mx1.titan.email & mx2.titan.email)",
    time: "09:30 AM",
    preview: "Titan Business mail routing is now active for domain basepoint.ma with DKIM and SPF checks passing...",
    tag: "System",
    unread: false,
  },
  {
    id: "msg-3",
    sender: "Security Operations",
    email: "security@basepoint.ma",
    subject: "DMARC Alignment Policy Active (p=none)",
    time: "Yesterday",
    preview: "DMARC TXT record _dmarc.basepoint.ma has been broadcast across the global DNS network...",
    tag: "Security",
    unread: false,
  },
];

export default function EmailAppPage() {
  const [activeTab, setActiveTab] = useState<"inbox" | "sent" | "infrastructure">("inbox");
  const [selectedMessage, setSelectedMessage] = useState(MOCK_MESSAGES[0]);

  return (
    <WorkspaceShell
      appName="Mail"
      appSubtitle="Basepoint Operations"
      title="Email Operations Center"
      subtitle="Unified Titan Webmail & Resend Outbound Infrastructure"
      currentUser={{
        name: "Basepoint Admin",
        email: "admin@basepoint.ma",
        role: "Workspace Administrator",
      }}
      navItems={[
        {
          id: "inbox",
          label: "Inbox",
          icon: <Inbox className="w-4 h-4" />,
          count: 3,
          active: activeTab === "inbox",
          onClick: () => setActiveTab("inbox"),
        },
        {
          id: "sent",
          label: "Outbox & Sent",
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
          <a
            href="https://mail.hostinger.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#003c2d] hover:bg-[#00543f] transition-all shadow-sm"
          >
            <span>Open Titan Webmail</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#BCF63C]" />
          </a>
        </div>
      }
    >
      <div className="py-6">
        <Container size="full">
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
                    placeholder="Search messages..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#E2DDD0] bg-[#F7F5EC]/50 focus:outline-none focus:border-[#003c2d]"
                  />
                </div>
                <button className="p-1.5 text-[#5e665d] hover:text-[#003c2d] rounded-lg border border-[#E2DDD0]">
                  <Filter className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-[#E2DDD0]/60">
                {MOCK_MESSAGES.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedMessage.id === msg.id
                        ? "bg-[#F7F5EC]"
                        : "hover:bg-[#F7F5EC]/50 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#003c2d] truncate">{msg.sender}</span>
                      <span className="text-[10px] text-[#5e665d] font-mono">{msg.time}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-[#003c2d] mb-1 line-clamp-1">{msg.subject}</h4>
                    <p className="text-[11px] text-[#5e665d] line-clamp-2 leading-relaxed">{msg.preview}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-[#E2DDD0]/60 text-[#003c2d]">
                        {msg.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Detail / Preview */}
            <div className="lg:col-span-7 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD0] mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#003c2d] mb-1">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-2 text-xs text-[#5e665d]">
                      <span>From: <strong className="text-[#003c2d]">{selectedMessage.sender}</strong></span>
                      <span className="font-mono text-[11px]">({selectedMessage.email})</span>
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
                  <p>
                    This is an automated operational advisory from the Basepoint Email Cluster.
                  </p>
                  <div className="p-4 rounded-xl bg-[#F7F5EC] border border-[#E2DDD0] font-mono text-xs text-[#003c2d] space-y-1">
                    <div>Status: <span className="text-[#00543f] font-bold">PROVISIONED & VERIFIED</span></div>
                    <div>Domain: basepoint.ma</div>
                    <div>Sending Subdomain: send.basepoint.ma</div>
                    <div>Return-Path: bounces.send.basepoint.ma</div>
                  </div>
                  <p>
                    All outgoing emails dispatched through the Central Hub API (<code className="bg-[#E2DDD0]/50 px-1 py-0.5 rounded text-xs font-mono">api.basepoint.ma</code>) utilize our authenticated Resend SDK. Outbound traffic is cryptographically signed via DKIM and tracked through <code className="bg-[#E2DDD0]/50 px-1 py-0.5 rounded text-xs font-mono">links.send.basepoint.ma</code>.
                  </p>

                  <div className="mt-6 p-4 rounded-xl bg-[#001a13] text-white">
                    <div className="flex items-center gap-2 mb-2 text-[#BCF63C] text-xs font-mono">
                      <Sparkles className="w-4 h-4" />
                      <span>Ready in @basepoint-api:</span>
                    </div>
                    <pre className="text-xs font-mono text-gray-300 overflow-x-auto p-2 bg-black/40 rounded-lg">
{`import { sendEmail } from "@/lib/resend";

await sendEmail({
  to: "user@example.com",
  subject: "Welcome to Basepoint",
  html: "<p>Your workspace is ready.</p>",
});`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E2DDD0] flex items-center justify-between">
                <span className="text-xs text-[#5e665d] font-mono">Active Engines: Titan Webmail + Resend SDK</span>
                <a
                  href="https://mail.hostinger.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003c2d] hover:text-[#00543f]"
                >
                  <span>Launch Titan Webmail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </WorkspaceShell>
  );
}
