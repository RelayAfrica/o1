import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const helpCategories = [
  {
    icon: "🚀",
    title: "Getting Started",
    description: "Set up your account, install NFC tags, and onboard your first branch.",
    articles: ["Setting up your first branch", "Installing NFC check-in stands", "Inviting staff members", "Connecting your first integration"],
  },
  {
    icon: "📲",
    title: "Customer Check-in",
    description: "Configure check-in flows, QR codes, and customer forms.",
    articles: ["How the NFC check-in works", "Setting up QR code posters", "Building intake forms", "Testing your check-in flow"],
  },
  {
    icon: "📣",
    title: "Campaigns & Messaging",
    description: "Send WhatsApp campaigns, schedule messages, and track performance.",
    articles: ["Creating your first campaign", "Segmenting your customer list", "WhatsApp opt-in setup", "Understanding delivery analytics"],
  },
  {
    icon: "🖥️",
    title: "Staff Dashboard",
    description: "Manage queues, serve customers, and use the staff view effectively.",
    articles: ["Navigating the dashboard", "Calling and serving customers", "Managing multiple queues", "Staff role permissions"],
  },
  {
    icon: "📊",
    title: "Analytics & Reports",
    description: "Understand your performance data and export reports.",
    articles: ["Reading your branch analytics", "Comparing branch performance", "Exporting data to CSV", "Setting up weekly email reports"],
  },
  {
    icon: "💳",
    title: "Billing & Subscriptions",
    description: "Manage your plan, invoices, and payment methods.",
    articles: ["Upgrading your plan", "Understanding your invoice", "Changing payment method", "Cancelling your subscription"],
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");

  const filtered = helpCategories.map((cat) => ({
    ...cat,
    articles: cat.articles.filter((a) =>
      search.length < 2 || a.toLowerCase().includes(search.toLowerCase()) || cat.title.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.articles.length > 0 || search.length < 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
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
              Help Center
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              How can we <span className="text-primary">help?</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find guides, tutorials, and answers to common questions about Relay.
            </p>
            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for guides..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-13 rounded-2xl border border-border bg-card pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-32">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              >
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <h2 className="font-bold text-base mb-1">{cat.title}</h2>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{cat.description}</p>
                <ul className="space-y-2">
                  {cat.articles.map((article) => (
                    <li key={article}>
                      <a
                        href="#"
                        className="text-xs text-foreground/70 hover:text-primary hover:underline flex items-center gap-1.5 transition-colors"
                      >
                        <span className="text-primary text-[10px]">›</span>
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Still need help? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 rounded-2xl border border-dashed border-border p-8 text-center"
          >
            <h3 className="font-semibold text-lg mb-2">Still need help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our support team is available Mon–Fri, 8am–6pm WAT.
            </p>
            <Button asChild className="rounded-full bg-primary px-8 h-11 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
