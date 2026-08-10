import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Dashboard from "@/components/landing/Dashboard";
import Footer from "@/components/landing/Footer";
import { useDemoModal } from "@/components/landing/DemoModalContext";

const features = [
  {
    title: "Smart Queue",
    description: "Organise queues, reduce wait times and keep customers informed in real time.",
    icon: "queue",
  },
  {
    title: "Intake Forms",
    description: "Capture customer purpose or requests before they reach your staff.",
    icon: "form",
  },
  {
    title: "Digital Menu",
    description: "Showcase your menu with images, prices and customisations.",
    icon: "menu",
  },
  {
    title: "Table Management",
    description: "Manage tables, track status and maximise your seating capacity.",
    icon: "table",
  },
  {
    title: "Orders & Payments",
    description: "Take orders, accept payments and keep everything contactless.",
    icon: "receipt",
  },
  {
    title: "Analytics & Reports",
    description: "Get insights on traffic, wait times, sales and staff performance.",
    icon: "chart",
  },
  {
    title: "Staff Dashboard",
    description: "Equip your team with tools they need to serve customers faster.",
    icon: "dashboard",
  },
  {
    title: "Multi-branch Support",
    description: "Manage one or multiple locations from a single account.",
    icon: "branch",
  },
];

function ProductIcon({ type }: { type: string }) {
  const common = "h-5 w-5";
  switch (type) {
    case "queue":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "form":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <rect x="5" y="4" width="14" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 8h8M8 12h5M8 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "menu":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 9h8M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "table":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4 10h16M8 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "receipt":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path d="M6 4h12l2 3v13l-2 2H6l-2-2V7l2-3Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 8h8M8 11.5h8M8 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path d="M5 19V10M12 19V5M19 19v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "dashboard":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 14h3M8 10h8M8 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "branch":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common}>
          <path d="M6 20V8M12 20V4M18 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6 8h6M12 4h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ProductPage() {
  const { openDemo } = useDemoModal();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <section className="section-y py-20">
          <div className="wrap">
            <div className="reveal mx-auto max-w-[760px] text-center md:text-left">
              <div className="mb-5 flex items-center justify-center gap-2 text-sm font-semibold text-primary md:justify-start">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <h1 className="mx-auto max-w-[660px] text-[clamp(32px,5vw,50px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] md:mx-0">
                Everything you need to manage your customers, your way.
              </h1>
              <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-[1.65] text-[var(--body)] md:mx-0">
                Manage queues, orders, menus, tables and analytics, all in one place. Built for restaurants, banks, bars and every high-traffic venue.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3.5 md:justify-start">
                <a href="/signin" className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary/95">
                  Get started free
                </a>
                <a href="#flow-1" className="rounded-full border border-[var(--line)] px-6 py-3.5 text-sm font-semibold text-[var(--ink)] transition hover:-translate-y-0.5">
                  See how it works
                </a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[var(--body)] md:justify-start">
                <span className="flex items-center gap-2"><span className="text-[var(--muted)]">✦</span> Easy setup</span>
                <span className="flex items-center gap-2"><span className="text-[var(--muted)]">□</span> Free installation</span>
                <span className="flex items-center gap-2"><span className="text-[var(--muted)]">♡</span> Compatible with all smartphones</span>
              </div>
            </div>
            <Dashboard />
          </div>
        </section>

        <section id="flow-1" className="bg-white py-[96px]">
          <div className="wrap">
            <div className="reveal mb-14 text-center md:text-left">
              <div className="inline-flex rounded-full bg-[var(--green-pale)] px-3 py-1.5 text-[13px] font-bold text-[var(--green)]">Flow 1</div>
              <h2 className="mt-3 text-[clamp(26px,3.5vw,38px)] font-extrabold leading-[1.15] text-[var(--ink)]">Queue Management</h2>
              <p className="mt-2 text-[15px] text-[var(--body)]">Smarter queues. Less waiting. Better experience.</p>
            </div>
            <div className="reveal flex justify-center">
              <div className="max-w-[1160px] overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface)] px-4 py-6 shadow-[var(--shadow-float)] sm:px-6 lg:px-8">
                <img src="/queue-flow.png" alt="Queue management flow" className="h-auto w-full object-cover" />
              </div>
            </div>
            <div className="reveal mt-10 flex flex-wrap justify-center gap-8">
              {['Live queue updates', 'Estimated wait time', 'Purpose captured', 'Faster, more organized service'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[14px] font-medium text-[var(--ink)]">
                  <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-[var(--green)] text-[10px] text-white">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="flow-2" className="bg-[var(--surface)] py-[96px]">
          <div className="wrap">
            <div className="reveal mb-14 text-center md:text-left">
              <div className="inline-flex rounded-full bg-[var(--green-pale)] px-3 py-1.5 text-[13px] font-bold text-[var(--green)]">Flow 2</div>
              <h2 className="mt-3 text-[clamp(26px,3.5vw,38px)] font-extrabold leading-[1.15] text-[var(--ink)]">Table-side Ordering</h2>
              <p className="mt-2 text-[15px] text-[var(--body)]">Browse, order and pay — right from your table.</p>
            </div>
            <div className="reveal phones-strip flex flex-wrap justify-center gap-5">
              <div className="phone border border-border rounded-3xl p-4 bg-card w-[200px] shrink-0 shadow-sm">
                <div className="phone-screen text-[11px]">
                  <div className="text-[10px] text-[var(--body)]">Good evening 🌟</div>
                  <div className="text-[13px] font-bold text-[var(--ink)]">Table 7</div>
                  <div className="mt-3 text-[10px] font-semibold text-[var(--ink)]">Top Picks</div>
                  {[
                    ['Grilled Chicken', '₦6,800'],
                    ['Beef Rice', '₦5,600'],
                    ['Mojito', '₦6,400'],
                  ].map(([item, price]) => (
                    <div key={item} className="mt-2 flex items-center gap-2 rounded-[8px] border border-[var(--line)] bg-[var(--surface)] p-2">
                      <div className="h-[24px] w-[24px] rounded-[6px] bg-[var(--line)]" />
                      <div className="flex-1">
                        <div className="text-[9px] font-semibold text-[var(--ink)]">{item}</div>
                        <div className="text-[9px] text-[var(--body)]">{price}</div>
                      </div>
                    </div>
                  ))}
                  <button className="mt-3 w-full rounded-full bg-primary py-2 text-[10px] font-semibold text-white">Browse Menu</button>
                </div>
              </div>
              <div className="arrow-sep self-center text-2xl hidden md:block">›</div>
              <div className="phone border border-border rounded-3xl p-4 bg-card w-[200px] shrink-0 shadow-sm">
                <div className="phone-screen text-[11px]">
                  <div className="flex gap-2 border-b border-[var(--line)] pb-2 text-[9px] font-semibold text-[var(--body)]">
                    <span className="border-b-2 border-primary pb-1 text-primary">All</span>
                    <span>Food</span>
                    <span>Drinks</span>
                  </div>
                  <div className="mt-3 text-[10px] font-semibold text-[var(--ink)]">Popular</div>
                  {[
                    ['Grilled Chicken', '₦6,500'],
                    ['Beef Burger', '₦4,200'],
                    ['Jollof Rice', '₦3,800'],
                  ].map(([item, price]) => (
                    <div key={item} className="mt-2 flex items-center justify-between rounded-[8px] border border-[var(--line)] bg-white p-2 text-[9px]">
                      <div>
                        <div className="font-semibold text-[var(--ink)]">{item}</div>
                        <div className="text-[var(--body)]">{price}</div>
                      </div>
                      <div className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] text-white">+</div>
                    </div>
                  ))}
                  <button className="mt-4 w-full rounded-full bg-[#10b981] py-2 text-[10px] font-semibold text-white">View Cart (2)</button>
                </div>
              </div>
            </div>
            <div className="reveal mt-10 flex flex-wrap justify-center gap-8">
              {['Digital menu', 'Easy ordering', 'Live order tracking', 'Contactless payment'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[14px] font-medium text-[var(--ink)]">
                  <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-[var(--green)] text-[10px] text-white">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="hardware" className="bg-white py-[96px] border-t border-[var(--line)]">
          <div className="wrap">
            <div className="reveal mb-14 text-center">
              <div className="inline-flex rounded-full bg-primary/10 px-3.5 py-1.5 text-[13px] font-bold text-primary"></div>
              <h2 className="mt-3 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.12] text-[var(--ink)]">
                Relay Hardware
              </h2>
              <p className="mx-auto mt-3 max-w-[600px] text-[16px] leading-[1.65] text-[var(--body)]">
                Beautiful, high-quality, and robust physical touchpoints designed to fit seamlessly into any design and withstand daily use.
              </p>
            </div>

            {/* Hardware Grid */}
            <div className="reveal grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {[
                {
                  name: "Premium Acrylic Stand",
                  desc: "Minimalist clear acrylic design that blends into any bar counter, restaurant table, or reception desk.",
                  img: "/Gemini_Generated_Image_bhckm2bhckm2bhck-removebg-preview.png",
                  features: ["Heavy-duty acrylic", "Water-resistant", "Double-sided branding"],
                  tag: "Most Popular"
                },
                {
                  name: "Classic Wooden Block",
                  desc: "Warm, premium look crafted from natural oak. Ideal for boutique hotels, upscale lounges, and cafes.",
                  img: "/Gemini_Generated_Image_d0g3ded0g3ded0g3-removebg-preview.png",
                  features: ["Sustainably sourced wood", "Laser engraved logo", "Stable weighted base"],
                  tag: "Bespoke"
                },
                {
                  name: "Wall/Counter Mount Holder",
                  desc: "Compact, wall-mountable cradle for quick-tap check-in queues at service counters and entryways.",
                  img: "/Gemini_Generated_Image_ohsecaohsecaohse-removebg-preview.png",
                  features: ["Compact wall footprint", "Industrial-grade adhesive", "Easy-to-clean design"],
                  tag: "High Traffic"
                },
                {
                  name: "Weighted Magnetic Tile",
                  desc: "Sleek, low-profile ceramic tile with internal magnets. Sits securely and comfortably flat on any table surface.",
                  img: "/magnetic_tile.png",
                  features: ["Internal magnetic cores", "Non-slip weighted base", "Water and heat resistant"],
                  tag: "Tabletop"
                }
              ].map((prod) => (
                <div key={prod.name} className="group relative flex flex-col rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-card)]">
                  {prod.tag && (
                    <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
                      {prod.tag}
                    </span>
                  )}
                  <div className="mb-6 flex h-40 items-center justify-center rounded-[18px] bg-white p-4 transition-transform duration-500 group-hover:scale-[1.03]">
                    <img src={prod.img} alt={prod.name} className="h-full max-h-[120px] object-contain" />
                  </div>
                  <h3 className="text-[17px] font-bold text-[var(--ink)]">{prod.name}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-[1.6] text-[var(--body)]">{prod.desc}</p>
                  <div className="mt-4 border-t border-[var(--line)] pt-4">
                    <ul className="space-y-1.5">
                      {prod.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-[12px] text-[var(--body)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Installation Flow */}
            <div className="reveal mt-20 rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-8 md:p-12">
              <div className="mx-auto max-w-[700px] text-center mb-12">
                <div className="inline-flex rounded-full bg-[var(--green-pale)] px-3 py-1 text-[12px] font-bold text-[var(--green)]">Simple Installation</div>
                <h3 className="mt-3 text-[24px] font-extrabold text-[var(--ink)]">Get Up & Running In 3 Easy Steps</h3>
                <p className="mt-2 text-[14px] text-[var(--body)]">No complex wiring, no professional installers. Setup takes less than 5 minutes.</p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    step: "01",
                    title: "Position and Secure",
                    desc: "We fit your weighted tag stands on your tables or stick the mounting plates to the service points of your choice."
                  },
                  {
                    step: "02",
                    title: "Scan to Link",
                    desc: "Open your Relay manager dashboard, scan or tap the tag, and type the table/counter name to instantly link that physical spot to your virtual layout."
                  },
                  {
                    step: "03",
                    title: "Ready for Taps",
                    desc: "Customers instantly tap their smartphone over the tag to check-in, order, or sign in. Zero app downloads or accounts required."
                  }
                ].map((item) => (
                  <div key={item.step} className="relative flex flex-col">
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-white">
                        {item.step}
                      </div>
                      <div className="h-[2px] flex-1 bg-[var(--line)] last:hidden md:block hidden" />
                    </div>
                    <h4 className="text-[16px] font-bold text-[var(--ink)]">{item.title}</h4>
                    <p className="mt-2 text-[13.5px] leading-[1.6] text-[var(--body)]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section className="bg-white py-[96px]">
          <div className="wrap text-center">
            <div className="reveal">
              <h2 className="mt-3 text-[clamp(26px,3.5vw,38px)] font-extrabold leading-[1.15] text-[var(--ink)]">Everything, one place.</h2>
              <p className="mx-auto mt-3 max-w-[520px] text-[16px] leading-[1.65] text-[var(--body)]">
                Powerful tools for banks, restaurants, bars, clubs and any high-traffic venue.
              </p>
            </div>
            <div className="reveal mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-[16px] border border-[var(--line)] bg-white p-6 text-left shadow-[var(--shadow-card)] hover:border-primary/40 transition-colors">
                  <div className="mb-4 grid h-10 w-10 place-items-center rounded-[10px] bg-primary/10 text-primary">
                    <ProductIcon type={feature.icon} />
                  </div>
                  <h3 className="text-[16px] font-bold text-[var(--ink)]">{feature.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-[var(--body)]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="reveal overflow-hidden rounded-[24px] bg-gradient-to-r from-primary to-green-600 p-10 md:p-14 text-white">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
              <div className="grid h-[80px] w-[80px] place-items-center rounded-full bg-white/15">
                <svg viewBox="0 0 24 24" className="h-9 w-9 text-white" fill="none">
                  <circle cx="8" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="16" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="15" r="2.2" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold leading-[1.2]">
                  Better queues. Happier customers. Smarter teams.
                </h2>
                <p className="mt-3 max-w-[560px] text-[16px] text-white/75">
                  Set up your Relay system in minutes and transform the way you serve.
                </p>
                <div className="mt-6 flex flex-wrap gap-3.5">
                  <a href="/signin" className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-gray-900 transition hover:bg-white/90">Get started free</a>
                  <a href="#flow-1" className="rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold transition hover:bg-white/10">See how it works</a>
                </div>
                <p className="mt-4 text-[13px] text-white/55">Free installation & 30-day trial</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
