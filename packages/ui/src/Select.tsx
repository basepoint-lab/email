import React from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
  icon?: React.ReactNode;
}

export function Select({
  label,
  error,
  helperText,
  options = [],
  icon,
  className = "",
  children,
  disabled,
  id,
  ...props
}: SelectProps) {
  const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={generatedId}
          className="block text-xs font-mono font-bold text-[#003922] uppercase tracking-wider mb-1.5"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#5e665d]">
            {icon}
          </div>
        )}

        <select
          id={generatedId}
          disabled={disabled}
          className={`w-full appearance-none rounded-xl border bg-white text-xs font-medium text-[#003922] py-2.5 transition-all shadow-xs focus:outline-none ${
            icon ? "pl-9" : "pl-3.5"
          } pr-9 ${
            error
              ? "border-[#ef4444] focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444]"
              : "border-[#E2DDD0] hover:border-[#003922] focus:border-[#003922] focus:ring-1 focus:ring-[#003922]"
          } ${disabled ? "bg-[#FAF9F5] opacity-60 cursor-not-allowed" : "cursor-pointer"} ${className}`}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#5e665d]">
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>

      {error && (
        <p className="mt-1 text-[11px] font-mono text-[#ef4444]">{error}</p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-[11px] font-mono text-[#5e665d]">{helperText}</p>
      )}
    </div>
  );
}

export default Select;
