import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon, MinusIcon } from "lucide-react";
import { useLocation } from "wouter";
import { useDemoModal } from "@/components/landing/DemoModalContext";
import { BlobTopRight, WavySeparator } from "@/components/landing/FlowingLines";

const DISCOUNT = 0.11;

const plans = [
  {
    name: "Starter",
    badge: null,
    monthlyPrice: 50000,
    sub: "Per Branch",
    description: "Best for single-location businesses just getting started.",
    cta: "Get Started Free",
    highlight: false,
    isCustom: false,
    note: "✔ Free installation & setup included",
    features: {
      "Branches": "1",
      "Service queues": "Up to 3",
      "Daily check-ins": "Unlimited",
      "NFC tags + QR fallbacks": true,
      "Custom customer forms": true,
      "Live staff dashboard": true,
      "Real-time customer notifications": true,
      "Campaign messages/month": "5,000",
      "Multi-channel integrations": false,
      "Advanced analytics & reporting": false,
      "API access": false,
      "Staff roles & permissions": false,
      "Centralized branch management": false,
      "Priority support": false,
      "Dedicated onboarding": false,
    },
  },
  {
    name: "Stellar",
    badge: "⭐ Recommended",
    monthlyPrice: 80000,
    sub: "Per Branch",
    description: "For businesses that want full control, automation, and growth.",
    cta: "Get Started Free",
    highlight: true,
    isCustom: false,
    note: "✔ Free installation & setup included",
    features: {
      "Branches": "1 (scalable)",
      "Service queues": "Unlimited",
      "Daily check-ins": "Unlimited",
      "NFC tags + QR fallbacks": true,
      "Custom customer forms": true,
      "Live staff dashboard": true,
      "Real-time customer notifications": true,
      "Campaign messages/month": "12,000",
      "Multi-channel integrations": true,
      "Advanced analytics & reporting": true,
      "API access": true,
      "Staff roles & permissions": true,
      "Centralized branch management": true,
      "Priority support": true,
      "Dedicated onboarding": false,
    },
  },
  {
    name: "Enterprise",
    badge: null,
    monthlyPrice: null,
    sub: "Custom pricing",
    description: "Built for banks, hospitals, universities, telecoms, and government agencies.",
    cta: "Talk to Sales",
    highlight: false,
    isCustom: true,
    note: null,
    features: {
      "Branches": "Unlimited",
      "Service queues": "Unlimited",
      "Daily check-ins": "Unlimited",
      "NFC tags + QR fallbacks": true,
      "Custom customer forms": true,
      "Live staff dashboard": true,
      "Real-time customer notifications": true,
      "Campaign messages/month": "Custom",
      "Multi-channel integrations": true,
      "Advanced analytics & reporting": true,
      "API access": true,
      "Staff roles & permissions": true,
      "Centralized branch management": true,
      "Priority support": true,
      "Dedicated onboarding": true,
    },
  },
];

const featureRows = [
  "Branches",
  "Service queues",
  "Daily check-ins",
  "NFC tags + QR fallbacks",
  "Custom customer forms",
  "Live staff dashboard",
  "Real-time customer notifications",
  "Campaign messages/month",
  "Multi-channel integrations",
  "Advanced analytics & reporting",
  "API access",
  "Staff roles & permissions",
  "Centralized branch management",
  "Priority support",
  "Dedicated onboarding",
];

function formatNaira(amount: number) {
  return "₦" + amount.toLocaleString("en-NG");
}

