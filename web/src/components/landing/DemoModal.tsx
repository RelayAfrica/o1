import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const teamSizes = ["1–3", "4–10", "11–50", "51–200", "200+"];
const industries = ["Banking", "Healthcare", "Government", "Telecom", "Retail", "University", "Other"];

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DemoModal({ open, onClose }: DemoModalProps) {
  const [form, setForm] = useState({ name: "", email: "", company: "", industry: "", teamSize: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.industry) return;
    setSubmitted(true);
  }

  function handleClose() {
    onClose();
    setTimeout(() => setSubmitted(false), 400);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-card shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Relay" className="h-7 w-auto" />
              </div>
              <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted/60 transition-colors text-muted-foreground" data-testid="button-modal-close">
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="flex flex-col items-center justify-center h-full text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-6">
                      <CheckCircleIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">Demo request received</h2>
                    <p className="text-muted-foreground leading-relaxed max-w-xs">
                      Our team will reach out within one business day to schedule your personalised demo of Relay.
                    </p>
                    <Button className="mt-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-semibold" onClick={handleClose} data-testid="button-modal-done">
                      Done
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Get Started Free</h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
                      See Relay in action. We'll walk you through a live demonstration tailored to your industry and branch setup.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="modal-name" className="text-sm font-medium text-foreground">Full name</Label>
                        <Input id="modal-name" type="text" placeholder="James Okafor" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-11 rounded-xl border-border bg-background" data-testid="input-modal-name" />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="modal-email" className="text-sm font-medium text-foreground">Email</Label>
                        <Input id="modal-email" type="email" placeholder="james@yourbank.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-11 rounded-xl border-border bg-background" data-testid="input-modal-email" />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="modal-company" className="text-sm font-medium text-foreground">Organisation</Label>
                        <Input id="modal-company" type="text" placeholder="City National Bank" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="h-11 rounded-xl border-border bg-background" data-testid="input-modal-company" />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">Industry</Label>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {industries.map((ind) => (
                            <button key={ind} type="button" onClick={() => setForm({ ...form, industry: ind })}
                              className={`h-9 rounded-xl text-xs font-semibold border transition-all ${form.industry === ind ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/50"}`}
                              data-testid={`button-modal-industry-${ind.toLowerCase()}`}
                            >{ind}</button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">Number of branches / locations</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {teamSizes.map((size) => (
                            <button key={size} type="button" onClick={() => setForm({ ...form, teamSize: size })}
                              className={`h-10 rounded-xl text-xs font-semibold border transition-all ${form.teamSize === size ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/50"}`}
                              data-testid={`button-modal-size-${size}`}
                            >{size}</button>
                          ))}
                        </div>
                      </div>

                      <Button type="submit" className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base mt-2" data-testid="button-modal-submit">
                        Request my demo
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">We'll only contact you about your demo request.</p>
                    </form>

                    <div className="mt-10 pt-8 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Trusted by</p>
                      <div className="flex flex-wrap gap-3">
                        {["City National Bank", "MedCity Clinics", "GovServe", "TeleLink", "Metro University"].map((co) => (
                          <span key={co} className="text-xs font-medium text-foreground/60 bg-muted/60 px-3 py-1.5 rounded-lg border border-border">{co}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
