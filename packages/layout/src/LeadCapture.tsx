"use client";
import React, { useState } from "react";
import { Mail, Bell, CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "./Container";

export interface RoleFilterOption {
  id: string;
  label: string;
}

export interface LeadCaptureProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  roles?: RoleFilterOption[];
  subscriberCount?: number;
  placeholder?: string;
  buttonText?: string;
  privacyText?: string;
  onSubmitEmail?: (data: { email: string; role?: string }) => void | Promise<void>;
  className?: string;
}

const defaultRoles: RoleFilterOption[] = [
  { id: "founder", label: "Founder / Entrepreneur" },
  { id: "executive", label: "Executive / Leader" },
  { id: "builder", label: "Engineer / Builder" },
];

export function LeadCapture({
  badge = "THE BASEPOINT DISPATCH · BRIEFS & DEAL FLOW",
  title = "Curated intelligence and venture frameworks delivered weekly.",
  subtitle = "Zero spam. Only high-signal architectural breakdowns, sprint blueprints, and private invitations.",
  roles = defaultRoles,
  subscriberCount = 1480,
  placeholder = "name@company.com",
  buttonText = "Join Dispatch",
  privacyText = "Guaranteed 100% spam-free. Unsubscribe anytime with 1 click.",
  onSubmitEmail,
  className = "",
}: LeadCaptureProps) {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState(roles[0]?.id || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    if (onSubmitEmail) {
      await onSubmitEmail({ email, role: selectedRole });
    } else {
      await new Promise((res) => setTimeout(res, 400));
    }
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section className={`relative w-full bg-[#00271d] text-[#F7F5EC] py-16 sm:py-24 overflow-hidden ${className}`}>
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#BCF63C]/10 blur-[130px] rounded-full pointer-events-none" />

      <Container size="lg" className="relative z-10 text-center">
        {/* Pre-title Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003c2d] border border-[#BCF63C]/30 text-xs font-mono font-bold text-[#BCF63C] mb-4 shadow-xs">
            <Bell className="w-3.5 h-3.5 text-[#BCF63C]" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>

        {isSuccess ? (
          <div className="max-w-md mx-auto p-6 rounded-2xl bg-[#003c2d] border border-[#BCF63C]/40 text-center animate-in fade-in zoom-in-95">
            <CheckCircle2 className="w-10 h-10 text-[#BCF63C] mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">Subscription Confirmed</h3>
            <p className="text-xs text-white/80 font-mono">
              Welcome aboard. You are now connected to the Basepoint ecosystem dispatch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            {/* Role Switcher */}
            {roles.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-white/10 border border-white/10 text-xs font-mono">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      selectedRole === r.id
                        ? "bg-[#BCF63C] text-[#00271d] font-bold shadow-xs"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input + Submit */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-xs font-mono focus:outline-none focus:border-[#BCF63C] focus:ring-1 focus:ring-[#BCF63C] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-5 rounded-xl bg-[#BCF63C] hover:bg-[#a6db32] text-[#00271d] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 shadow-md hover:shadow-lg shrink-0"
              >
                <span>{isSubmitting ? "Subscribing..." : buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Privacy Note & Counter */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/60 gap-1">
              <span>{privacyText}</span>
              {subscriberCount && <span>{subscriberCount.toLocaleString()}+ active readers</span>}
            </div>
          </form>
        )}
      </Container>
    </section>
  );
}

export default LeadCapture;