export default function PricingPage() {
  const { openDemo } = useDemoModal();
  const [, setLocation] = useLocation();
  const [yearly, setYearly] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <BlobTopRight opacity={0.14} />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-5">Simple, branch-based pricing</h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
              Pay per branch, not per user. Free installation included on every plan.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 bg-muted/50 border border-border rounded-full px-2 py-1.5">
              <button
                onClick={() => setYearly(false)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  !yearly ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  yearly ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly
                <span className="text-[10px] font-semibold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                  Save 11%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {plans.map((plan, i) => {
              const monthly = plan.monthlyPrice ?? 0;
              const discounted = Math.round(monthly * (1 - DISCOUNT));
              const annual = discounted * 12;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                >
                  <div className={`rounded-2xl border p-7 h-full flex flex-col ${plan.highlight ? "border-primary bg-primary/5 shadow-lg" : "border-border bg-card shadow-sm"}`}>
                    {plan.badge && (
                      <span className="inline-block text-xs font-semibold bg-primary text-primary-foreground px-2.5 py-1 rounded-full mb-3 self-start">
                        {plan.badge}
                      </span>
                    )}

                    <div className="mb-5">
                      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">{plan.name}</div>

                      {plan.isCustom ? (
                        <>
                          <div className="text-4xl font-bold text-foreground">Let's Talk</div>
                          <div className="text-xs text-primary font-medium mt-1">{plan.sub}</div>
                        </>
                      ) : (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={yearly ? "yearly" : "monthly"}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.2 }}
                          >
                            {yearly ? (
                              <>
                                <div className="text-[16px] font-bold text-foreground leading-snug">
                                  Installation + first month = ₦0
                                </div>
                                <div className="text-sm font-semibold mt-1.5 text-primary">
                                  Then {formatNaira(discounted)}/month
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {formatNaira(annual)} billed annually · saves {formatNaira(monthly * 12 - annual)}/yr
                                </div>
                                <div className="text-[10px] text-muted-foreground line-through mt-0.5">
                                  was {formatNaira(monthly)} / month
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="text-[16px] font-bold text-foreground leading-snug">
                                  Installation + first month = ₦0
                                </div>
                                <div className="text-sm font-semibold mt-1.5 text-primary">
                                  Then {formatNaira(monthly)}/month
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">{plan.sub}</div>
                              </>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      )}

                      <p className="text-sm text-muted-foreground mt-3">{plan.description}</p>
                    </div>

                    <Button
                      variant={plan.highlight ? "default" : "outline"}
                      className={`w-full rounded-xl font-semibold mb-5 ${plan.highlight ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-border hover:bg-muted/60"}`}
                      onClick={() => plan.isCustom ? openDemo() : setLocation("/signin")}
                      data-testid={`button-pricing-${plan.name.toLowerCase()}`}
                    >
                      {plan.cta}
                    </Button>

                    {plan.note && (
                      <p className="text-xs text-primary font-medium">{plan.note}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-xs text-muted-foreground mt-8"
          >
            All plans include free installation. Annual billing is charged upfront. Cancel anytime before renewal.
          </motion.p>
        </div>
      </section>

      <WavySeparator />

      {/* Feature comparison table */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">Compare plans</h2>
            <p className="text-muted-foreground">See exactly what's included in each plan.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
              <table className="w-full text-sm text-left bg-card">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-5 font-semibold text-foreground w-1/3">Feature</th>
                    {plans.map((p) => (
                      <th key={p.name} className={`px-6 py-5 font-semibold text-center ${p.highlight ? "text-primary" : "text-foreground"}`}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row, i) => (
                    <tr key={row} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                      <td className="px-6 py-4 text-muted-foreground font-medium">{row}</td>
                      {plans.map((p) => {
                        const val = p.features[row as keyof typeof p.features];
                        return (
                          <td key={p.name} className="px-6 py-4 text-center">
                            {typeof val === "boolean" ? (
                              val
                                ? <CheckIcon className="w-4 h-4 text-primary mx-auto" />
                                : <MinusIcon className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                            ) : (
                              <span className="text-foreground font-medium">{val}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-16 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute right-[-5%] top-[-20%] w-[400px] h-[400px] opacity-10 text-primary" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M51.5,-67.2C65.5,-59.1,74.8,-43.3,81.4,-26.5C88,-9.7,91.9,8,86.6,23.1C81.3,38.2,66.8,50.7,51.2,60.8C35.6,70.9,18.9,78.6,1.4,76.8C-16.1,75,-32.2,63.7,-46.8,51.8C-61.4,39.9,-74.5,27.4,-80.2,11.5C-85.9,-4.4,-84.2,-23.7,-74.6,-38.7C-65,-53.7,-47.4,-64.4,-31.2,-71.4C-15,-78.4,3.7,-81.7,20.8,-77.9C37.9,-74.1,37.5,-75.3,51.5,-67.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <h2 className="text-3xl font-bold text-background mb-4">Need a large-scale rollout?</h2>
            <p className="text-background/70 mb-8 max-w-md mx-auto">We work directly with banks, hospital networks, and government bodies on tailored deployments — custom SLAs, phased rollouts, and dedicated integration support.</p>
            <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 h-14" onClick={openDemo} data-testid="button-pricing-enterprise-cta">
              Talk to our team
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
