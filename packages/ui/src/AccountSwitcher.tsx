"use client";
import React, { useState } from "react";
import { Building2, ChevronDown, Check } from "lucide-react";

export interface WorkspaceAccountItem {
  id: string;
  name: string;
  code: string;
  type?: "root" | "tenant" | "client" | "organization" | string;
  description?: string;
}

export interface AccountSwitcherProps {
  currentAccount: WorkspaceAccountItem;
  accounts?: WorkspaceAccountItem[];
  onSelectAccount: (account: WorkspaceAccountItem) => void;
  label?: string;
  className?: string;
}

export function AccountSwitcher({
  currentAccount,
  accounts = [],
  onSelectAccount,
  label = "Target Workspace / Account",
  className = "",
}: AccountSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-white border border-[#E2DDD0] rounded-lg text-xs font-mono text-[#003c2d] hover:border-[#003c2d] transition-colors shadow-xs cursor-pointer"
      >
        <Building2 className="w-4 h-4 text-[#003c2d] shrink-0" />
        <div className="text-left">
          <span className="block font-bold">{currentAccount.name}</span>
          <span className="block text-[10px] text-[#5e665d]">{currentAccount.code}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-[#5e665d] ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            role="listbox"
            className="absolute left-0 mt-2 w-72 bg-white border border-[#E2DDD0] rounded-xl shadow-xl z-50 p-2 divide-y divide-[#E2DDD0] animate-in fade-in zoom-in-95 duration-100"
          >
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#5e665d]">
              {label}
            </div>
            <div className="py-1 space-y-1 max-h-64 overflow-y-auto">
              {accounts.map((acc) => {
                const isSelected = acc.id === currentAccount.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelectAccount(acc);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#003c2d] text-[#F7F5EC]"
                        : "hover:bg-[#F7F5EC] text-[#003c2d]"
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        {acc.name}
                        {acc.type === "root" && (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                              isSelected
                                ? "bg-[#BCF63C] text-[#003c2d]"
                                : "bg-[#003c2d] text-white"
                            }`}
                          >
                            ROOT
                          </span>
                        )}
                      </div>
                      {acc.description && (
                        <div
                          className={`text-[10px] font-mono mt-0.5 ${
                            isSelected ? "text-white/70" : "text-[#5e665d]"
                          }`}
                        >
                          {acc.description}
                        </div>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#BCF63C] shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AccountSwitcher;
