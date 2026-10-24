"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Layers,
  Sparkles,
  Search,
  Plus,
  ShieldCheck,
  LogOut,
  FolderKanban,
  CheckCircle2,
  Clock,
  Filter,
  User,
} from "lucide-react";

export interface WorkspaceNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
  badge?: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}

export interface WorkspaceProjectItem {
  id: string;
  name: string;
  slug?: string;
  color?: string;
  icon?: string;
  taskCount?: number;
  active?: boolean;
  onClick?: () => void;
}

export interface WorkspaceUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  avatarUrl?: string | null;
}

export interface WorkspaceShellProps {
  /** Application or tool title, e.g. "Tasks", "CRM", "LMS" */
  appName?: string;
  /** Subtitle or ecosystem tier, e.g. "Basepoint Build" */
  appSubtitle?: string;
  /** Custom icon or badge for the app */
  appIcon?: React.ReactNode;
  /** Main navigation view items in the sidebar */
  navItems?: WorkspaceNavItem[];
  /** Project tracks or categorised lists in the sidebar */
  projects?: WorkspaceProjectItem[];
  /** Title for the project tracks section */
  projectsTitle?: string;
  /** Action button at the top of the projects section (e.g. + New Track) */
  onAddProject?: () => void;
  /** Current active user profile */
  currentUser?: WorkspaceUser | null;
  /** Callback when user clicks logout */
  onLogout?: () => void;
  /** Top bar primary title or breadcrumb */
  title?: React.ReactNode;
  /** Top bar description or status */
  subtitle?: React.ReactNode;
  /** Search input or search component slot */
  searchSlot?: React.ReactNode;
  /** Action buttons slot in the top bar (e.g. "+ New Task", "Invite") */
  actionsSlot?: React.ReactNode;
  /** View switchers / filter tabs slot (placed below or inside the top bar) */
  filterSlot?: React.ReactNode;
  /** Status indicator slot (e.g., Live Sync badge) */
  statusSlot?: React.ReactNode;
  /** Custom sidebar header slot if overriding standard branding */
  sidebarHeader?: React.ReactNode;
  /** Custom sidebar footer slot */
  sidebarFooter?: React.ReactNode;
  /** Sidebar width class (default "w-64") */
  sidebarWidth?: string;
  /** Content wrapper class */
  contentClassName?: string;
  /** Additional top banner slot (e.g. SSO indicator or announcement) */
  topBanner?: React.ReactNode;
  /** Page content */
  children: React.ReactNode;
}

