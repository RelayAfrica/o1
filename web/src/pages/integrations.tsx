import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

const integrationCategories = [
  {
    category: "Messaging & CRM",
    integrations: [
      { name: "WhatsApp Business", description: "Send automated check-in updates, queue alerts, and campaigns directly to WhatsApp.", icon: "💬", status: "Available" },
      { name: "SMS Gateway", description: "Reach customers via SMS when they prefer text over app notifications.", icon: "📱", status: "Available" },
      { name: "Email (SMTP / SendGrid)", description: "Trigger transactional emails and campaign broadcasts automatically.", icon: "📧", status: "Available" },
      { name: "Zoho CRM", description: "Sync customer data, check-in history, and interaction logs with your CRM.", icon: "🔗", status: "Available" },
    ],
  },
  {
    category: "Payments",
    integrations: [
      { name: "Paystack", description: "Accept card and bank transfer payments seamlessly for orders and services.", icon: "💳", status: "Available" },
      { name: "Flutterwave", description: "Process multi-currency payments across Africa and beyond.", icon: "🌍", status: "Available" },
      { name: "Stripe", description: "International card processing for businesses with global customers.", icon: "⚡", status: "Coming soon" },
    ],
  },
  {
    category: "Analytics & Reporting",
    integrations: [
      { name: "Google Analytics", description: "Track digital touchpoints and connect offline queues to online behaviour.", icon: "📊", status: "Available" },
      { name: "Metabase", description: "Build custom dashboards and reports on your Relay data.", icon: "📈", status: "Available" },
      { name: "Power BI", description: "Export operational data to Microsoft Power BI for enterprise-grade analysis.", icon: "🔢", status: "Coming soon" },
    ],
  },
  {
    category: "Productivity & Workflow",
    integrations: [
      { name: "Slack", description: "Get real-time alerts on queue spikes, SLA breaches, and customer escalations.", icon: "⚡", status: "Available" },
      { name: "Microsoft Teams", description: "Surface Relay notifications and reports directly inside Teams channels.", icon: "🟦", status: "Coming soon" },
      { name: "Zapier", description: "Connect Relay to 5,000+ apps without any code.", icon: "⚙️", status: "Coming soon" },
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-6">
              Integrations
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
              Connect Relay to the tools <span className="text-primary">your team already uses</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Relay integrates with messaging platforms, payment processors, CRMs, and analytics tools so your operations stay connected end to end.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="rounded-full bg-primary px-8 h-12 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                <Link href="/signin">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8 h-12 text-sm font-semibold">
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration categories */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="space-y-16">
            {integrationCategories.map((cat, ci) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
              >
                <h2 className="text-xl font-bold mb-6 text-foreground">{cat.category}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {cat.integrations.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{item.icon}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === "Available" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                          {item.status}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-foreground mb-1">{item.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* API callout */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 rounded-3xl bg-foreground text-background p-10 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Need a custom integration?</h2>
            <p className="text-background/70 mb-8 max-w-lg mx-auto">
              Our REST API and webhooks give your team full programmatic access to queues, check-ins, customer records, and campaign triggers.
            </p>
            <Button asChild className="rounded-full bg-primary px-8 h-12 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">Talk to our team</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
