import React from "react";
import { ArrowUpRight, Lock, ExternalLink } from "lucide-react";

export interface ToolItemData {
  id: string;
  name: string;
  subdomain: string;
  url: string;
  description: string;
  category: string;
  categoryLabel?: string;
  badge?: string;
  icon?: React.ReactNode;
  minRole?: string;
  targetAccount?: string;
}

export interface ToolCardProps {
  tool: ToolItemData;
  isRestricted?: boolean;
  userRoles?: string[];
  isSuperAdmin?: boolean;
  className?: string;
}

export function ToolCard({
  tool,
  isRestricted,
  userRoles = [],
  isSuperAdmin = false,
  className = "",
}: ToolCardProps) {
  const restricted =
    isRestricted !== undefined
      ? isRestricted
      : Boolean(
          tool.minRole &&
            !isSuperAdmin &&
            !userRoles.includes(tool.minRole) &&
            !userRoles.includes("super_admin")
        );
  return (
    <div
      className={`group flex flex-col justify-between h-full bg-white border border-[#E2DDD0] rounded-xl p-5 relative overflow-hidden transition-all duration-200 hover:border-[#003922] hover:-translate-y-0.5 hover:shadow-md ${className}`}
    >
      {/* Top Accent Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#003922] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Header row: Icon + Badges */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#f6ffe8] border border-[#E2DDD0] flex items-center justify-center text-[#003922] group-hover:bg-[#003922] group-hover:text-[#a7ff6d] transition-colors shrink-0">
            {tool.icon || <ExternalLink className="w-5 h-5" />}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {tool.badge && (
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold bg-[#a7ff6d] text-[#003922] py-0.5 px-2 rounded">
                {tool.badge}
              </span>
            )}
            {tool.categoryLabel && (
              <span className="font-mono text-[10px] uppercase tracking-wider font-medium bg-[#f6ffe8] border border-[#E2DDD0] text-[#5e665d] py-0.5 px-2 rounded">
                {tool.categoryLabel}
              </span>
            )}
          </div>
        </div>

        {/* Title & Subdomain */}
        <div className="mb-2">
          <h3 className="text-base font-bold text-[#003922] group-hover:text-black transition-colors flex items-center gap-1.5">
            {tool.name}
            {restricted && (
              <span title="Restricted Role Required" className="inline-flex items-center">
                <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              </span>
            )}
          </h3>
          <p className="font-mono text-xs text-[#5e665d] mt-0.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>{tool.subdomain}</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-[#5e665d] leading-relaxed line-clamp-3 mb-6">
          {tool.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#E2DDD0] flex items-center justify-between mt-auto">
        <span className="text-[11px] font-mono text-[#5e665d]">
          {tool.targetAccount ? `Account: ${tool.targetAccount}` : "Global Ecosystem"}
        </span>

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f6ffe8] hover:bg-[#003922] text-[#003922] hover:text-[#a7ff6d] text-xs font-mono font-semibold transition-all group-hover:shadow-xs"
        >
          <span>Launch</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

export default ToolCard;
