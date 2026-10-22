"use client";
import React, { useState } from "react";
import { Search, X, Loader2 } from "lucide-react";

export type InputVariant = "outlined" | "filled" | "plain" | "tonal";
export type InputDensity = "default" | "comfortable" | "compact";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  rightBadge?: string;
  variant?: InputVariant;
  density?: InputDensity;
  clearable?: boolean;
  onClear?: () => void;
  loading?: boolean;
  counter?: boolean | number;
}

const densityPadding: Record<InputDensity, string> = {
  compact: "py-1 px-2.5 text-xs",
  comfortable: "py-1.5 px-3 text-xs sm:text-sm",
  default: "py-2 px-3.5 text-xs sm:text-sm",
};

const variantBaseStyles: Record<InputVariant, { base: string; normal: string; error: string; success: string }> = {
  outlined: {
    base: "bg-white border rounded-xl focus:ring-1 transition-all",
    normal: "border-[#DDE3D9] focus:border-[#003D28] focus:ring-[#003D28]",
    error: "border-[#B91C1C] focus:border-[#B91C1C] focus:ring-[#B91C1C]",
    success: "border-[#15803D] focus:border-[#15803D] focus:ring-[#15803D]",
  },
  filled: {
    base: "bg-[#F6FFE9] border-b-2 rounded-t-xl focus:ring-0 transition-all",
    normal: "border-[#DDE3D9] focus:border-[#003D28] focus:bg-white",
    error: "border-[#B91C1C] focus:border-[#B91C1C] bg-red-50/50",
    success: "border-[#15803D] focus:border-[#15803D] bg-emerald-50/50",
  },
  tonal: {
    base: "bg-[#003D28]/5 border border-transparent rounded-xl focus:ring-1 transition-all",
    normal: "focus:border-[#003D28] focus:ring-[#003D28] focus:bg-white",
    error: "bg-red-50 border-[#B91C1C] focus:border-[#B91C1C] focus:ring-[#B91C1C]",
    success: "bg-emerald-50 border-[#15803D] focus:border-[#15803D] focus:ring-[#15803D]",
  },
  plain: {
    base: "bg-transparent border-b rounded-none px-0 focus:ring-0 transition-all",
    normal: "border-[#DDE3D9] focus:border-[#003D28]",
    error: "border-[#B91C1C] focus:border-[#B91C1C]",
    success: "border-[#15803D] focus:border-[#15803D]",
  },
};

export function Input({
  label,
  helperText,
  error,
  success,
  leftIcon,
  rightIcon,
  prependIcon,
  appendIcon,
  rightBadge,
  variant = "outlined",
  density = "default",
  clearable = false,
  onClear,
  loading = false,
  counter,
  id,
  className = "",
  disabled,
  value,
  defaultValue,
  onChange,
  ...props
}: InputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const currentVal = value !== undefined ? String(value) : String(internalValue);

  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const leadIcon = prependIcon || leftIcon;
  const trailIcon = appendIcon || rightIcon;

  const styleCfg = variantBaseStyles[variant];
  const stateStyle = error ? styleCfg.error : success ? styleCfg.success : styleCfg.normal;

  const handleClear = () => {
    setInternalValue("");
    if (onClear) onClear();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor={inputId}
            className="block text-xs font-mono font-bold text-[#003D28] uppercase tracking-wider"
          >
            {label}
          </label>
          {counter && (
            <span className="text-[10px] font-mono text-[#687368]">
              {currentVal.length}
              {typeof counter === "number" ? ` / ${counter}` : ""}
            </span>
          )}
        </div>
      )}
      <div className="relative flex items-center">
        {leadIcon && (
          <div className="absolute left-3 text-[#5e665d] pointer-events-none shrink-0">
            {leadIcon}
          </div>
        )}
        <input
          id={inputId}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={`w-full ${styleCfg.base} ${stateStyle} ${densityPadding[density]} text-[#003c2d] placeholder:text-[#5e665d]/60 focus:outline-none ${
            leadIcon ? "pl-9" : ""
          } ${clearable || trailIcon || loading || rightBadge ? "pr-14" : ""} ${
            disabled ? "opacity-50 cursor-not-allowed bg-[#FAF9F5]" : ""
          } ${className}`}
          {...props}
        />

        {/* Right slot: Loader, Clearable, Right Icon, Badge */}
        <div className="absolute right-2.5 flex items-center gap-1.5">
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#003c2d]" />}
          {clearable && currentVal.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-[#5e665d] hover:text-[#003c2d] hover:bg-black/5 cursor-pointer transition-colors"
              aria-label="Clear input"
            >
              <X className="w-3 h-3" />
            </button>
          )}
          {trailIcon && <span className="text-[#5e665d]">{trailIcon}</span>}
          {rightBadge && (
            <span className="font-mono text-[10px] bg-[#F7F5EC] border border-[#E2DDD0] text-[#5e665d] font-bold px-1.5 py-0.5 rounded">
              {rightBadge}
            </span>
          )}
        </div>
      </div>
      {error && <p className="text-[11px] font-mono text-[#ef4444] mt-1">{error}</p>}
      {!error && success && (
        <p className="text-[11px] font-mono text-[#10b981] mt-1">{success}</p>
      )}
      {!error && !success && helperText && (
        <p className="text-[11px] text-[#5e665d] mt-1">{helperText}</p>
      )}
    </div>
  );
}

export interface SearchInputProps extends Omit<InputProps, "leftIcon"> {
  shortcut?: string;
}

export function SearchInput({
  shortcut = "⌘K",
  placeholder = "Search resources, courses, blueprints...",
  ...props
}: SearchInputProps) {
  return (
    <Input
      leftIcon={<Search className="w-4 h-4" />}
      rightBadge={shortcut}
      placeholder={placeholder}
      {...props}
    />
  );
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  variant?: InputVariant;
  counter?: boolean | number;
}

export function Textarea({
  label,
  helperText,
  error,
  success,
  variant = "outlined",
  counter,
  id,
  className = "",
  disabled,
  rows = 4,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const currentVal = value !== undefined ? String(value) : String(internalValue);

  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const styleCfg = variantBaseStyles[variant];
  const stateStyle = error ? styleCfg.error : success ? styleCfg.success : styleCfg.normal;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor={textareaId}
            className="block text-xs font-mono font-bold text-[#003c2d] uppercase tracking-wider"
          >
            {label}
          </label>
          {counter && (
            <span className="text-[10px] font-mono text-[#5e665d]">
              {currentVal.length}
              {typeof counter === "number" ? ` / ${counter}` : ""}
            </span>
          )}
        </div>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={`w-full ${styleCfg.base} ${stateStyle} px-3.5 py-2.5 text-xs sm:text-sm text-[#003c2d] placeholder:text-[#5e665d]/60 focus:outline-none resize-y ${
          disabled ? "opacity-50 cursor-not-allowed bg-[#FAF9F5]" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-[11px] font-mono text-[#ef4444] mt-1">{error}</p>}
      {!error && success && (
        <p className="text-[11px] font-mono text-[#10b981] mt-1">{success}</p>
      )}
      {!error && !success && helperText && (
        <p className="text-[11px] text-[#5e665d] mt-1">{helperText}</p>
      )}
    </div>
  );
}

export default Input;
