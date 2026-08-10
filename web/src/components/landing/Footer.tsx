import type { MouseEvent } from "react";
import { Link, useLocation } from "wouter";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Overview", href: "/solutions" },
      { label: "Banks", href: "/solutions/banks" },
      { label: "Restaurants", href: "/solutions/restaurants" },
      { label: "Bars & Clubs", href: "/solutions/bars-clubs" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Retail", href: "/solutions/retail" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
      { label: "Partner Program", href: "/partners" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
];

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ChevronDown = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const RelayMark = ({ size = 32, radius = 8 }) => (
  <img
    src="/logo.png"
    alt="Relay"
    style={{
      width: size,
      height: size,
      borderRadius: radius,
      objectFit: "contain",
      flexShrink: 0,
      display: "block",
    }}
  />
);

export default function Footer() {
  return (
    <footer style={{ background: "#0d1c0e", color: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* ── ZONE 1: Brand + Nav columns ─────────────────── */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "64px 40px 52px",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: 64,
        alignItems: "start",
      }}
        className="footer-top"
      >
        {/* Brand */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <RelayMark />
            <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Relay</span>
          </div>
          <p style={{
            margin: "14px 0 0",
            fontSize: 14, lineHeight: 1.65,
            color: "rgba(255,255,255,0.50)",
            maxWidth: 220,
          }}>
            The customer operations platform for every customer-facing business.
          </p>
        </div>

        {/* Nav columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 24,
        }}
          className="footer-cols"
        >
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p style={{
                margin: "0 0 16px",
                fontSize: 11, fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}>
                {col.title}
              </p>
              {col.links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      display: "block",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.50)",
                      marginBottom: 10,
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.50)"}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      display: "block",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.50)",
                      marginBottom: 10,
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.50)"}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── ZONE 2: Ghost wordmark ───────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          background: "#0d1c0e",
          overflow: "hidden",
          lineHeight: 0.85,
          textAlign: "center",
          userSelect: "none",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            fontSize: "clamp(96px, 17vw, 196px)",
            fontWeight: 800,
            color: "rgba(255,255,255,0.055)",
            letterSpacing: "0.08em",
            display: "flex",
            justifyContent: "center",
            gap: "0.08em",
            flexWrap: "wrap",
          }}
          className="footer-wordmark"
        >
          {"Relay".split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              style={{
                display: "inline-block",
                transition: "transform 0.2s ease, color 0.2s ease, opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.transform = "translateY(-6px) scale(1.08)";
                target.style.color = "rgba(255,255,255,0.18)";
                target.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.transform = "translateY(0) scale(1)";
                target.style.color = "rgba(255,255,255,0.055)";
                target.style.opacity = "1";
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* ── ZONE 3: Social + CTA ────────────────────────── */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "36px 40px 44px",
        borderTop: "1px solid rgba(255,255,255,0.10)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 32,
        flexWrap: "wrap",
      }}
        className="footer-bottom-row"
      >
        {/* Social icons */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {[
            { label: "Instagram", icon: <InstagramIcon /> },
            { label: "X",         icon: <XIcon /> },
            { label: "LinkedIn",  icon: <LinkedInIcon /> },
          ].map(({ label, icon }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              style={{
                width: 36, height: 36,
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "50%",
                display: "grid", placeItems: "center",
                color: "rgba(255,255,255,0.70)",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#3bb741";
                e.currentTarget.style.color = "#3bb741";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "rgba(255,255,255,0.70)";
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* CTA box */}
        <div style={{
          border: "1.5px solid rgba(255,255,255,0.13)",
          borderRadius: 16,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "rgba(255,255,255,0.04)",
          flexWrap: "wrap",
        }}
          className="footer-cta"
        >
          <RelayMark size={36} radius={10} />

          <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>
            Ready?
          </span>

          <Link
            href="/signin"
            style={{
              marginLeft: "auto",
              background: "#3bb741",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "11px 20px",
              fontSize: 14, fontWeight: 700,
              display: "inline-flex", alignItems: "center", gap: 8,
              cursor: "pointer",
              transition: "background 0.2s",
              whiteSpace: "nowrap",
              textDecoration: "none",
            }}
            onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => (e.currentTarget as HTMLElement).style.background = "#2e9a34"}
            onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => (e.currentTarget as HTMLElement).style.background = "#3bb741"}
          >
            Get Started
            <ArrowRight />
          </Link>
        </div>
      </div>

      {/* ── ZONE 4: Copyright bar ───────────────────────── */}
      <div style={{
        background: "rgba(0,0,0,0.28)",
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
        className="footer-bar"
      >
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
          © 2026 Relay. All rights reserved.
        </span>

        <button
          type="button"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            background: "transparent",
            borderRadius: 999,
            padding: "6px 14px",
            color: "rgba(255,255,255,0.50)",
            fontSize: 13,
            display: "inline-flex", alignItems: "center", gap: 6,
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
        >
          <GlobeIcon />
          English
          <ChevronDown />
        </button>
      </div>

      {/* ── Responsive styles ───────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          .footer-cols { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            padding: 48px 24px 40px !important;
          }
          .footer-cols { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-bottom-row {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 32px 24px 36px !important;
          }
          .footer-bottom-row > div:first-child { justify-content: center; }
          .footer-cta {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .footer-cta button { margin-left: 0 !important; }
          .footer-bar {
            flex-direction: column !important;
            align-items: center !important;
            padding: 16px 24px !important;
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}