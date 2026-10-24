import React from "react";
import { Check, Sparkles } from "lucide-react";
import { Container } from "./Container";

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billingPeriod?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface PricingSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  plans: PricingPlan[];
  onSelectPlan?: (planId: string) => void;
  className?: string;
}

export function PricingCard({
  plan,
  onSelect,
  className = "",
}: {
  plan: PricingPlan;
  onSelect?: (planId: string) => void;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl p-6 sm:p-8 transition-all flex flex-col justify-between ${
        plan.isPopular
          ? "bg-[#002516] text-white border-2 border-[#a7ff6d] shadow-2xl scale-[1.02]"
          : "bg-white text-[#003922] border border-[#E2DDD0] shadow-2xs hover:border-[#003922]"
      } ${className}`}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#a7ff6d] text-[#003922] shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>{plan.badge || "RECOMMENDED"}</span>
          </span>
        </div>
      )}

      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">{plan.name}</h3>
            <p className={`text-xs mt-1 leading-relaxed ${plan.isPopular ? "text-white/70" : "text-[#5e665d]"}`}>
              {plan.description}
            </p>
          </div>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-1 my-6">
          <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight">{plan.price}</span>
          {plan.billingPeriod && (
            <span className={`text-xs font-mono ${plan.isPopular ? "text-white/60" : "text-[#5e665d]"}`}>
              {plan.billingPeriod}
            </span>
          )}
        </div>

        {/* Feature List */}
        <ul className="space-y-3 my-6 text-xs">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  plan.isPopular ? "bg-[#a7ff6d] text-[#003922]" : "bg-[#003922] text-[#a7ff6d]"
                }`}
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span className={plan.isPopular ? "text-white/90" : "text-[#2e3d36]"}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action CTA */}
      <div className="pt-6 border-t border-[#E2DDD0]/30 mt-6">
        <button
          type="button"
          onClick={() => onSelect?.(plan.id)}
          className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            plan.isPopular
              ? "bg-[#a7ff6d] hover:bg-[#8ef74e] text-[#003922] shadow-md hover:shadow-lg"
              : "bg-[#003922] hover:bg-black text-[#f6ffe8] shadow-xs hover:shadow-md"
          }`}
        >
          {plan.ctaText || "Select Plan"}
        </button>
      </div>
    </div>
  );
}

export function PricingSection({
  badge = "MEMBERSHIP & PRICING",
  title = "Flexible tiers designed for builders at every stage",
  subtitle = "Transparent plans with full access to our sprint frameworks, knowledge vault, and community.",
  plans,
  onSelectPlan,
  className = "",
}: PricingSectionProps) {
  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <Container size="xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          {badge && (
            <div className="inline-block mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#003922] text-[#a7ff6d]">
                {badge}
              </span>
            </div>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#003922]">
              {title}
            </h2>
          )}
          {subtitle && <p className="text-xs sm:text-sm text-[#5e665d] mt-3 leading-relaxed">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PricingSection;
