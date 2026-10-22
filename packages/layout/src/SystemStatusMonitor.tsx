"use client";
import React, { useState } from "react";
import { Terminal, RefreshCw } from "lucide-react";

export interface SystemModuleStatus {
  code: string;
  name: string;
  status: string;
  badge?: string;
  isHealthy?: boolean;
}

export interface SystemStatusMonitorProps {
  title?: string;
  endpoint?: string;
  modules?: SystemModuleStatus[];
  onRefresh?: () => void | Promise<void>;
  slaText?: string;
  nominalText?: string;
  className?: string;
}

const defaultModules: SystemModuleStatus[] = [
  { code: "AUTH-01", name: "SSO & Identity Provider (one.basepoint.ma)", status: "OPERATIONAL", badge: "99.98% UPTIME", isHealthy: true },
  { code: "API-02", name: "Hub Gateway & Router (api.basepoint.ma)", status: "OPERATIONAL", badge: "22ms LATENCY", isHealthy: true },
  { code: "DATA-03", name: "PostgreSQL & Vector Store (Supabase Cluster)", status: "OPERATIONAL", badge: "MULTI-REGION", isHealthy: true },
  { code: "APPS-04", name: "Portal & Venture Studio (portal.basepoint.ma)", status: "OPERATIONAL", badge: "READY", isHealthy: true },
];

export function SystemStatusMonitor({
  title = "basepoint-ecosystem://status-monitor.live",
  modules = defaultModules,
  onRefresh,
  slaText = "Target SLA: 99.9% High Availability",
  nominalText = "All Core Ecosystem Services Nominal",
  className = "",
}: SystemStatusMonitorProps) {
  const [checking, setChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState<string>("Verified Just Now");

  const handleRefresh = async () => {
    setChecking(true);
    if (onRefresh) {
      await onRefresh();
    } else {
      await new Promise((res) => setTimeout(res, 500));
    }
    setLastCheck("Verified Just Now");
    setChecking(false);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto my-10 px-4 ${className}`}>
      <div className="bg-[#00271d] text-white border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden relative">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#BCF63C]">
              <Terminal className="w-3.5 h-3.5" />
              <span>{title}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-white/60 hidden sm:inline">{lastCheck}</span>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={checking}
              aria-label="Refresh system status"
              className="p-1.5 hover:bg-white/10 rounded transition-colors text-white/80 hover:text-white cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checking ? "animate-spin text-[#BCF63C]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-3 font-mono text-xs">
          {modules.map((m) => (
            <div
              key={m.code}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors gap-2"
            >
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-[#BCF63C] text-[#003c2d] font-bold text-[10px]">
                  {m.code}
                </span>
                <span className="text-white/90 font-medium">{m.name}</span>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-[11px] text-[#BCF63C] font-semibold">{m.status}</span>
                {m.badge && (
                  <span className="px-2 py-0.5 rounded border border-white/20 text-[10px] text-white/70">
                    {m.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/60 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#BCF63C] animate-pulse" />
            <span>{nominalText}</span>
          </div>
          <span className="text-[#BCF63C]">{slaText}</span>
        </div>
      </div>
    </div>
  );
}

export default SystemStatusMonitor;
