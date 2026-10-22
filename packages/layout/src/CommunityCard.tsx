import React from "react";
import { ArrowUpRight, Users, Zap, ShieldCheck } from "lucide-react";

export interface CommunityCardProps {
  badge?: string;
  title: string;
  subtitle: string;
  joinUrl: string;
  buttonText?: string;
  memberCountText?: string;
  liveUpdateText?: string;
  securityText?: string;
  className?: string;
}

export function CommunityCard({
  badge = "COMMUNAUTÉ OFFICIELLE",
  title = "Rejoignez le Hub WhatsApp & Écosystème VIP",
  subtitle = "Accédez aux coulisses de nos lancements, aux opportunités de co-fondation, et échangez en direct avec nos bâtisseurs.",
  joinUrl,
  buttonText = "Rejoindre le Cercle WhatsApp",
  memberCountText = "Bâtisseurs & Fondateurs Qualifiés",
  liveUpdateText = "Discussions & Lancements en Direct",
  securityText = "Accès Sécurisé · Intégration Instantanée",
  className = "",
}: CommunityCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00271d] via-[#003c2d] to-[#044c3b] border-2 border-[#BCF63C]/30 p-6 sm:p-8 lg:p-10 text-white shadow-xl flex flex-col justify-between ${className}`}
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/15 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-52 h-52 bg-[#BCF63C]/10 blur-[60px] rounded-full pointer-events-none" />

      {/* Top Content */}
      <div className="relative z-10 mb-8">
        {badge && (
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#BCF63C] bg-white/10 border border-white/15 px-3 py-1 rounded-full inline-block mb-3">
            {badge}
          </span>
        )}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-white/80 mt-3 leading-relaxed">
          {subtitle}
        </p>

        {/* Benefits Chips */}
        <div className="flex flex-wrap gap-2.5 mt-6 text-xs font-mono text-white/90">
          {memberCountText && (
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Users className="w-3.5 h-3.5 text-[#BCF63C] shrink-0" />
              <span>{memberCountText}</span>
            </div>
          )}
          {liveUpdateText && (
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Zap className="w-3.5 h-3.5 text-[#BCF63C] shrink-0" />
              <span>{liveUpdateText}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col gap-3">
        <a
          href={joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-[#00271d] font-mono text-xs sm:text-sm uppercase tracking-wider font-extrabold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2.5 group cursor-pointer"
        >
          <span>{buttonText}</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        {securityText && (
          <div className="flex items-center justify-center gap-1.5 text-center text-[11px] font-mono text-white/70">
            <ShieldCheck className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
            <span>{securityText}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunityCard;
