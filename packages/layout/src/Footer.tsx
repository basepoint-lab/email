import React from "react";
import { ArrowUp } from "lucide-react";
import { Logo } from "@basepoint-lab/ui";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  tagline?: string;
  columns?: FooterColumn[];
  copyright?: string;
  showScrollToTop?: boolean;
}

const defaultColumns: FooterColumn[] = [
  {
    title: "01 · Learn (Academy)",
    links: [
      { label: "Sprints IA & Automation", href: "/learn" },
      { label: "Venture Architecture", href: "/learn" },
      { label: "Masterclasses", href: "/learn" },
    ],
  },
  {
    title: "02 · Build (Studio)",
    links: [
      { label: "BIAB Sprints", href: "/build" },
      { label: "Sprint Tracker", href: "/build" },
      { label: "Tech Stack & Archetypes", href: "/build" },
    ],
  },
  {
    title: "03 · Launch (Ventures)",
    links: [
      { label: "Ecosystem Directory", href: "/launch" },
      { label: "Showcases", href: "/launch" },
      { label: "WhatsApp Channels", href: "/launch" },
    ],
  },
  {
    title: "04 · Operations & Legal",
    links: [
      { label: "Knowledge Center", href: "/center" },
      { label: "Brand System & Foundry", href: "/assets" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export function Footer({
  tagline = "The integrated venture operating system for high-velocity builders and creators.",
  columns = defaultColumns,
  copyright = `© ${new Date().getFullYear()} Basepoint. All rights reserved.`,
  showScrollToTop = true,
  className = "",
  ...props
}: FooterProps) {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className={`relative border-t border-[#E2DDD0] bg-white pt-14 pb-10 ${className}`}
      {...props}
    >
      {showScrollToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="absolute -top-5 right-6 sm:right-12 w-10 h-10 rounded-full bg-[#003922] hover:bg-black text-[#a7ff6d] flex items-center justify-center shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer z-10"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Summary Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#f6ffe8] gap-4">
          <div>
            <Logo variant="primary" className="h-7 w-auto" />
            <p className="text-xs text-[#5e665d] max-w-md mt-2 leading-relaxed">
              {tagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#a7ff6d] text-[#003922] font-bold">
              EST. 2026
            </span>
            <div className="h-3 w-px bg-[#E2DDD0]" />
            <span className="text-[11px] font-mono text-[#5e665d] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Ecosystem Online
            </span>
          </div>
        </div>

        {/* Multi-Column Links Grid */}
        {columns.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-[#003922] mb-3">
                  {col.title}
                </h4>
                <ul className="space-y-2 text-xs font-mono text-[#5e665d]">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noreferrer" : undefined}
                        className="hover:text-[#003922] hover:underline transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-6 border-t border-[#f6ffe8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#5e665d]">
          <p>{copyright}</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#003922] font-bold">b.</span>
            <span>Casablanca, Morocco</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
