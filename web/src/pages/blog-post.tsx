import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { posts } from "./blog";
import { useDemoModal } from "@/components/landing/DemoModalContext";

const articleBody: Record<string, { sections: { heading?: string; body: string }[] }> = {
  "why-physical-queues-are-costing-your-business": {
    sections: [
      { body: "Walk into almost any bank, hospital, or government office and you'll find the same scene: a row of plastic chairs, a ticket machine, and customers staring at a screen waiting for their number to appear. It looks operational. It isn't efficient." },
      { heading: "The hidden cost of the ticket machine", body: "The ticket machine itself costs between $2,000 and $8,000 to purchase and install. Add annual maintenance contracts, paper roll replacements, and the occasional engineer visit when the dispenser jams — and you're spending more on the waiting experience than on the service itself." },
      { heading: "What customers actually experience", body: "A customer takes a ticket. They find a seat. Twenty minutes later, they're still watching the number board. They have no idea if the person at counter 3 is finishing up or just getting started. So they do what every customer does: they walk up to a member of staff and ask. That staff member stops what they're doing, checks the system, gives a rough estimate, and the customer walks back to their seat — slightly more anxious than before." },
      { heading: "The staff cost", body: "In a busy branch, staff answering \"how long is the wait?\" questions can account for 15–20% of their available time. That's time not spent serving customers. In a 10-person service team, that's the equivalent of two full-time staff members doing nothing but managing anxiety." },
      { heading: "What digital queuing actually changes", body: "When a customer checks in via NFC or QR, three things happen immediately. They receive a ticket number. They receive a live queue position update. And staff receive the customer's service request and any other information collected in the check-in form — before the customer arrives at the counter. The anxiety disappears. The \"how long?\" questions stop. And staff can prepare for each customer before calling them." },
      { heading: "The numbers", body: "Businesses that switch to digital queuing typically see a 30–45% reduction in perceived wait times (customers feel they waited less, even when actual wait times are unchanged), a 20% reduction in walk-aways, and measurable improvements in first-contact resolution because staff arrive prepared. The investment in Relay typically pays for itself within the first quarter." },
    ],
  },
};

const fallbackSections = [
  { body: "This article provides practical guidance for service organisations looking to improve customer flow and operational efficiency." },
  { heading: "The core insight", body: "Every organisation that manages walk-in customers faces the same fundamental challenge: the gap between a customer arriving and a staff member being ready to serve them. How you manage that gap determines the entire customer experience." },
  { heading: "What Relay changes", body: "By replacing the physical check-in moment with a digital one — NFC tap or QR scan — Relay captures customer intent, routes them to the right queue, and gives staff context before the interaction begins. The result is faster service, better-prepared staff, and customers who feel informed rather than ignored." },
  { heading: "Getting started", body: "Most organisations start with a single branch pilot. Within 30 days they have enough data to make a confident decision about wider rollout. Get Started Free and we'll walk you through exactly what a pilot would look like for your organisation." },
];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { openDemo } = useDemoModal();
  const post = posts.find((p) => p.slug === slug) ?? posts[0];
  const content = articleBody[post.slug] ?? { sections: fallbackSections };

  const currentIndex = posts.findIndex((p) => p.slug === post.slug);
  const prev = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  const categoryColors: Record<string, string> = {
    "Operations": "bg-green-50 text-green-700 border-green-200",
    "Technology": "bg-blue-50 text-blue-700 border-blue-200",
    "Banking": "bg-yellow-50 text-yellow-700 border-yellow-200",
    "Healthcare": "bg-pink-50 text-pink-700 border-pink-200",
    "Government": "bg-purple-50 text-purple-700 border-purple-200",
    "Engagement": "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Navbar />
      <article className="pt-16 pb-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mb-10">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeftIcon className="w-4 h-4" /> Back to Blog
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
            <Badge className={`text-xs border mb-5 ${categoryColors[post.category] ?? "bg-muted text-muted-foreground border-border"}`}>{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>
            <div className="flex items-center gap-4 pt-6 border-t border-border">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">{post.author.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.role} · {post.date} · {post.readTime}</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="space-y-8">
            {content.sections.map((section, i) => (
              <div key={i}>
                {section.heading && <h2 className="text-2xl font-bold text-foreground mb-4">{section.heading}</h2>}
                <p className="text-muted-foreground leading-[1.85] text-base">{section.body}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="mt-16 p-8 rounded-2xl bg-primary/8 border border-primary/20 text-center">
            <h3 className="text-xl font-bold text-foreground mb-3">See it in action</h3>
            <p className="text-muted-foreground mb-6">Book a 30-minute demo and we'll show you exactly how Relay would work in your branch or service centre.</p>
            <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8" onClick={openDemo} data-testid="button-blogpost-demo">
              Get Started Free
            </Button>
          </motion.div>

          <div className="mt-16 pt-10 border-t border-border grid grid-cols-2 gap-6">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="group">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><ArrowLeftIcon className="w-3 h-3" /> Previous</p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{prev.title}</p>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="group text-right">
                <p className="text-xs text-muted-foreground mb-1 flex items-center justify-end gap-1">Next <ArrowRightIcon className="w-3 h-3" /></p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{next.title}</p>
              </Link>
            ) : <div />}
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
