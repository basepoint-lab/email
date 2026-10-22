import React from "react";

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  announcementBar?: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  canvas?: boolean;
  glow?: boolean;
  fluid?: boolean;
}

export function AppShell({
  announcementBar,
  header,
  sidebar,
  footer,
  canvas = true,
  glow = false,
  fluid = false,
  className = "",
  children,
  ...props
}: AppShellProps) {
  return (
    <div
      className={`min-h-screen flex flex-col justify-between selection:bg-[#BCF63C] selection:text-[#003c2d] ${
        canvas ? "bg-[#F7F5EC] text-[#003c2d]" : "bg-white text-[#003c2d]"
      } ${className}`}
      {...props}
    >
      {/* Optional Glow Blobs */}
      {glow && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#BCF63C]/15 blur-[120px] rounded-full" />
          <div className="absolute top-[500px] right-0 w-[500px] h-[500px] bg-[#003c2d]/5 blur-[100px] rounded-full" />
        </div>
      )}

      {/* Top Announcement Bar */}
      {announcementBar && <div className="shrink-0">{announcementBar}</div>}

      {/* Main Header */}
      {header && <div className="shrink-0">{header}</div>}

      {/* Body Area: Sidebar + Main Content */}
      <div className="flex-1 flex">
        {sidebar && <aside className="shrink-0">{sidebar}</aside>}

        <main className={`flex-1 w-full ${fluid ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"}`}>
          {children}
        </main>
      </div>

      {/* Footer */}
      {footer && <div className="shrink-0">{footer}</div>}
    </div>
  );
}

export default AppShell;
