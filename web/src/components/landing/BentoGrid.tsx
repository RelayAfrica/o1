import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07 },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// Feature card visuals
// ─────────────────────────────────────────────────────────────────────────────

function CheckInVisual() {
  return (
    <div className="relative flex items-center justify-center h-48 mt-4 select-none">
      <img
        src="https://i.ibb.co/wNJ9d5Gx/Built.png"
        alt="NFC & QR Check-In Phone Preview"
        className="w-full h-full object-contain max-h-[170px]"
      />
    </div>
  );
}

function QueueVisual() {
  const customers = [
    { name: "Amara J.", tag: "Consultation", position: 1, status: "Now Serving", color: "bg-primary/10 text-primary border-primary/30" },
    { name: "Felix O.", tag: "General", position: 2, status: "Up Next", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { name: "Priya M.", tag: "Account", position: 3, status: "Waiting", color: "bg-slate-50 text-slate-500 border-slate-200" },
  ];
  return (
    <div className="mt-4 space-y-2">
      {customers.map((c) => (
        <div key={c.name} className={`flex items-center gap-3 px-3 py-2 rounded-xl border ${c.color}`}>
          <div className="w-6 h-6 rounded-full bg-white border border-current/20 flex items-center justify-center text-[10px] font-bold shrink-0">
            {c.position}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold leading-none truncate">{c.name}</p>
            <p className="text-[9px] opacity-70 leading-tight">{c.tag}</p>
          </div>
          <span className="text-[8px] font-semibold whitespace-nowrap">{c.status}</span>
        </div>
      ))}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[9px] text-slate-400">3 customers in queue</span>
        <div className="w-5 h-5 rounded bg-primary text-white flex items-center justify-center">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
      <div className="flex items-center gap-2 bg-slate-100 border-b border-slate-200 px-3 py-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <span className="text-[9px] text-slate-400 font-medium">Staff Dashboard</span>
      </div>
      <div className="p-3 space-y-2">
        {[
          { label: "Avg Wait Time", val: "4m 12s", trend: "↓ 18%", good: true },
          { label: "Served Today", val: "142", trend: "↑ 23%", good: true },
          { label: "Queue Depth", val: "8", trend: "↑ 3", good: false },
        ].map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <span className="text-[9px] text-slate-500">{s.label}</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-slate-700">{s.val}</span>
              <span className={`text-[8px] font-semibold ${s.good ? "text-green-600" : "text-amber-600"}`}>{s.trend}</span>
            </div>
          </div>
        ))}
        <div className="pt-1 border-t border-slate-200">
          <div className="w-full bg-primary/90 rounded text-center text-[8px] text-white font-semibold py-1">
            Call Next Customer →
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsVisual() {
  const campaigns = [
    {
      badge: "Promotion",
      badgeColor: "bg-amber-100 text-amber-700",
      accent: "border-amber-200 bg-amber-50",
      msg: "🎉 Limited-time offer: Enjoy exclusive savings on selected services this week. Visit your nearest branch to redeem.",
    },
    {
      badge: "Appointment Reminder",
      badgeColor: "bg-blue-100 text-blue-700",
      accent: "border-blue-200 bg-blue-50",
      msg: "📅 Don't forget! You have an upcoming appointment. Check in on arrival for a faster experience.",
    },
    {
      badge: "Customer Update",
      badgeColor: "bg-green-100 text-green-700",
      accent: "border-green-200 bg-green-50",
      msg: "🔔 Good news! Your request has been processed and is ready for the next step. Visit your selected branch to continue.",
    },
    {
      badge: "Win-back",
      badgeColor: "bg-purple-100 text-purple-700",
      accent: "border-purple-200 bg-purple-50",
      msg: "👋 We'd love to see you again. Return this week and enjoy a faster check-in experience.",
    },
  ];
  return (
    <div className="mt-4 space-y-3">
      {/* Stats row */}
      <div className="flex gap-2 mb-2">
        {[
          { label: "Sent", val: "9,514" },
          { label: "Opened", val: "73.61%" },
          { label: "Redeemed", val: "4,861" },
        ].map((s) => (
          <div key={s.label} className="flex-1 text-center rounded-lg bg-primary/5 border border-primary/15 py-1">
            <p className="text-[11px] font-bold text-primary">{s.val}</p>
            <p className="text-[8px] text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {campaigns.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 * i }}
            className={`flex items-start gap-2 px-3 py-2 rounded-xl border ${n.accent}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${n.badgeColor}`}>{n.badge}</span>
              </div>
              <p className="text-[10px] text-slate-700 leading-snug">{n.msg}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [40, 65, 50, 80, 60, 90, 70];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="mt-4">
      <div className="flex items-end gap-1.5 h-20 px-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-primary/70"
            style={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.05 * i, duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </div>
      <div className="flex gap-1.5 px-1 mt-1">
        {days.map((d, i) => (
          <div key={i} className="flex-1 text-center text-[8px] text-slate-400">
            {d}
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-3 pt-2 border-t border-slate-100">
        {[
          { label: "Peak Hour", val: "11am–1pm" },
          { label: "Throughput", val: "142/day" },
        ].map((s) => (
          <div key={s.label} className="flex-1 text-center">
            <p className="text-[10px] font-bold text-slate-700">{s.val}</p>
            <p className="text-[8px] text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServeRelayWord() {
  const words = ["Serve", "Relay", "Flow", "Engage", "Grow"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const word = words[index];

  return (
    <div className="mt-4 text-center h-[60px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="text-5xl font-black text-primary leading-none select-none"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function BentoGrid() {
  return (
    <div className="w-full text-left">
      {/* Row 1 — two large equal cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">

        {/* Card 1 — NFC & QR Check-In */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Card className="p-8 border border-border bg-card rounded-2xl shadow-sm h-full overflow-hidden">
            <h3 className="text-xl font-bold text-foreground mb-1">NFC & QR Check-In</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Customers tap an NFC tag or scan a QR code to open the Relay experience instantly — no app download required.
            </p>
            <CheckInVisual />
            <ul className="mt-4 space-y-1.5">
              {[" Easy NFC tag deployment", "QR fallback for all devices", "Instant mobile web experience"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckIcon className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Card 2 — Smart Queue Management */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Card className="p-8 border border-border bg-card rounded-2xl shadow-sm h-full overflow-hidden">
            <h3 className="text-xl font-bold text-foreground mb-1">Smart Queue Management</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Multiple queues per branch, each with its own service type, capacity limits, and staff assignments — managed automatically.
            </p>
            <QueueVisual />
            <ul className="mt-4 space-y-1.5">
              {["Multiple queues per branch", "Priority customer routing", "Real-time queue control"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckIcon className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>

      {/* Row 2 — three smaller cards with "Built To Serve" framing */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">

        {/* Card 3 — Staff Dashboard */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:col-span-1 flex flex-col h-full justify-between">
          <Card className="p-6 border border-border bg-card rounded-2xl shadow-sm overflow-hidden flex-1">
            <h3 className="text-lg font-bold text-foreground mb-1">Staff Dashboard</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              See every customer's details before calling them. Serve with context from the first second.
            </p>
            <DashboardVisual />
            <ul className="mt-4 space-y-1.5">
              {["Customer context on call", "Notes & outcome tracking"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckIcon className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          {/* "Built" label */}
          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.15 }} className="mt-4 text-center h-[60px] flex items-center justify-center overflow-hidden">
            <span className="text-5xl font-black text-foreground leading-none select-none">Built</span>
          </motion.div>
        </motion.div>

        {/* Card 4 — Campaign Broadcasts */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:col-span-2 flex flex-col h-full justify-between">
          <Card className="p-6 border border-border bg-card rounded-2xl shadow-sm overflow-hidden flex-1">
            <h3 className="text-lg font-bold text-foreground mb-1">Campaign Broadcasts</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Stay in the hearts of past visitors. Send flash sales, loyalty rewards, and promote new services and menu items, with no app required.
            </p>
            <NotificationsVisual />
            <ul className="mt-4 space-y-1.5">
              {["Segment by visit history", "Promo & loyalty campaigns"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckIcon className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.15 }} className="mt-4 text-center h-[60px] flex items-center justify-center overflow-hidden">
            <span className="text-5xl font-black text-foreground leading-none select-none">To</span>
          </motion.div>
        </motion.div>

        {/* Card 5 — Analytics & Reporting */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:col-span-1 flex flex-col h-full justify-between">
          <Card className="p-6 border border-border bg-card rounded-2xl shadow-sm overflow-hidden">
            <h3 className="text-lg font-bold text-foreground mb-1">Analytics & Reporting</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Track productivity, wait times, and staff performance across every branch in real time.
            </p>
            <AnalyticsVisual />
            <ul className="mt-4 space-y-1.5">
              {["Live wait time dashboard", "Multi-branch comparison"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckIcon className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          {/* Animated "Serve ↔ Relay" label */}
          <ServeRelayWord />
        </motion.div>

      </div>
    </div>
  );
}
