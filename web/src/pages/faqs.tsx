import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { BlobTopRight, WavySeparator } from "@/components/landing/FlowingLines";

const faqs = [
  {
    q: "Does the customer need to download an app?",
    a: "No. Relay runs entirely in the mobile browser. Customers tap the NFC tag or scan the QR code — a web page opens immediately. No app store, no download.",
  },
  {
    q: "What does hardware setup involve?",
    a: "You receive pre-configured NFC tags to place at your service points — whether that's a bank counter, clinic reception, or a table at your venue. No ticket machines, no installation engineers.",
  },
  {
    q: "Can we manage multiple branches?",
    a: "Yes. Relay is built as a multi-branch platform. You can manage queues, staff, and analytics for every location from a single dashboard.",
  },
  {
    q: "How does Relay work for clubs, bars, and restaurants?",
    a: "Place an NFC tag on each table. When a customer taps it, they see your product menu, select their table number, and place an order directly from their phone. Staff receive the order on the dashboard instantly — no shouting, no waiting at the bar.",
  },
  {
    q: "How do push notifications work without an app?",
    a: "Relay uses Web Push — a browser technology that lets websites send notifications to any device with permission, without a native app. Customers opt in when they check in.",
  },
  {
    q: "Is Relay suitable for enterprise-scale deployments?",
    a: "Yes. Relay is built on a multi-tenant architecture with role-based access control, SSO, and API access for enterprise integrations. Talk to us about large-scale rollouts.",
  },
  {
    q: "Is pricing per user or per branch?",
    a: "Per branch. Your entire team at a branch uses Relay — there's no per-seat charge.",
  },
  {
    q: "Can we start with one branch and expand later?",
    a: "Yes. Many customers start with a single branch pilot and roll out across their network after validating results.",
  },
  {
    q: "What's included in the free installation?",
    a: "A fully configured Relay environment for your branch, NFC tags, onboarding support, and access to all features on your plan. No hidden setup fees.",
  },
  {
    q: "What does the NFC tag cost?",
    a: "NFC tags are included free as part of installation. Additional tags for service counters or tables can be ordered at any time.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes. Annual billing comes with an 11% discount on monthly rates for Starter and Stellar plans. Billed upfront for the full year.",
  },
  {
    q: "What multi-channel integrations are included in Stellar?",
    a: "Stellar includes Email, SMS, WhatsApp, Zoho, and more — giving you full control over how you reach customers.",
  },
];

export default function FaqsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Navbar />

      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <BlobTopRight opacity={0.16} />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently asked questions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Answers to the most common questions about Relay, setup, pricing, and rollout.
            </p>
          </motion.div>
        </div>
      </section>

      <WavySeparator />

      <section className="py-16 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="space-y-5">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <Card className="p-6 border border-border bg-card rounded-xl">
                  <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
