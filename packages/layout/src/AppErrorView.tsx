"use client";

import React, { useState } from "react";
import {
  RefreshCw,
  ArrowLeft,
  Home,
  Layers,
  Terminal,
  Activity,
  Copy,
  Check,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Monogram } from "./Monogram";

export interface AppErrorViewProps {
  /**
   * Name of the application displayed in the workspace shell (e.g. "Tasks", "CRM", "Account").
   * @default "Workspace"
   */
  appName?: string;
  /**
   * HTTP status code (404 for Not Found, 500 for Exception).
   * @default 404
   */
  statusCode?: 404 | 500;
  /**
   * Custom title heading.
   */
  title?: string;
  /**
   * Custom explanatory description.
   */
  description?: string;
  /**
   * Root URL of the current application.
   * @default "/"
   */
  homeUrl?: string;
  /**
   * Central Hub dashboard URL.
   * @default "https://hub.basepoint.ma"
   */
  hubUrl?: string;
  /**
   * System Status URL.
   * @default "https://status.basepoint.ma"
   */
  statusUrl?: string;
  /**
   * React error boundary reset callback (used on 500 pages).
   */
  reset?: () => void;
  /**
   * Runtime error object (used on 500 pages for diagnostics).
   */
  error?: Error & { digest?: string };
  className?: string;
}

