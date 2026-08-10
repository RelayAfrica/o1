import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, Circle } from "lucide-react";
import { useDemoModal } from "@/components/landing/DemoModalContext";
import { useLocation } from "wouter";

const DISCOUNT = 0.11;

const plans = [
  {
    name: "Starter",
    badge: null,
    monthlyPrice: 50000,
    subtext: "Per Branch",
    description: "Best for single-location businesses just getting started.",
    features: [
      "1 branch",
      "Unlimited daily check-ins",
      "Up to 3 service queues",
      "NFC tags + QR fallbacks",
      "Custom customer forms",
      "Live staff dashboard",
      "Real-time customer notifications",
      "5,000 campaign messages/month",
      "Analytics dashboard",
      "Email support",
    ],
    note: "",
    cta: "Get Started Free",
    highlight: false,
    isCustom: false,
  },
  {
    name: "Stellar",
    badge: "⭐ Recommended",
    monthlyPrice: 80000,
    subtext: "Per Branch",
    description: "Full control, automation, and growth across every customer touchpoint.",
    features: [
      "1 branch (scalable across locations)",
      "Unlimited daily check-ins",
      "Unlimited service queues",
      "Centralized branch management",
      "Staff roles & permissions",
      "NFC tags + QR fallbacks",
      "Advanced analytics & reporting",
      "12,000 campaign messages/month",
      "Multi-channel integrations (Email + SMS + WhatsApp + Zoho + more)",
      "API access for external system integrations",
      "Priority support",
    ],
    note: "",
    cta: "Get Started Free",
    highlight: true,
    isCustom: false,
  },
  {
    name: "Enterprise",
    badge: null,
    monthlyPrice: null,
    subtext: "Custom pricing",
    description: "Built for banks, hospitals, universities, telecoms, and government agencies.",
    features: [
      "Unlimited branches",
      "Unlimited staff",
      "Multi-tenant administration",
      "Advanced permissions",
      "Full API & custom integrations",
      "Dedicated infrastructure options",
      "SLA-backed support",
      "White-label deployment (optional)",
      "Custom onboarding + account manager",
    ],
    note: null,
    cta: "Talk to Sales",
    highlight: false,
    isCustom: true,
  },
];

function formatNaira(amount: number) {
  return "₦" + amount.toLocaleString("en-NG");
}

export default function Pricing() {
  const { openDemo } = useDemoModal();
  const [, setLocation] = useLocation();
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24" style={{ background: "hsl(222, 20%, 10%)" }}>
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Get value for your money
          </h2>
          <p className="text-base text-white/50 max-w-xl mx-auto">
            Priced per branch. Your first month is free on any plan.
          </p>
        </motion.div>

        {/* Main layout: sidebar + cards */}
        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto items-start">

          {/* Left sidebar — billing toggle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:w-52 shrink-0"
          >
            <p className="text-white font-bold text-lg mb-5">Choose Plan</p>
            <div className="space-y-4">
              {/* Yearly */}
              <button
                onClick={() => setYearly(true)}
                className="flex items-center gap-3 group w-full text-left"
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${yearly
                      ? "border-primary bg-primary"
                      : "border-white/30 bg-transparent"
                    }`}
                >
                  {yearly && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                </span>
                <span className={`text-sm font-medium transition-colors ${yearly ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                  Yearly billing
                  <span className="ml-2 text-[10px] font-bold bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                    Save 11%
                  </span>
                </span>
              </button>

              {/* Monthly */}
              <button
                onClick={() => setYearly(false)}
                className="flex items-center gap-3 group w-full text-left"
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${!yearly
                      ? "border-primary bg-primary"
                      : "border-white/30 bg-transparent"
                    }`}
                >
                  {!yearly && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                </span>
                <span className={`text-sm font-medium transition-colors ${!yearly ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                  Monthly billing
                </span>
              </button>
            </div>

            {/* Footnote */}
            <p className="text-white/30 text-[11px] leading-relaxed mt-8">
              All plans include a free first month and free installation. Annual billing is charged upfront. Cancel anytime before renewal.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="flex-1 grid md:grid-cols-3 gap-5 items-start">
            {plans.map((plan, i) => {
              const monthly = plan.monthlyPrice ?? 0;
              const discounted = Math.round(monthly * (1 - DISCOUNT));
              const annual = discounted * 12;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className={plan.highlight ? "-mt-4 z-10" : ""}
                >
                  <div
                    className={`rounded-2xl p-6 flex flex-col h-full ${plan.highlight
                        ? "bg-white text-gray-900 shadow-2xl shadow-black/40"
                        : "bg-white/5 border border-white/10 text-white"
                      }`}
                  >
                    {/* Plan name + badge */}
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className={`text-xl font-bold ${plan.highlight ? "text-primary" : "text-white"
                          }`}
                      >
                        {plan.name}
                      </h3>
                      {plan.badge && (
                        <span className="text-[10px] font-bold bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className={`text-xs mb-4 leading-relaxed ${plan.highlight ? "text-gray-500" : "text-white/50"}`}>
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-1">
                      {plan.isCustom ? (
                        <div className={`text-3xl font-extrabold ${plan.highlight ? "text-gray-900" : "text-white"}`}>
                          Let's Talk
                        </div>
                      ) : (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={yearly ? "yearly" : "monthly"}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className={`text-[15px] font-semibold leading-snug ${plan.highlight ? "text-gray-900" : "text-white"}`}>
                              Installation + first month = ₦0
                            </div>
                            <div className={`text-[15px] mt-1.5 font-extrabold ${plan.highlight ? "text-primary" : "text-green-400"}`}>
                              Then {formatNaira(yearly ? discounted : monthly)}/month
                            </div>
                            {yearly && (
                              <p className={`text-[11px] mt-0.5 ${plan.highlight ? "text-primary font-medium" : "text-primary/80"}`}>
                                {formatNaira(annual)} billed annually
                              </p>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      )}
                      <p className={`text-[11px] mt-1 ${plan.highlight ? "text-gray-400" : "text-white/40"}`}>
                        {plan.subtext}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className={`my-4 border-t ${plan.highlight ? "border-gray-200" : "border-white/10"}`} />

                    {/* Features */}
                    <ul className="space-y-2.5 flex-1 mb-6">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-[13px]">
                          <CheckIcon
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.highlight ? "text-primary" : "text-primary/80"
                              }`}
                          />
                          <span className={plan.highlight ? "text-gray-700" : "text-white/75"}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Note */}
                    {plan.note && (
                      <p className={`text-[11px] mb-4 font-medium ${plan.highlight ? "text-primary" : "text-primary/80"}`}>
                        {plan.note}
                      </p>
                    )}

                    {/* CTA button */}
                    <button
                      onClick={() => (plan.isCustom ? openDemo() : setLocation("/signin"))}
                      data-testid={`button-pricing-${plan.name.toLowerCase()}`}
                      className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${plan.highlight
                          ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30"
                          : "border border-white/20 text-white hover:bg-white/10"
                        }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
