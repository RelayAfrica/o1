import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckCircleIcon } from "lucide-react";

const benefits = [
  { icon: "💰", title: "Revenue share", body: "Earn 20% recurring commission for every business you refer that stays on Relay." },
  { icon: "🤝", title: "Co-selling support", body: "Our sales team joins your demos and helps close deals in complex enterprise environments." },
  { icon: "📚", title: "Partner resources", body: "Access training materials, pitch decks, pricing sheets, and co-branded collateral." },
  { icon: "🏆", title: "Partner tier recognition", body: "Earn Silver, Gold, and Platinum status with increasing benefits as you grow with us." },
];

const partnerTypes = [
  { label: "Reseller", description: "Sell Relay plans under your own brand or as part of a bundled offering." },
  { label: "Referral partner", description: "Refer clients and earn commissions without managing the relationship." },
  { label: "Systems integrator", description: "Help enterprises integrate Relay with their existing infrastructure and software." },
  { label: "Technology partner", description: "Build integrations or co-develop features on top of the Relay API." },
];

export default function PartnersPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", partnerType: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) return;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-6">
              Partner Program
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Grow your business with <span className="text-primary">Relay</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Join our partner network and earn recurring revenue by helping businesses improve their customer operations.
            </p>
            <Button
              onClick={() => document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full bg-primary px-8 h-12 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Apply to Partner Program
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Why partner with Relay?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="text-3xl mb-3 block">{b.icon}</span>
                <h3 className="font-semibold mb-1.5">{b.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner types */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Partnership types</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {partnerTypes.map((pt, i) => (
              <motion.div
                key={pt.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 flex gap-4 items-start"
              >
                <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                <div>
                  <h3 className="font-semibold mb-1">{pt.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pt.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="partner-form" className="py-16 pb-32">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border bg-card p-10"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-6">
                  <CheckCircleIcon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Application received!</h2>
                <p className="text-muted-foreground leading-relaxed max-w-xs">
                  Our partnerships team will review your application and be in touch within 2–3 business days.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-1">Apply to become a partner</h2>
                <p className="text-sm text-muted-foreground mb-6">Tell us about your business and how you'd like to partner with us.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="partner-name" className="text-sm font-medium">Full name</Label>
                      <Input id="partner-name" type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-11 rounded-xl" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="partner-email" className="text-sm font-medium">Email</Label>
                      <Input id="partner-email" type="email" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-11 rounded-xl" required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="partner-company" className="text-sm font-medium">Company</Label>
                    <Input id="partner-company" type="text" placeholder="Your company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="h-11 rounded-xl" required />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Partnership type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {partnerTypes.map((pt) => (
                        <button
                          key={pt.label}
                          type="button"
                          onClick={() => setForm({ ...form, partnerType: pt.label })}
                          className={`h-10 rounded-xl text-xs font-semibold border transition-all ${form.partnerType === pt.label ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/50"}`}
                        >
                          {pt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="partner-message" className="text-sm font-medium">Tell us about your business</Label>
                    <textarea
                      id="partner-message"
                      rows={4}
                      placeholder="Describe your business, your clients, and how you'd like to work with Relay..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base">
                    Submit application
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
