import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By creating an account or using any part of the Relay platform, you agree to be bound by these Terms of Service ("Terms"). If you are using Relay on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.

If you do not agree to these Terms, do not use Relay.`,
  },
  {
    id: "services",
    title: "2. Description of Services",
    content: `Relay provides a cloud-based customer operations platform that includes queue management, NFC/QR check-in flows, digital menus, customer messaging, and analytics tools ("Services"). The specific features available to you depend on your subscription plan.

We reserve the right to modify, suspend, or discontinue any part of the Services with reasonable notice.`,
  },
  {
    id: "accounts",
    title: "3. Account Registration & Security",
    content: `To use Relay, you must register for an account with accurate and complete information. You are responsible for:

- Keeping your login credentials confidential
- All activity that occurs under your account
- Notifying us immediately at security@getrelay.co if you suspect unauthorised access

We reserve the right to suspend or terminate accounts that we believe to be compromised or in violation of these Terms.`,
  },
  {
    id: "subscription",
    title: "4. Subscription & Billing",
    content: `Relay operates on a subscription model, billed per branch per month (or per year at a discounted rate). By subscribing, you authorise us to charge your payment method on each billing date.

**Free first month:** All new plans include a free first month. After the trial, billing begins automatically unless you cancel.

**Cancellation:** You may cancel your subscription at any time from your account settings or by contacting us. Cancellation takes effect at the end of the current billing period. We do not offer pro-rated refunds for unused time.

**Annual plans:** Annual subscriptions are charged upfront. If you cancel an annual plan early, you will retain access until the end of the period but will not receive a refund.

**Price changes:** We will give you at least 30 days' notice of any price increase. Continued use after the notice period constitutes acceptance of the new pricing.`,
  },
  {
    id: "acceptable-use",
    title: "5. Acceptable Use",
    content: `You agree not to use Relay to:

- Violate any applicable law or regulation
- Collect data from individuals without their informed consent
- Send unsolicited commercial messages (spam) to customers
- Impersonate another person or entity
- Interfere with or disrupt the platform or its infrastructure
- Attempt to gain unauthorised access to any part of the platform
- Use the platform to build a competing product or service

We reserve the right to suspend your account immediately if we detect activity that violates these rules.`,
  },
  {
    id: "data-ownership",
    title: "6. Data Ownership",
    content: `You retain full ownership of all data you input into Relay, including customer data collected through your check-in flows and forms ("Customer Data"). By using Relay, you grant us a limited, non-exclusive licence to process your Customer Data solely to provide the Services.

We will not use your Customer Data for our own commercial purposes, share it with third parties for advertising, or sell it under any circumstances.

Upon account termination, you may export your Customer Data. After 90 days, we will securely delete it.`,
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual Property",
    content: `All intellectual property in the Relay platform — including the software, design, brand, logos, and documentation — belongs to Relay Technologies Ltd. These Terms do not grant you any rights to our intellectual property beyond the limited right to use the Services during an active subscription.

You may not copy, modify, reverse engineer, or create derivative works of any part of the Relay platform.`,
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: `To the maximum extent permitted by law, Relay's total liability to you for any claims arising from these Terms or your use of the Services shall not exceed the amount you paid us in the 12 months preceding the claim.

Relay is not liable for indirect, incidental, consequential, special, or punitive damages, including but not limited to loss of revenue, loss of data, or business interruption, even if we were advised of the possibility of such damages.

The Services are provided "as is". We do not warrant that they will be error-free, uninterrupted, or meet your specific requirements.`,
  },
  {
    id: "termination",
    title: "9. Termination",
    content: `Either party may terminate the agreement at any time. You may do so by cancelling your subscription; we may do so by giving you 30 days' written notice (or immediately in cases of material breach or violations of the Acceptable Use policy).

Upon termination, your access to the Services will cease at the end of your paid period, and your data will be handled in accordance with our Privacy Policy.`,
  },
  {
    id: "governing-law",
    title: "10. Governing Law",
    content: `These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.

If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.`,
  },
  {
    id: "changes",
    title: "11. Changes to These Terms",
    content: `We may update these Terms from time to time. We will notify you of material changes at least 30 days in advance via email and an in-app notice. Continued use of Relay after changes take effect constitutes your acceptance of the updated Terms.`,
  },
  {
    id: "contact",
    title: "12. Contact",
    content: `If you have any questions about these Terms, please contact:

**Relay Technologies Ltd**
14 Broad Street, Lagos Island, Lagos, Nigeria
Email: **legal@getrelay.co**`,
  },
];

export default function TermsPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Terms of Service</h1>
              <p className="text-muted-foreground mb-2 text-sm">Last updated: 1 July 2026</p>
              <p className="text-muted-foreground leading-relaxed mb-12">
                These Terms of Service govern your access to and use of the Relay platform operated by Relay Technologies Ltd.
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
                        <p key={j}>
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
