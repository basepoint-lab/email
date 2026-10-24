import React from "react";

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: "pills" | "underline";
  className?: string;
}

export function Tabs({
  items,
  activeId,
  onChange,
  variant = "pills",
  className = "",
}: TabsProps) {
  if (variant === "underline") {
    return (
      <div className={`border-b border-[#E2DDD0] flex gap-6 ${className}`}>
        {items.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`pb-3 font-mono text-xs font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "text-[#003922]"
                  : "text-[#5e665d] hover:text-[#003922]"
              }`}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-[#a7ff6d] text-[#003922]"
                      : "bg-[#f6ffe8] text-[#5e665d]"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003922]" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex p-1 rounded-xl bg-[#FAF9F5] border border-[#E2DDD0] gap-1 ${className}`}
    >
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isActive
                ? "bg-[#003922] text-[#a7ff6d] shadow-xs"
                : "text-[#5e665d] hover:text-[#003922] hover:bg-white/50"
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isActive
                    ? "bg-[#a7ff6d] text-[#003922]"
                    : "bg-[#f6ffe8] text-[#5e665d]"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
