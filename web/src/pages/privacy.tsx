import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: `When you use Relay, we collect information necessary to provide our services:

**Information you provide directly:**
- Account registration details (name, email, business name, phone number)
- Billing and payment information (processed securely via Paystack/Flutterwave; we do not store card details)
- Business configuration data (branch details, staff accounts, service queues, form settings)

**Information collected automatically:**
- Customer check-in data submitted through your NFC/QR forms (name, phone number, purpose of visit, and any fields you configure)
- Usage analytics (pages visited, features used, session duration — anonymised)
- Device and browser information (for security and compatibility purposes)

**Information from integrations:**
- If you connect third-party tools (e.g. Zoho CRM, WhatsApp), we receive data according to the permissions you grant us.`,
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

- Provide and improve the Relay platform and its features
- Process your subscription and handle billing
- Send you service updates, security alerts, and support messages
- Enable your customer check-in flows, queue management, and campaign messaging
- Generate analytics and reports within your dashboard
- Comply with legal obligations

We do **not** use your customer data (the data collected through your Relay check-in forms) for our own marketing purposes. That data belongs to you.`,
  },
  {
    id: "data-storage",
    title: "3. Data Storage & Security",
    content: `All data is stored on secure cloud infrastructure hosted in Nigeria and the EU. We implement:

- AES-256 encryption at rest
- TLS 1.3 encryption in transit
- Role-based access controls limiting who on the Relay team can access your data
- Regular security audits and penetration testing
- Automated backups with point-in-time recovery

We retain account data for the duration of your subscription and for 90 days after termination, after which it is securely deleted unless required by law.`,
  },
  {
    id: "sharing",
    title: "4. Data Sharing",
    content: `We do not sell your data or your customers' data. We share data only in the following circumstances:

- **Service providers:** Trusted vendors who help us operate the platform (e.g. cloud hosting, payment processing, email delivery). These providers are bound by strict data processing agreements.
- **Integrations you enable:** When you connect Relay to a third-party tool, data flows according to your configuration and the third party's terms.
- **Legal compliance:** If we are required by law, court order, or regulatory authority to disclose information, we will do so and notify you where legally permitted.
- **Business transfers:** In the event of a merger, acquisition, or asset sale, user data may be transferred as part of that transaction. We will notify you in advance.`,
  },
  {
    id: "your-rights",
    title: "5. Your Rights",
    content: `Depending on your location, you may have the following rights regarding your personal data:

- **Access:** Request a copy of the personal data we hold about you
- **Correction:** Request that we correct inaccurate or incomplete data
- **Deletion:** Request that we delete your data (subject to legal retention obligations)
- **Portability:** Request a machine-readable export of your data
- **Restriction:** Ask us to restrict processing in certain circumstances
- **Objection:** Object to processing based on legitimate interests

To exercise any of these rights, contact us at **privacy@getrelay.co**. We will respond within 30 days.`,
  },
  {
    id: "cookies",
    title: "6. Cookies",
    content: `We use cookies and similar technologies to:

- Keep you logged in to the Relay dashboard
- Remember your preferences (e.g. dark/light mode, language)
- Measure usage and improve the product (via anonymised analytics)

We do **not** use third-party advertising cookies. You can control cookies through your browser settings, though disabling essential cookies may affect platform functionality.`,
  },
  {
    id: "children",
    title: "7. Children's Privacy",
    content: `Relay is intended for use by businesses and their adult staff. We do not knowingly collect personal information from anyone under the age of 16. If you believe we have inadvertently collected such data, please contact us and we will delete it promptly.`,
  },
  {
    id: "changes",
    title: "8. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email and display a prominent notice in the Relay dashboard. Continued use of the platform after changes take effect constitutes your acceptance of the updated policy.`,
  },
  {
    id: "contact",
    title: "9. Contact Us",
    content: `If you have any questions about this Privacy Policy or how we handle your data, please contact:

**Relay Technologies Ltd**
14 Broad Street, Lagos Island
Lagos, Nigeria

Email: **privacy@getrelay.co**
WhatsApp: +234 800 RELAY 01`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="container mx-auto px-4 md:px-6 max-w-5xl py-20">
        <div className="grid lg:grid-cols-[220px_1fr] gap-16">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">On this page</p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-xs text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-6">
                Legal
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Privacy Policy</h1>
              <p className="text-muted-foreground mb-2 text-sm">Last updated: 1 July 2026</p>
              <p className="text-muted-foreground leading-relaxed mb-12">
                This policy explains how Relay Technologies Ltd ("Relay", "we", "us", or "our") collects, uses, and protects your data when you use our platform.
              </p>

              <div className="space-y-12">
                {sections.map((section, i) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                    <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                      {section.content.split("\n\n").map((paragraph, j) => (
                        <p key={j} className={paragraph.startsWith("**") && paragraph.endsWith("**") ? "font-semibold text-foreground" : ""}>
                          {paragraph.replace(/\*\*(.*?)\*\*/g, (_, text) => text)}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </main>
        </div>
      </div>

      <div className="pb-16" />
      <Footer />
    </div>
  );
}
