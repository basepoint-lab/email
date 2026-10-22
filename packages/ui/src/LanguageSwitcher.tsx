import React from "react";
import { Globe } from "lucide-react";

export interface LanguageOption {
  code: string;
  label: string;
  ariaLabel?: string;
}

export interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (code: string) => void;
  languages?: LanguageOption[];
  className?: string;
}

const defaultLanguages: LanguageOption[] = [
  { code: "fr", label: "FR", ariaLabel: "Passer en Français" },
  { code: "en", label: "EN", ariaLabel: "Switch to English" },
];

export function LanguageSwitcher({
  currentLanguage,
  onLanguageChange,
  languages = defaultLanguages,
  className = "",
}: LanguageSwitcherProps) {
  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-lg bg-white border border-[#E2DDD0] shadow-xs ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-[#5e665d] ml-1.5 mr-0.5 shrink-0" />
      {languages.map((lang, index) => {
        const isActive = lang.code.toLowerCase() === currentLanguage.toLowerCase();
        return (
          <React.Fragment key={lang.code}>
            {index > 0 && <span className="text-[#E2DDD0] text-xs select-none">|</span>}
            <button
              type="button"
              onClick={() => onLanguageChange(lang.code)}
              aria-label={lang.ariaLabel || `Switch to ${lang.label}`}
              className={`px-2 py-1 text-xs font-mono font-bold rounded transition-all cursor-pointer ${
                isActive
                  ? "bg-[#003c2d] text-[#BCF63C] shadow-xs"
                  : "text-[#5e665d] hover:text-[#003c2d]"
              }`}
            >
              {lang.label}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
