import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckCircleIcon } from "lucide-react";
import { useDemoModal } from "@/components/landing/DemoModalContext";

const teamSizes = ["1–3", "4–10", "11–50", "51–200", "200+"];
const industries = ["Banking", "Healthcare", "Government", "Telecom", "Retail", "Restaurant", "University", "Other"];

const contactInfo = [
  { icon: "📧", label: "Email", value: "hello@getrelay.co" },
  { icon: "📱", label: "WhatsApp", value: "+234 800 RELAY 01" },
  { icon: "📍", label: "Address", value: "14 Broad Street, Lagos Island, Lagos, Nigeria" },
  { icon: "🕐", label: "Support hours", value: "Mon–Fri, 8am–6pm WAT" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", industry: "", teamSize: "", message: "" });
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-6">
              Contact
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Talk to our <span className="text-primary">sales team</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Tell us about your organisation and we'll help you find the right plan, arrange a live demo, and get you set up.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-border bg-card p-8"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <CheckCircleIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">We'll be in touch</h2>
                  <p className="text-muted-foreground leading-relaxed max-w-xs">
                    Our team will reach out within one business day to discuss your needs and schedule a demo.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-1">Get in touch</h2>
                  <p className="text-sm text-muted-foreground mb-6">Fill in your details and we'll reach out to schedule a demo.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-name" className="text-sm font-medium">Full name</Label>
                        <Input
                          id="contact-name"
                          type="text"
                          placeholder="James Okafor"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="h-11 rounded-xl border-border bg-background"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-email" className="text-sm font-medium">Work email</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="james@yourbank.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="h-11 rounded-xl border-border bg-background"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-company" className="text-sm font-medium">Organisation</Label>
                      <Input
                        id="contact-company"
                        type="text"
                        placeholder="City National Bank"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="h-11 rounded-xl border-border bg-background"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Industry</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {industries.map((ind) => (
                          <button
                            key={ind}
                            type="button"
                            onClick={() => setForm({ ...form, industry: ind })}
                            className={`h-9 rounded-xl text-xs font-semibold border transition-all ${form.industry === ind ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/50"}`}
                          >
                            {ind}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Number of branches</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {teamSizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setForm({ ...form, teamSize: size })}
                            className={`h-10 rounded-xl text-xs font-semibold border transition-all ${form.teamSize === size ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/50"}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="contact-message" className="text-sm font-medium">Message (optional)</Label>
                      <textarea
                        id="contact-message"
                        rows={3}
                        placeholder="Tell us about your setup or what you'd like to discuss..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
                    >
                      Send message
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">We'll only contact you about your request.</p>
                  </form>
                </>
              )}
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-xl font-bold mb-6">Get in touch directly</h2>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <span className="text-xl mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-sm text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold mb-2">Looking for support?</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  If you're an existing Relay customer looking for help, visit our Help Center for guides and troubleshooting.
                </p>
                <Button asChild variant="outline" className="rounded-full px-5 h-10 text-sm font-semibold">
                  <a href="/help">Visit Help Center →</a>
                </Button>
              </div>

              <div className="rounded-2xl bg-foreground text-background p-6">
                <h3 className="font-bold text-lg mb-2">Trusted by leading organisations</h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["City National Bank", "MedCity Clinics", "GovServe", "TeleLink", "Metro University"].map((co) => (
                    <span key={co} className="text-xs font-medium text-background/60 bg-background/10 px-3 py-1.5 rounded-lg border border-background/15">
                      {co}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="pb-16" />
      <Footer />
    </div>
  );
}
