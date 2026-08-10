import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";

export const posts = [
  {
    slug: "why-physical-queues-are-costing-your-business",
    category: "Operations",
    title: "Why physical queues are costing your business more than you think",
    excerpt: "Paper tickets, crowded waiting areas, and staff fielding \"how long until my turn?\" questions. The real cost of traditional queue management is higher than most managers realise.",
    author: "Daniel Osei",
    role: "Head of Product",
    date: "Jun 22, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    slug: "nfc-vs-qr-which-is-right-for-check-in",
    category: "Technology",
    title: "NFC vs QR codes: which is right for your customer check-in?",
    excerpt: "Both technologies work. But the customer experience is different. Here's how to choose — and why Relay supports both from day one.",
    author: "Fatima Al-Rashid",
    role: "Solutions Engineer",
    date: "Jun 14, 2026",
    readTime: "4 min read",
    featured: false,
  },
  {
    slug: "how-banks-are-modernising-branch-service",
    category: "Banking",
    title: "How banks are modernising branch service without rebuilding their branches",
    excerpt: "The branch isn't dead — but the paper ticket is. How leading retail banks are improving walk-in customer experience with minimal infrastructure change.",
    author: "Daniel Osei",
    role: "Head of Product",
    date: "Jun 6, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "reducing-perceived-wait-times-in-healthcare",
    category: "Healthcare",
    title: "Reducing perceived wait times in outpatient clinics — without adding staff",
    excerpt: "Patients don't just respond to actual wait times — they respond to uncertainty. Here's how real-time queue updates change patient satisfaction scores without changing staffing levels.",
    author: "Fatima Al-Rashid",
    role: "Solutions Engineer",
    date: "May 29, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "government-service-centres-digital-queuing",
    category: "Government",
    title: "The case for digital queuing at government service centres",
    excerpt: "Government offices are among the highest-volume, most queue-dependent service environments in the world. Here's how digital queuing reduces complaints and improves throughput.",
    author: "Daniel Osei",
    role: "Head of Product",
    date: "May 20, 2026",
    readTime: "8 min read",
    featured: false,
  },
  {
    slug: "push-notifications-post-visit-engagement",
    category: "Engagement",
    title: "How to turn a queue check-in into a long-term customer relationship",
    excerpt: "The moment a customer taps your NFC tag, Relay captures a permission-based channel to reach them again — without requiring an app. Here's how to use it well.",
    author: "Fatima Al-Rashid",
    role: "Solutions Engineer",
    date: "May 12, 2026",
    readTime: "5 min read",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  "Operations": "bg-green-50 text-green-700 border-green-200",
  "Technology": "bg-blue-50 text-blue-700 border-blue-200",
  "Banking": "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Healthcare": "bg-pink-50 text-pink-700 border-pink-200",
  "Government": "bg-purple-50 text-purple-700 border-purple-200",
  "Engagement": "bg-orange-50 text-orange-700 border-orange-200",
};

export default function Blog() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Navbar />

      <section className="pt-20 pb-14 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 bg-primary/10 px-3 py-1 rounded-full">Relay Blog</span>
            <h1 className="text-5xl font-bold text-foreground mb-4">Insights for service-led organisations</h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">Practical thinking on customer flow, queue management, and operational efficiency for banks, healthcare, and government.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          {featured && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-12">
              <Link href={`/blog/${featured.slug}`}>
                <Card className="p-8 md:p-10 border border-border bg-card rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <Badge className={`text-xs border mb-4 ${categoryColors[featured.category]}`}>{featured.category}</Badge>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-snug">{featured.title}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{featured.author}</span> · {featured.date} · {featured.readTime}
                        </div>
                        <ArrowRightIcon className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center h-48 rounded-xl bg-primary/8 border border-primary/15">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl font-bold text-primary">{featured.author.split(" ").map(n => n[0]).join("")}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground">{featured.author}</p>
                        <p className="text-xs text-muted-foreground">{featured.role}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="p-6 border border-border bg-card rounded-2xl shadow-sm hover:shadow-md transition-shadow h-full cursor-pointer group flex flex-col">
                    <Badge className={`text-xs border mb-4 w-fit ${categoryColors[post.category]}`}>{post.category}</Badge>
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug flex-1">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{post.author}</span> · {post.date}
                      </div>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