export function AppErrorView({
  appName = "Workspace",
  statusCode = 404,
  title,
  description,
  homeUrl = "/",
  hubUrl = "https://hub.basepoint.ma",
  statusUrl = "https://status.basepoint.ma",
  reset,
  error,
  className = "",
}: AppErrorViewProps) {
  const is404 = statusCode === 404;
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(!is404 && Boolean(error));

  const defaultTitle = is404
    ? "Workspace View Not Found"
    : "Application Runtime Error";

  const defaultDescription = is404
    ? `The requested route, resource, or panel is not available in Basepoint ${appName}. It may have been archived, deleted, or you might need higher workspace permissions.`
    : `An unhandled exception occurred in Basepoint ${appName}. Your active state has been isolated to prevent data corruption.`;

  const effectiveTitle = title || defaultTitle;
  const effectiveDescription = description || defaultDescription;

  const handleCopyDiagnostics = () => {
    const diagnosticPayload = JSON.stringify(
      {
        app: appName,
        statusCode,
        timestamp: new Date().toISOString(),
        digest: error?.digest || "N/A",
        message: error?.message || "No error message provided",
        stack: error?.stack || "N/A",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "N/A",
      },
      null,
      2
    );

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(diagnosticPayload).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleRetry = () => {
    if (reset) {
      reset();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div
      role="main"
      aria-labelledby="app-error-heading"
      className={`min-h-screen bg-[#FDFCFB] text-[#003922] flex flex-col justify-between selection:bg-[#a7ff6d] selection:text-[#003922] font-sans ${className}`}
    >
      {/* Workspace App Navigation Bar */}
      <header className="w-full bg-white border-b border-[#E2DDD0] px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <a
            href={homeUrl}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#f6ffe8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#003922]"
            aria-label={`${appName} Dashboard`}
          >
            <div className="w-7 h-7 rounded-lg bg-[#003922] flex items-center justify-center">
              <Monogram variant="lime" className="w-4 h-5" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-[#003922]">
              basepoint<span className="text-[#10b981]">.</span>
            </span>
          </a>

          <span className="text-[#5e665d]/40 select-none">/</span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#003922] tracking-wide">
              {appName}
            </span>
            <span className="hidden sm:inline-flex text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f6ffe8] border border-[#a7ff6d]/40 text-[#003922] font-semibold">
              v1.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={hubUrl}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2DDD0] text-xs font-semibold text-[#003922] hover:bg-[#f6ffe8] transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-[#5e665d]" />
            <span>Hub</span>
          </a>

          <a
            href={statusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#10b981]/10 text-[#003922] text-xs font-semibold hover:bg-[#10b981]/20 transition-colors"
            title="System Status"
          >
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="hidden md:inline">Operational</span>
          </a>
        </div>
      </header>

      {/* Main Workspace Error Canvas */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="max-w-xl w-full">
          {/* Card Container */}
          <div className="bg-white border border-[#E2DDD0] rounded-2xl shadow-sm overflow-hidden">
            {/* Terminal / Code header strip */}
            <div className="bg-[#f6ffe8]/60 border-b border-[#E2DDD0] px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" />
                <span className="ml-2 font-mono text-xs font-bold text-[#003922] tracking-wider">
                  {is404 ? `HTTP 404 // NOT_FOUND` : `EXCEPTION 500 // APP_CRASH`}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#5e665d]">
                app: {appName.toLowerCase()}
              </span>
            </div>

            {/* Inner Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                    is404
                      ? "bg-[#f6ffe8] text-[#003922] border-[#a7ff6d]"
                      : "bg-[#fef2f2] text-[#dc2626] border-[#fecaca]"
                  }`}
                >
                  {is404 ? (
                    <Search className="w-6 h-6" />
                  ) : (
                    <Terminal className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <h1
                    id="app-error-heading"
                    className="text-xl sm:text-2xl font-bold text-[#003922] tracking-tight mb-2"
                  >
                    {effectiveTitle}
                  </h1>
                  <p className="text-sm text-[#5e665d] leading-relaxed">
                    {effectiveDescription}
                  </p>
                </div>
              </div>

              {/* Diagnostic Inspector for Exceptions */}
              {!is404 && (
                <div className="mb-6 rounded-xl border border-[#E2DDD0] bg-[#FDFCFB] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-[#003922] hover:bg-[#f6ffe8]/60 transition-colors text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#5e665d]" />
                      <span>Diagnostic Details</span>
                      {error?.digest && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#E2DDD0] text-[#5e665d]">
                          id: {error.digest}
                        </span>
                      )}
                    </span>
                    {showDetails ? (
                      <ChevronUp className="w-4 h-4 text-[#5e665d]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#5e665d]" />
                    )}
                  </button>

                  {showDetails && (
                    <div className="p-4 border-t border-[#E2DDD0] bg-white font-mono text-[11px] text-[#003922] space-y-2">
                      {error?.message && (
                        <div className="p-2 rounded bg-[#f6ffe8] text-[#003922] border border-[#a7ff6d]/40 break-words">
                          {error.message}
                        </div>
                      )}
                      <div className="text-[#5e665d] text-[10px] flex justify-between items-center pt-1">
                        <span>Time: {new Date().toLocaleTimeString()}</span>
                        <button
                          type="button"
                          onClick={handleCopyDiagnostics}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-[#E2DDD0] hover:bg-[#f6ffe8] text-[#003922] transition-colors cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3 h-3 text-[#10b981]" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy JSON</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
                {!is404 ? (
                  <>
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#003922] text-[#a7ff6d] text-xs font-bold hover:bg-[#002817] transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#003922]"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry Operation</span>
                    </button>

                    <a
                      href={homeUrl}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E2DDD0] text-xs font-semibold text-[#003922] hover:bg-[#f6ffe8] transition-colors"
                    >
                      <Home className="w-3.5 h-3.5 text-[#5e665d]" />
                      <span>App Home</span>
                    </a>

                    <a
                      href={hubUrl}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E2DDD0] text-xs font-semibold text-[#003922] hover:bg-[#f6ffe8] transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#5e665d]" />
                      <span>Central Hub</span>
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href={homeUrl}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#003922] text-white text-xs font-bold hover:bg-[#002817] hover:text-[#a7ff6d] transition-all shadow-xs"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Return to {appName}</span>
                    </a>

                    <a
                      href={hubUrl}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E2DDD0] text-xs font-semibold text-[#003922] hover:bg-[#f6ffe8] transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#5e665d]" />
                      <span>Switch Application</span>
                    </a>

                    <a
                      href={statusUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD0] text-xs font-semibold text-[#5e665d] hover:text-[#003922] hover:bg-[#f6ffe8] transition-colors"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>Status</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Footer Bar of the card */}
            <div className="bg-[#FAF9F5] border-t border-[#E2DDD0] px-6 py-3 flex items-center justify-between text-[11px] text-[#5e665d]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                Basepoint Central Infrastructure
              </span>
              <span>Hostinger Edge Cloud</span>
            </div>
          </div>
        </div>
      </main>

      {/* Subtle Bottom Bar */}
      <footer className="w-full px-6 py-4 text-center text-xs text-[#5e665d] border-t border-[#E2DDD0]/60">
        <p>
          Basepoint Cloud Workspace OS • Need assistance? Visit{" "}
          <a
            href="https://basepoint.ma"
            className="text-[#003922] font-semibold hover:underline"
          >
            basepoint.ma
          </a>
        </p>
      </footer>
    </div>
  );
}

export default AppErrorView;
