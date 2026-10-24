import React from "react";
import { Shield, AlertCircle, CheckCircle2 } from "lucide-react";

export interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  badge?: string;
  errorMessage?: string | null;
  successMessage?: string | null;
  footer?: React.ReactNode;
}

export function AuthCard({
  title = "Sign in to Basepoint",
  subtitle = "Single Sign-On access across all ecosystem workspaces",
  badge = "ONE SSO",
  errorMessage,
  successMessage,
  footer,
  children,
  className = "",
  ...props
}: AuthCardProps) {
  return (
    <div
      className={`w-full max-w-md mx-auto bg-white border border-[#E2DDD0] rounded-2xl shadow-xl overflow-hidden ${className}`}
      {...props}
    >
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#003922] via-[#004f2f] to-[#a7ff6d]" />

      <div className="p-6 sm:p-8">
        {/* Header with Monogram & Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tight text-[#003922]">
              basepoint<span className="text-[#a7ff6d]">.</span>
            </span>
          </div>
          {badge && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#003922] text-[#a7ff6d]">
              <Shield className="w-3 h-3" />
              <span>{badge}</span>
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-[#003922] tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs text-[#5e665d] mt-1 leading-relaxed">{subtitle}</p>}
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-start gap-2.5 animate-in fade-in"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            className="mb-5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-start gap-2.5 animate-in fade-in"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Body Slot */}
        <div className="space-y-4">{children}</div>

        {/* Optional Footer */}
        {footer && <div className="mt-6 pt-4 border-t border-[#f6ffe8] text-xs font-mono text-center text-[#5e665d]">{footer}</div>}
      </div>
    </div>
  );
}

export default AuthCard;
