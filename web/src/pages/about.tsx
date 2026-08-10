import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Adewale Okon",
    role: "Co-founder & CEO",
    bio: "Former Head of Operations at a leading Nigerian fintech. Built Relay after seeing first-hand how broken queue management is across African service industries.",
    emoji: "👨🏾‍💼",
  },
  {
    name: "Chidinma Eze",
    role: "Co-founder & CTO",
    bio: "Full-stack engineer with 8 years building real-time systems. Previously led platform engineering at a Series B healthtech startup.",
    emoji: "👩🏾‍💻",
  },
  {
    name: "Femi Adebayo",
    role: "Head of Product",
    bio: "Product designer and strategist who's shipped experiences used by millions. Passionate about making enterprise tools feel consumer-grade.",
    emoji: "🧑🏾‍🎨",
  },
  {
    name: "Ngozi Okafor",
    role: "Head of Growth",
    bio: "Growth marketing lead with deep roots in B2B SaaS across West Africa. Loves turning complex products into stories anyone can understand.",
    emoji: "👩🏾‍💼",
  },
];

const values = [
  {
    icon: "⚡",
    title: "Speed matters",
    body: "Every second a customer waits is a second of goodwill lost. We obsess over removing friction from service.",
  },
  {
    icon: "🛠️",
    title: "Built for real teams",
    body: "We don't build for ideal conditions. We build for understaffed counters, spotty networks, and chaotic peak hours.",
  },
  {
    icon: "🌍",
    title: "Africa-first",
    body: "Our pricing, integrations, and infrastructure are built around the realities of operating in emerging markets.",
  },
  {
    icon: "🔒",
    title: "Privacy by design",
    body: "Customer data is handled with care. We never sell it, never share it, and give businesses full control over what they capture.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-6">
              About Us
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              We're building the future of <span className="text-primary">customer operations</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              Relay started with a simple observation: queues are broken everywhere. Banks, clinics, restaurants, government offices — the experience of waiting for service hasn't changed in decades. We're changing that.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="rounded-full bg-primary px-8 h-12 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                <Link href="/signin">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8 h-12 text-sm font-semibold">
                <Link href="/careers">We're Hiring →</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              To make every service interaction — from a teller window to a restaurant table — faster, calmer, and more dignified for both customers and the staff who serve them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">What drives us</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 flex gap-4"
              >
                <span className="text-3xl shrink-0">{v.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1.5">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">The team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="font-semibold text-sm mb-0.5">{member.name}</h3>
                <p className="text-xs text-primary font-medium mb-3">{member.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-foreground text-background p-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Want to join us?</h2>
            <p className="text-background/70 mb-8 max-w-md mx-auto">
              We're always looking for people who care deeply about great experiences and love building things that work in the real world.
            </p>
            <Button asChild className="rounded-full bg-primary px-8 h-11 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Link href="/careers">See Open Roles</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
