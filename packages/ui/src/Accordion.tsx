"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItemData {
  id?: string;
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  className = "",
}: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>(() => {
    const defaultOpen = items
      .map((item, idx) => (item.defaultOpen ? idx : -1))
      .filter((idx) => idx !== -1);
    return defaultOpen.length > 0 ? defaultOpen : [0];
  });

  const toggleIndex = (idx: number) => {
    if (allowMultiple) {
      if (openIndices.includes(idx)) {
        setOpenIndices(openIndices.filter((i) => i !== idx));
      } else {
        setOpenIndices([...openIndices, idx]);
      }
    } else {
      setOpenIndices(openIndices.includes(idx) ? [] : [idx]);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <div
            key={item.id || idx}
            className="bg-white border border-[#E2DDD0] rounded-2xl overflow-hidden transition-all shadow-2xs hover:border-[#003c2d]/40"
          >
            <button
              type="button"
              onClick={() => toggleIndex(idx)}
              aria-expanded={isOpen}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-mono text-xs sm:text-sm font-bold text-[#003c2d] hover:bg-[#FAF9F5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span>{item.title}</span>
                {item.badge && <span className="shrink-0">{item.badge}</span>}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#003c2d] transition-transform duration-200 shrink-0 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5e665d] leading-relaxed border-t border-[#E2DDD0]/50 font-sans">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
