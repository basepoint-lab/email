"use client";

import React from "react";
import { ArrowLeft, RefreshCw, Activity, ExternalLink, HelpCircle, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";

export interface WebsiteErrorViewProps {
  /**
   * HTTP status code (404 for Not Found, 500 for Server / Runtime Error).
   * @default 404
   */
  statusCode?: 404 | 500;
  /**
   * Main heading. If omitted, a localized default is supplied.
   */
  title?: string;
  /**
   * Detailed explanation text.
   */
  description?: string;
  /**
   * Target URL for the primary Home action.
   * @default "https://basepoint.ma"
   */
  homeUrl?: string;
  /**
   * Target URL for the status page.
   * @default "https://status.basepoint.ma"
   */
  statusUrl?: string;
  /**
   * Contact support email.
   * @default "contact@basepoint.ma"
   */
  contactEmail?: string;
  /**
   * React error boundary reset callback (used on 500 pages).
   */
  reset?: () => void;
  /**
   * Runtime error object (used on 500 pages for diagnostics).
   */
  error?: Error & { digest?: string };
  /**
   * Language preference ("fr" | "en").
   * @default "fr"
   */
  lang?: "fr" | "en";
  className?: string;
}

export function WebsiteErrorView({
  statusCode = 404,
  title,
  description,
  homeUrl = "https://basepoint.ma",
  statusUrl = "https://status.basepoint.ma",
  contactEmail = "contact@basepoint.ma",
  reset,
  error,
  lang = "fr",
  className = "",
}: WebsiteErrorViewProps) {
  const is404 = statusCode === 404;

  const defaultTitle = is404
    ? lang === "fr"
      ? "Page introuvable"
      : "Page Not Found"
    : lang === "fr"
    ? "Une interruption momentanée est survenue"
    : "Temporary Service Interruption";

  const defaultDescription = is404
    ? lang === "fr"
      ? "L'adresse que vous avez demandée n'existe pas, a été renommée ou fait partie d'une mise à jour de notre écosystème."
      : "The page you are looking for doesn't exist, has been moved, or is part of an ecosystem upgrade."
    : lang === "fr"
    ? "Notre système a rencontré un comportement inattendu. Notre équipe d'infrastructure a été notifiée et travaille à sa résolution."
    : "An unexpected condition occurred. Our infrastructure engineers have been notified and are actively working on it.";

  const effectiveTitle = title || defaultTitle;
  const effectiveDescription = description || defaultDescription;

  const handleAction = () => {
    if (!is404 && reset) {
      reset();
    } else if (!is404) {
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  };

  return (
    <div
      role="main"
      aria-labelledby="error-heading"
      className={`min-h-screen bg-[#f6ffe8] text-[#003922] flex flex-col justify-between selection:bg-[#a7ff6d] selection:text-[#003922] font-sans ${className}`}
    >
      {/* Brand Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-[#E2DDD0]/60">
        <a
          href={homeUrl}
          className="inline-flex items-center gap-3 transition-opacity hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[#003922] rounded-lg p-1"
          aria-label="Basepoint Accueil"
        >
          <Logo variant="pine" className="h-7 w-auto" />
        </a>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <a
            href={statusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#E2DDD0] text-[#003922] hover:bg-white hover:border-[#003922]/30 transition-all shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>{lang === "fr" ? "Systèmes opérationnels" : "All systems normal"}</span>
          </a>
        </div>
      </header>

      {/* Hero Error Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* Typographic Status Badge */}
          <div className="inline-flex items-center justify-center mb-6">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#003922] text-[#a7ff6d] shadow-sm">
              {is404 ? (lang === "fr" ? "Erreur 404 • Introuvable" : "Error 404 • Not Found") : (lang === "fr" ? "Erreur 500 • Exception Système" : "Error 500 • System Exception")}
            </span>
          </div>

          {/* Numeric Monument Display */}
          <div className="relative mb-6 select-none">
            <h1
              id="error-heading"
              className="text-8xl sm:text-9xl font-black tracking-tight text-[#003922] leading-none"
            >
              {statusCode}
              <span className="text-[#a7ff6d] inline-block ml-1">.</span>
            </h1>
            <div className="absolute inset-0 flex items-center justify-center -z-10 blur-3xl opacity-20 pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-[#a7ff6d]" />
            </div>
          </div>

          {/* Editorial Headline & Description */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003922] mb-4 tracking-tight">
            {effectiveTitle}
          </h2>

          <p className="text-base sm:text-lg text-[#5e665d] max-w-xl mx-auto mb-10 leading-relaxed">
            {effectiveDescription}
          </p>

          {/* Diagnostic Box for 500 Errors */}
          {!is404 && error?.digest && (
            <div className="mb-8 p-3 rounded-xl bg-white/90 border border-[#E2DDD0] max-w-md mx-auto text-left shadow-xs">
              <div className="text-[11px] font-mono text-[#5e665d] flex items-center justify-between">
                <span>Code diagnostic :</span>
                <span className="text-[#003922] font-semibold">{error.digest}</span>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            {is404 ? (
              <>
                <a
                  href={homeUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#003922] text-white text-sm font-semibold hover:bg-[#002817] hover:text-[#a7ff6d] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003922]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{lang === "fr" ? "Retour à l'accueil" : "Return to Home"}</span>
                </a>

                <a
                  href="https://basepoint.ma/trouver-mon-parcours"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#E2DDD0] text-[#003922] text-sm font-semibold hover:bg-[#f6ffe8] hover:border-[#003922]/40 transition-all shadow-xs"
                >
                  <span>{lang === "fr" ? "Trouver mon parcours" : "Explore Tracks"}</span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleAction}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#003922] text-[#a7ff6d] text-sm font-semibold hover:bg-[#002817] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003922] cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{lang === "fr" ? "Réessayer l'action" : "Try Again"}</span>
                </button>

                <a
                  href={homeUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#E2DDD0] text-[#003922] text-sm font-semibold hover:bg-[#f6ffe8] hover:border-[#003922]/40 transition-all shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{lang === "fr" ? "Accueil" : "Home"}</span>
                </a>
              </>
            )}
          </div>

          {/* Direct Help / Status Links */}
          <div className="mt-12 pt-8 border-t border-[#E2DDD0]/60 flex items-center justify-center gap-6 text-xs text-[#5e665d]">
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-1.5 hover:text-[#003922] transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{lang === "fr" ? "Contacter le support" : "Contact Support"}</span>
            </a>
            <span>•</span>
            <a
              href={statusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#003922] transition-colors"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{lang === "fr" ? "Statut du réseau" : "Platform Status"}</span>
            </a>
          </div>
        </div>
      </main>

      {/* Editorial Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-[#5e665d] border-t border-[#E2DDD0]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-medium">
          © {new Date().getFullYear()} Basepoint SARL. Système d&apos;Exploitation pour l&apos;Entrepreneuriat Structuré.
        </p>
        <div className="flex items-center gap-2 text-[11px] text-[#5e665d]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#003922]" />
          <span>Infrastructure Cloud Sécurisée • Maroc</span>
        </div>
      </footer>
    </div>
  );
}

export default WebsiteErrorView;
