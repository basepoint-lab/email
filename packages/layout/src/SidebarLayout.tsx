"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

export interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: string;
  className?: string;
}

export function SidebarLayout({
  sidebar,
  header,
  children,
  sidebarWidth = "w-64",
  className = "",
}: SidebarLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-[#f6ffe8] flex ${className}`}>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:flex lg:flex-col ${sidebarWidth} shrink-0 border-r border-[#E2DDD0] bg-white h-screen sticky top-0 overflow-y-auto`}
      >
        {sidebar}
      </aside>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#003922]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className={`relative ${sidebarWidth} w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto`}>
            <div className="p-4 border-b border-[#f6ffe8] flex justify-end">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-[#5e665d] hover:text-[#003922] hover:bg-[#f6ffe8]"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-4">{sidebar}</div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Header with toggle */}
        <div className="lg:hidden h-14 border-b border-[#E2DDD0] bg-white px-4 flex items-center justify-between sticky top-0 z-30">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-lg text-[#003922] hover:bg-[#f6ffe8]"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo variant="primary" className="h-6 w-auto" />
          <div className="w-8" />
        </div>

        {header && <div className="border-b border-[#E2DDD0] bg-white sticky top-0 z-20">{header}</div>}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default SidebarLayout;
