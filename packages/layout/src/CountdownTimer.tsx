"use client";
import React, { useState, useEffect } from "react";
import { Clock, ShieldCheck } from "lucide-react";

export interface CountdownLabels {
  title?: string;
  badge?: string;
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
  milestone?: string;
  milestoneDetail?: string;
  footerNote?: string;
}

export interface CountdownTimerProps {
  targetDate: string | Date;
  labels?: CountdownLabels;
  progressPercent?: number;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const defaultLabels: CountdownLabels = {
  title: "Ecosystem Readiness · Launch Countdown",
  badge: "Active Prep Phase",
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
  milestone: "Architecture & Verification:",
  milestoneDetail: "Operational",
  footerNote: "Target Launch Horizon",
};

export function CountdownTimer({
  targetDate,
  labels = {},
  progressPercent = 95,
  className = "",
}: CountdownTimerProps) {
  const mergedLabels = { ...defaultLabels, ...labels };
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: mergedLabels.days, value: mounted ? String(timeLeft.days).padStart(2, "0") : "00" },
    { label: mergedLabels.hours, value: mounted ? String(timeLeft.hours).padStart(2, "0") : "00" },
    { label: mergedLabels.minutes, value: mounted ? String(timeLeft.minutes).padStart(2, "0") : "00" },
    { label: mergedLabels.seconds, value: mounted ? String(timeLeft.seconds).padStart(2, "0") : "00" },
  ];

  return (
    <div className={`w-full max-w-3xl mx-auto my-8 ${className}`}>
      {/* Readiness Tag */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#003c2d]/70 uppercase tracking-widest font-semibold">
          <Clock className="w-3.5 h-3.5 text-[#003c2d]" />
          <span>{mergedLabels.title}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#003c2d] bg-[#BCF63C] px-2.5 py-0.5 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-[#003c2d] animate-pulse" />
          <span>{mergedLabels.badge}</span>
        </div>
      </div>

      {/* Countdown Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className="relative bg-white border border-[#E2DDD0] rounded-xl p-4 sm:p-6 text-center shadow-xs hover:border-[#003c2d]/30 transition-all group overflow-hidden"
          >
            {/* Top Accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#003c2d] group-hover:bg-[#BCF63C] transition-colors" />

            <div className="text-3xl sm:text-5xl font-extrabold text-[#003c2d] tracking-tight font-mono mb-1">
              {unit.value}
            </div>
            <div className="text-[11px] sm:text-xs font-mono tracking-widest font-bold text-[#003c2d]/80 uppercase">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar & Milestone Status */}
      <div className="mt-4 p-3.5 bg-white border border-[#E2DDD0] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#003c2d] font-mono font-medium">
          <ShieldCheck className="w-4 h-4 text-[#003c2d] shrink-0" />
          <span>
            {mergedLabels.milestone}{" "}
            <strong className="font-bold">{mergedLabels.milestoneDetail}</strong>
          </span>
        </div>
        <div className="w-full sm:w-48 bg-[#F7F5EC] rounded-full h-2.5 border border-[#E2DDD0] overflow-hidden">
          <div
            className="bg-[#003c2d] h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-[11px] font-mono text-[#5e665d]">{mergedLabels.footerNote}</span>
      </div>
    </div>
  );
}

export default CountdownTimer;
