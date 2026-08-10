import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Link } from "wouter";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

interface SolutionPageProps {
  industry: string;
  tagline: string;
  description: string;
  heroStat: string;
  heroStatLabel: string;
  challenges: { title: string; body: string }[];
  features: { icon: string; title: string; body: string }[];
  quote: string;
  quoteAuthor: string;
  quoteCompany: string;
  accentColor: string;
  /** Optional storefront preview section injected between Features and Quote */
  storefrontPreview?: ReactNode;
}

export function SolutionTemplate({
  industry,
  tagline,
  description,
  heroStat,
  heroStatLabel,
  challenges,
  features,
  quote,
  quoteAuthor,
  quoteCompany,
  storefrontPreview,
}: SolutionPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-6">
                {industry}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
                {tagline}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-primary px-8 h-12 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  <Link href="/signin">Get Started Free</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-8 h-12 text-sm font-semibold">
                  <Link href="/contact">Talk to Sales</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center"
            >
              <div className="rounded-3xl bg-foreground text-background p-12 text-center w-64 h-64 flex flex-col items-center justify-center shadow-2xl">
                <div className="text-5xl font-extrabold text-primary mb-2">{heroStat}</div>
                <div className="text-sm text-background/70 leading-snug max-w-[160px]">{heroStatLabel}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Common challenges we solve</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {challenges.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-semibold text-base mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            How Relay helps <span className="text-primary">{industry.toLowerCase()}</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Storefront Preview (optional) */}
      {storefrontPreview}

      {/* Quote */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-foreground text-background p-12"
          >
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 text-background/90">
              "{quote}"
            </blockquote>
            <div className="text-sm text-background/60">
              <span className="font-semibold text-background/80">{quoteAuthor}</span>
              {" — "}{quoteCompany}
            </div>
            <div className="mt-8">
              <Button asChild className="rounded-full bg-primary px-8 h-11 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                <Link href="/signin">Get Started Free</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
