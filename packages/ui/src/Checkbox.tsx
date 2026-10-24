import React from "react";
import { Check } from "lucide-react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  indeterminate?: boolean;
}

export function Checkbox({
  label,
  description,
  checked,
  indeterminate,
  disabled,
  className = "",
  id,
  onChange,
  ...props
}: CheckboxProps) {
  const generatedId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <label
      htmlFor={generatedId}
      className={`inline-flex items-start gap-2.5 select-none ${
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <div className="relative flex items-center justify-center shrink-0 mt-0.5">
        <input
          type="checkbox"
          id={generatedId}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <div
          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
            checked || indeterminate
              ? "bg-[#003922] border-[#003922] text-[#a7ff6d] shadow-xs"
              : "bg-white border-[#E2DDD0] hover:border-[#003922]"
          }`}
        >
          {checked && <Check className="w-3 h-3 stroke-[3]" />}
          {indeterminate && !checked && (
            <span className="w-2 h-0.5 bg-[#a7ff6d] rounded-full" />
          )}
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span
              className={`text-xs font-semibold leading-tight ${
                checked ? "text-[#003922]" : "text-[#1f2923]"
              }`}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="text-[11px] text-[#5e665d] leading-normal mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}

export default Checkbox;
