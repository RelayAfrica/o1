import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            Company
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Building better customer operations for modern service teams.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Relay helps businesses turn every interaction into a smoother, more reliable experience for staff and customers alike.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Link href="/signin">Get Started</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6 py-2.5 text-sm font-semibold">
              <Link href="/pricing">Explore Plans</Link>
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h2 className="mb-2 text-lg font-semibold">Why Relay</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              We focus on practical tools that reduce friction in busy environments and improve the customer experience without adding complexity.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h2 className="mb-2 text-lg font-semibold">Built for real teams</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              From retail branches to hospitals and service desks, Relay supports teams that need clarity, speed, and consistency every day.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