export function WorkspaceShell({
  appName = "Tasks",
  appSubtitle = "Basepoint Build",
  appIcon,
  navItems = [],
  projects = [],
  projectsTitle = "Project Tracks",
  onAddProject,
  currentUser,
  onLogout,
  title,
  subtitle,
  searchSlot,
  actionsSlot,
  filterSlot,
  statusSlot,
  sidebarHeader,
  sidebarFooter,
  sidebarWidth = "w-64",
  contentClassName = "",
  topBanner,
  children,
}: WorkspaceShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const defaultAppIcon = appIcon || (
    <div className="w-8 h-8 rounded-lg bg-[#003922] text-[#a7ff6d] flex items-center justify-center font-black text-sm shadow-xs shrink-0">
      <CheckCircle2 className="w-4 h-4" />
    </div>
  );

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#FFFFFF] border-r border-[#E2DDD0]">
      {/* Brand Header */}
      {sidebarHeader || (
        <div className="p-4 border-b border-[#E2DDD0] flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {defaultAppIcon}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-tight text-[#003922] truncate">
                  {appName}
                </span>
                <span className="text-[#a7ff6d] font-black text-lg leading-none">.</span>
              </div>
              <p className="text-[11px] font-mono text-[#5e665d] uppercase tracking-wider truncate">
                {appSubtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navItems.length > 0 && (
          <div>
            <div className="px-2 mb-2 text-[10px] font-mono uppercase tracking-wider text-[#5e665d]/70 font-semibold">
              Views
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = item.active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                      isActive
                        ? "bg-[#003922] text-[#f6ffe8] shadow-xs"
                        : "text-[#003922] hover:bg-[#f6ffe8] hover:text-[#003922]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {item.icon && (
                        <span
                          className={`shrink-0 ${
                            isActive ? "text-[#a7ff6d]" : "text-[#5e665d]"
                          }`}
                        >
                          {item.icon}
                        </span>
                      )}
                      <span className="truncate">{item.label}</span>
                    </div>

                    {typeof item.count === "number" && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full shrink-0 ${
                          isActive
                            ? "bg-[#a7ff6d] text-[#003922] font-bold"
                            : "bg-[#f6ffe8] text-[#5e665d] border border-[#E2DDD0]"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                    {item.badge && !item.count && (
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded shrink-0 ${
                          isActive
                            ? "bg-[#a7ff6d] text-[#003922] font-bold"
                            : "bg-[#f6ffe8] text-[#5e665d]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Project Tracks Section */}
        {projects.length > 0 && (
          <div>
            <div className="px-2 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#5e665d]/70 font-semibold">
                {projectsTitle}
              </span>
              {onAddProject && (
                <button
                  type="button"
                  onClick={onAddProject}
                  className="p-1 rounded text-[#5e665d] hover:text-[#003922] hover:bg-[#f6ffe8] transition-colors"
                  title="Add Project Track"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="space-y-1">
              {projects.map((project) => {
                const isActive = project.active;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      if (project.onClick) project.onClick();
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                      isActive
                        ? "bg-[#f6ffe8] text-[#003922] font-bold border border-[#E2DDD0]"
                        : "text-[#5e665d] hover:text-[#003922] hover:bg-[#f6ffe8]/60"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: project.color || "#003922" }}
                      />
                      <span className="truncate">{project.name}</span>
                    </div>
                    {typeof project.taskCount === "number" && (
                      <span className="text-[10px] font-mono text-[#5e665d]/70 shrink-0">
                        {project.taskCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Footer with User / Sign out */}
      {sidebarFooter || (
        <div className="p-3 border-t border-[#E2DDD0] bg-[#FDFCF8]">
          {currentUser ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#003922] text-[#a7ff6d] flex items-center justify-center font-bold text-xs uppercase shrink-0">
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name || "User"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    currentUser.name?.charAt(0) || currentUser.email?.charAt(0) || "U"
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#003922] truncate">
                    {currentUser.name || currentUser.email}
                  </p>
                  {currentUser.role && (
                    <p className="text-[10px] font-mono text-[#5e665d] truncate uppercase">
                      {currentUser.role}
                    </p>
                  )}
                </div>
              </div>
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="p-1.5 text-[#5e665d] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                  title="Sign out of Basepoint ONE"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-[#5e665d]">
              <span className="font-mono text-[10px] uppercase">Basepoint Ecosystem</span>
              <span className="w-2 h-2 rounded-full bg-[#a7ff6d]" />
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6ffe8] flex flex-col selection:bg-[#a7ff6d] selection:text-[#003922]">
      {/* Optional Top Global Banner (e.g. SSO bar) */}
      {topBanner}

      <div className="flex-1 flex min-h-0">
        {/* Desktop Sticky Sidebar */}
        <aside
          className={`hidden lg:flex lg:flex-col ${sidebarWidth} shrink-0 h-screen sticky top-0 z-30`}
        >
          {sidebarContent}
        </aside>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-[#003922]/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileOpen(false)}
            />
            <div className={`relative ${sidebarWidth} w-4/5 max-w-xs h-full z-10 shadow-2xl`}>
              <div className="absolute top-3 right-3 z-20">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg bg-white/90 text-[#003922] hover:bg-white shadow-xs"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {sidebarContent}
            </div>
          </div>
        )}

        {/* Main Work Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E2DDD0]">
            <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
              {/* Left: Mobile hamburger + Title/Breadcrumb */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden p-2 rounded-lg text-[#003922] hover:bg-[#f6ffe8] -ml-2"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="min-w-0">
                  {title && (
                    <div className="font-black text-lg text-[#003922] tracking-tight leading-snug truncate">
                      {title}
                    </div>
                  )}
                  {subtitle && (
                    <div className="text-xs text-[#5e665d] truncate">{subtitle}</div>
                  )}
                </div>
              </div>

              {/* Center / Right: Search, Status, and Actions */}
              <div className="flex items-center gap-3 shrink-0">
                {statusSlot}
                {searchSlot}
                {actionsSlot}
              </div>
            </div>

            {/* Optional secondary filter tab bar */}
            {filterSlot && (
              <div className="px-4 sm:px-6 lg:px-8 py-2.5 bg-[#FDFCF8] border-t border-[#E2DDD0]/60">
                {filterSlot}
              </div>
            )}
          </header>

          {/* Page Body */}
          <main
            className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto ${contentClassName}`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceShell;
