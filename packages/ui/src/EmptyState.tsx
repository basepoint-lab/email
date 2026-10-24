import React from "react";
import { Inbox } from "lucide-react";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`bg-white border border-[#E2DDD0] border-dashed rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-[#f6ffe8] border border-[#E2DDD0] flex items-center justify-center text-[#003922] mb-3">
        {icon || <Inbox className="w-6 h-6 text-[#5e665d]" />}
      </div>
      <h4 className="text-sm font-extrabold text-[#003922] mb-1">{title}</h4>
      <p className="text-xs text-[#5e665d] max-w-sm mb-4 leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

export default EmptyState;
